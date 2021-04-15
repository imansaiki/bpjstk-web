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
                <q-input v-model="kotaQuery" label="Kota" />
              </div>
              <div class="col">
                <q-input v-model="kodePembinaQuery" label="Kode Pemibina" />
              </div>
            </div>
            <div class="row">
              <q-btn color="primary" label="Search" @click="filterTable" />
            </div>
            
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <div v-if="this.$store.getters.isAdmin" class="q-pt-md">
      <q-btn @click="addFormShow">Tambah Perusahaan</q-btn>
    </div>
    <div class="q-pt-md">
      <list-perusahaan @row-clicked="listSuratShow" ref="listPerusahaanComp"></list-perusahaan>
    </div>
    <q-dialog v-model="listSurat" full-width persistent>
      <basic-dialog-card>
        <list-surat-perusahaan v-bind:paramParent="clickedRowObj"></list-surat-perusahaan>
      </basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="addForm" full-width persistent>
      <basic-dialog-card>
        <form-add-perusahaan @data-saved="dataSaved"></form-add-perusahaan>
      </basic-dialog-card>
    </q-dialog>
  </q-page>
</template>

<script>
import FormAddPerusahaan from "components/FormAddPerusahaan.vue"
import ListPerusahaan from "components/ListPerusahaan.vue";
import ListSuratPerusahaan from "components/ListSuratPerusahaan.vue";
import BasicDialogCard from "components/BasicDialogCard.vue";
import { Api } from 'boot/axios'
export default {
  name: "PerusahaanMain",
  components: { ListSuratPerusahaan, BasicDialogCard, ListPerusahaan, FormAddPerusahaan },
  data() {
    return {
      listSurat: false,
      addForm:false,
      perusahaanQuery: "",
      nppQuery:"",
      kotaQuery:"",
      kodePembinaQuery:"",
      left: false,
      clickedRowObj:null
      
    };
  },
  mounted(){

  },
  methods: {
    listSuratShow(e) {
      
      this.clickedRowObj={nppEq:e.npp}
      this.listSurat = true;
    },
    addFormShow(e) {
      
      //this.clickedRowObj={nppEq:e.npp}
      this.addForm = true;
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
        query.namaLk=this.perusahaanQuery
      }
      if(this.kotaQuery){
        query.kotaLk=this.kotaQuery
      }
      if(this.kodePembinaQuery){
        query.kodePembinaLk=this.kodePembinaQuery
      }
      this.$refs.listPerusahaanComp.loadData(query)
    }
  },
};
</script>
