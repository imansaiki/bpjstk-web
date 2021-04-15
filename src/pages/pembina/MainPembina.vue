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
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm"><q-input v-model="text" label="NPP" /></div>
              <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                <q-input v-model="text" label="Perusahaan" />
              </div>
              <q-btn color="primary" label="Search" />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <div v-if="this.$store.getters.isAdmin" class="q-pt-md">
      <q-btn @click="addFormShow">Tambah Pembina</q-btn>
    </div>
    <div class="q-pt-md">
      <list-pembina @row-clicked="listSuratShow"></list-pembina>
    </div>
    <q-dialog v-model="listSurat" full-width persistent>
      <basic-dialog-card></basic-dialog-card>
    </q-dialog>
    <q-dialog v-model="addForm" full-width persistent>
      <basic-dialog-card>
        <form-add-pembina @data-saved="dataSaved"></form-add-pembina>
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
      text: "",
      left: false,
      
    };
  },
  mounted(){
  },
  methods: {
    listSuratShow() {
      this.listSurat = true;
    },
    addFormShow(){
      this.addForm=true
    },
    dataSaved(e){

    }
  },
};
</script>
