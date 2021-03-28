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
              <div class="col"><q-input v-model="text" label="NPP" /></div>
              <div class="col">
                <q-input v-model="text" label="Perusahaan" />
              </div>
              <q-btn color="primary" label="Search" />
            </div>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
    <div class="q-pt-md">
      <list-pembina @row-clicked="listSuratShow"></list-pembina>
    </div>
    <q-dialog v-model="listSurat" full-width persistent>
      <basic-dialog-card></basic-dialog-card>
    </q-dialog>
  </q-page>
</template>

<script>
import ListPembina from "components/ListPembina.vue";
import BasicDialogCard from "components/BasicDialogCard.vue";
import { Api } from 'boot/axios'
export default {
  name: "PembinaMain",
  components: { ListPembina, BasicDialogCard },
  data() {
    return {
      listSurat: false,
      text: "",
      left: false,
      
    };
  },
  mounted(){
    this.loadData()
  },
  methods: {
    listSuratShow() {
      this.listSurat = true;
    },
    loadData () {
    api.get('/api/test')
      .then((response) => {
        console.log(response)
      })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
  },
  },
};
</script>
