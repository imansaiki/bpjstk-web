<template>
  <q-page padding>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="drafts"
        label="Filter"
        header-class="text-purple"
      >
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col">
                <q-input v-model="nppQuery" label="NPP" />
              </div>
              <div class="col">
                <q-input v-model="perusahaanQuery" label="Perusahaan" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input v-model="judulQuery" label="Judul" />
              </div>
              <div class="col">
                <q-input v-model="kodeQuery" label="Kode" />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-input v-model="tanggalStartQuery" label="Tanggal sesudah">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="tanggalStartQuery" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col">
                <q-input v-model="tanggalEndQuery" label="Tanggal sebelum">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                        <q-date v-model="tanggalEndQuery" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <q-btn color="primary" label="Search" @click="filterTable"/>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <div v-if="this.$store.getters.isAdmin" class="q-pt-md">
      <q-btn @click="addFormShow">Tambah Surat</q-btn>
    </div>
    <div class="q-pt-md">
      <list-surat-perusahaan ref="listSuratComp"></list-surat-perusahaan>
    </div>
    <q-dialog v-model="listSurat" full-width persistent>
      <basic-dialog-card
        ></basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="addForm" full-width persistent>
      <basic-dialog-card>
        <form-add-surat @data-saved="dataSaved"></form-add-surat>
      </basic-dialog-card>
    </q-dialog>
  </q-page>
</template>

<script>
import FormAddSurat from "components/FormAddSurat.vue"
import ListPerusahaan from "components/ListPerusahaan.vue";
import ListSuratPerusahaan from "components/ListSuratPerusahaan.vue";
import BasicDialogCard from "components/BasicDialogCard.vue";
export default {
  name: "SuratMain",
  components: { ListSuratPerusahaan, BasicDialogCard, ListPerusahaan, FormAddSurat },
  data() {
    return {
      addForm:false,
      listSurat: false,
      perusahaanQuery: "",
      nppQuery:"",
      kodeQuery:"",
      judulQuery: "",
      tanggalStartQuery:"",
      tanggalEndQuery:"",
      left: false,
      
    };
  },
  methods: {
    listSuratShow(e) {
      console.log(e);
      this.listSurat = true;
    },
    addFormShow(){
      this.addForm=true
    },
    dataSaved(e){
      
    },
    filterTable(){
      let query = {}
      if(this.nppQuery){
        query.nppLk=this.nppQuery
      }
      if(this.perusahaanQuery){
        query.namaPerusahaanLk=this.perusahaanQuery
      }
      if(this.judulQuery){
        query.judulSuratLk=this.judulQuery
      }
      if(this.kodeQuery){
        query.kodeSuratLk=this.kodeQuery
      }
      if(this.tanggalStartQuery){
        query.tanggalStart=this.tanggalStartQuery
      }
      if(this.tanggalEndQuery){
        query.tanggalEnd=this.tanggalEndQuery
      }

      this.$refs.listSuratComp.loadData(query)
    }
  },
};
</script>
