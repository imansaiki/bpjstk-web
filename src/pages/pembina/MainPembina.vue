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
                <q-input v-model="kodePembinaQuery" label="Kode Pembina" />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="nipQuery" label="NIP" />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="namaQuery" label="Nama" />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="teleponQuery" label="Telepon" />
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="emailQuery" label="Email" />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="kotaQuery" label="Kota" />
              </div>
            </div>
            <q-btn @click="filterTable" color="primary" label="Search" />
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <div v-if="this.$store.getters.isAdmin" class="q-pt-md">
      <q-btn @click="addFormShow">Tambah Pembina</q-btn>
    </div>
    <div class="q-pt-md">
      <list-pembina ref="listPembinaComp" @edit-clicked="addFormShow" @delete-clicked="deleteDialogShow"></list-pembina>
    </div>
    <q-dialog v-model="listSurat" full-width persistent>
      <basic-dialog-card></basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="addForm"  full-width persistent>
      <basic-dialog-card>
        <form-add-pembina @data-saved="dataSaved" v-bind:pembinaObject="pembinaObject"></form-add-pembina>
      </basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog">
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">Hapus Data</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          Apakah anda yakin untuk menghapus {{selectedPembinaName}} ?
        </q-card-section>
        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat color="negative" label="OK" @click="deletePembina" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import ListPembina from "components/ListPembina.vue";
import BasicDialogCard from "components/BasicDialogCard.vue";
import FormAddPembina from "components/FormAddPembina.vue";
import { Api } from 'boot/axios'
import { Notify } from 'quasar'
export default {
  name: "PembinaMain",
  components: { ListPembina, BasicDialogCard,FormAddPembina },
  data() {
    return {
      listSurat: false,
      addForm:false,
      deleteDialog:false,
      kodePembinaQuery:null,
      nipQuery:null,
      namaQuery:null,
      teleponQuery:null,
      emailQuery:null,
      kotaQuery:null,
      text: "",
      left: false,
      pembinaObject:null,
      selectedPembinaName:""
      
    };
  },
  mounted(){
  },
  methods: {
    listSuratShow() {
      this.listSurat = true;
    },
    addFormShow(e){
      //console.log(e)
      this.pembinaObject=e
      this.addForm=true
    },
    deleteDialogShow(e){
      this.pembinaObject=e
      this.selectedPembinaName =e.nama
      this.deleteDialog = true;
    },
    filterTable(){
      let query = {}
      if(this.kodePembinaQuery){
        query.kodePembinaLk=this.kodePembinaQuery
      }
      if(this.nipQuery){
        query.nipLk=this.nipQuery
      }
      if(this.namaQuery){
        query.namaLk=this.namaQuery
      }
      if(this.teleponQuery){
        query.teleponLk=this.teleponQuery
      }
      if(this.emailQuery){
        query.emailLk=this.emailQuery
      }
      if(this.kotaQuery){
        query.kotaLk=this.kotaQuery
      }
      this.$refs.listPembinaComp.loadData(query)
    },
    deletePembina(){
      this.deleteDialog = false;
      this.$q.loading.show()
      Api.post("/pembina/delete",this.pembinaObject).then(res=>{
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
    dataSaved(e){
      this.addForm = false;
      this.filterTable()
    }
  },
};
</script>
