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
      <list-pembina ref="listPembinaComp" @edit-clicked="addFormShow"></list-pembina>
    </div>
    <q-dialog v-model="listSurat" full-width persistent>
      <basic-dialog-card></basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="addForm"  full-width persistent>
      <basic-dialog-card>
        <form-add-pembina @data-saved="dataSaved" v-bind:pembinaObject="pembinaObject"></form-add-pembina>
      </basic-dialog-card>
    </q-dialog>
  </q-page>
</template>

<script>
import ListPembina from "components/ListPembina.vue";
import BasicDialogCard from "components/BasicDialogCard.vue";
import FormAddPembina from "components/FormAddPembina.vue";
import { Api } from 'boot/axios'
export default {
  name: "PembinaMain",
  components: { ListPembina, BasicDialogCard,FormAddPembina },
  data() {
    return {
      listSurat: false,
      addForm:false,
      kodePembinaQuery:null,
      nipQuery:null,
      namaQuery:null,
      teleponQuery:null,
      emailQuery:null,
      kotaQuery:null,
      text: "",
      left: false,
      pembinaObject:null
      
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
    dataSaved(e){
      this.addForm = false;
      this.filterTable()
    }
  },
};
</script>
