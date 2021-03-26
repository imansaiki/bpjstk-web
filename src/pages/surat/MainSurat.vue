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
      <list-surat-perusahaan></list-surat-perusahaan>
    </div>
    <q-dialog v-model="listSurat" full-width persistent>
      <basic-dialog-card
        ></basic-dialog-card>
    </q-dialog>
  </q-page>
</template>

<script>
import ListPerusahaan from "components/ListPerusahaan.vue";
import ListSuratPerusahaan from "components/ListSuratPerusahaan.vue";
import BasicDialogCard from "components/BasicDialogCard.vue";
export default {
  name: "SuratMain",
  components: { ListSuratPerusahaan, BasicDialogCard, ListPerusahaan },
  data() {
    return {
      listSurat: false,
      text: "",
      left: false,
      
    };
  },
  methods: {
    listSuratShow(e) {
      console.log(e);
      this.listSurat = true;
    },
  },
};
</script>
