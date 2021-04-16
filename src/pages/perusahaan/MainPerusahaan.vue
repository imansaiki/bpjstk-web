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
                <q-input v-model="kotaQuery" label="Kota" />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
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
      <list-perusahaan @list-clicked="listSuratShow" @edit-clicked="addFormShow" @delete-clicked="deleteDialogShow" @detail-clicked="detailShow" ref="listPerusahaanComp"></list-perusahaan>
    </div>
    <q-dialog v-model="listSurat" full-width persistent>
      <basic-dialog-card>
        <list-surat-perusahaan v-bind:paramParent="clickedRowObj"></list-surat-perusahaan>
      </basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="addForm" full-width persistent>
      <basic-dialog-card>
        <form-add-perusahaan v-bind:perusahaanObject="perusahaanObject" @data-saved="dataSaved"></form-add-perusahaan>
      </basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="detailDialog" full-width persistent>
      <basic-dialog-card>
        <form-add-perusahaan v-bind:perusahaanObject="perusahaanObject" v-bind:readOnly="detailDialog" @data-saved="dataSaved"></form-add-perusahaan>
      </basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Hapus Data</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Apakah anda yakin untuk menghapus {{selectedPerusahaanName}} ?
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat color="negative" label="OK" @click="deletePerusahaan" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import FormAddPerusahaan from "components/FormAddPerusahaan.vue"
import ListPerusahaan from "components/ListPerusahaan.vue";
import ListSuratPerusahaan from "components/ListSuratPerusahaan.vue";
import BasicDialogCard from "components/BasicDialogCard.vue";
import { Api } from 'boot/axios'
import { Notify } from 'quasar'
export default {
  name: "PerusahaanMain",
  components: { ListSuratPerusahaan, BasicDialogCard, ListPerusahaan, FormAddPerusahaan },
  data() {
    return {
      listSurat: false,
      addForm:false,
      deleteDialog:false,
      detailDialog:false,
      perusahaanQuery: "",
      nppQuery:"",
      kotaQuery:"",
      kodePembinaQuery:"",
      left: false,
      clickedRowObj:null,
      perusahaanObject:null,
      selectedPerusahaanName:""

      
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
      //console.log(e)
      this.perusahaanObject=e
      this.addForm = true;
    },
    detailShow(e) {
      //console.log(e)
      this.perusahaanObject=e
      this.detailDialog = true;
    },
    deleteDialogShow(e){
      this.perusahaanObject=e
      this.selectedPerusahaanName =e.nama
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
        query.namaLk=this.perusahaanQuery
      }
      if(this.kotaQuery){
        query.kotaLk=this.kotaQuery
      }
      if(this.kodePembinaQuery){
        query.kodePembinaLk=this.kodePembinaQuery
      }
      this.$refs.listPerusahaanComp.loadData(query)
    },
    deletePerusahaan(){
      this.deleteDialog = false;
      this.$q.loading.show()
      Api.post("/perusahaan/delete",this.perusahaanObject).then(res=>{
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
    }
  },
};
</script>
