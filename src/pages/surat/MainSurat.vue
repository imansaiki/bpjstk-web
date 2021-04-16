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
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="nppQuery" label="NPP" />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="perusahaanQuery" label="Perusahaan" />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="judulQuery" label="Judul" />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="kodeQuery" label="Kode" />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
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
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
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
      <list-surat-perusahaan ref="listSuratComp" @edit-clicked="addFormShow" @delete-clicked="deleteDialogShow"></list-surat-perusahaan>
    </div>
    <q-dialog v-model="addForm" full-width persistent>
      <basic-dialog-card>
        <form-add-surat @data-saved="dataSaved" v-bind:suratObject="suratObject"></form-add-surat>
      </basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Hapus Data</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Apakah anda yakin untuk menghapus {{selectedSuratKode}} ?
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat color="negative" label="OK" @click="deleteSurat" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import FormAddSurat from "components/FormAddSurat.vue"
import ListPerusahaan from "components/ListPerusahaan.vue";
import ListSuratPerusahaan from "components/ListSuratPerusahaan.vue";
import BasicDialogCard from "components/BasicDialogCard.vue";
import { Api } from 'boot/axios'
import { Notify } from 'quasar'
import moment from 'moment';
export default {
  name: "SuratMain",
  components: { ListSuratPerusahaan, BasicDialogCard, ListPerusahaan, FormAddSurat },
  data() {
    return {
      addForm:false,
      listSurat: false,
      deleteDialog:false,
      perusahaanQuery: "",
      nppQuery:"",
      kodeQuery:"",
      judulQuery: "",
      tanggalStartQuery:"",
      tanggalEndQuery:"",
      left: false,
      suratObject:null,
      selectedSuratKode:""
      
    };
  },
  methods: {
    addFormShow(e){
      this.suratObject=e
      this.addForm=true
    },
    deleteDialogShow(e){
      this.suratObject=e
      this.selectedSuratKode =e.kodeSurat
      this.deleteDialog = true;
    },
    dataSaved(e){
      this.addForm = false;
      this.filterTable()
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
    },
    deleteSurat(){
      this.deleteDialog = false;
      this.$q.loading.show()
      Api.post("/surat/delete",this.suratObject).then(res=>{
        this.filterTable()
        this.$q.loading.hide()
        Notify.create({
          color: 'positive',
          position: 'top',
          message: res.message,
          icon: 'report_problem'
        })
      }).catch(err=>{
        this.$q.loading.hide()
        Notify.create({
          color: 'negative',
          position: 'top',
          message: err.message,
          icon: 'report_problem'
        })
      })
    },
    formatDate(date){
      return moment(date).format("YYYY-MM-DD")
    }
  },
};
</script>
