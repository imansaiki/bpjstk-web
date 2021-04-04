<template>
  <q-table
    :title="'List Surat '+paramParent.name"
    dense
    :data="data"
    :columns="columns"
    :pagination.sync="pagination"
    :rows-per-page-options="[10, 20, 30]"
    @update:pagination="loadData"
    row-key="name"
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click="detailSurat(props.row.kodeSurat)">
        <q-td key="chKodeSurat" :props="props">
          {{ props.row.kodePembina }}
        </q-td>
        <q-td key="chJenisSurat" :props="props">
          {{ props.row.namaPembina }}
        </q-td>
        <q-td key="chNpp" :props="props">
          {{ props.row.hp }}
        </q-td>
        <q-td key="chNamaPerusahaan" :props="props">
          {{ props.row.alamat }}
        </q-td>
        <q-td key="chTanggalSurat" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="chNamaPengirim" :props="props"> </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
export default {
  name: "ListSuratPerusahaan",
  props:["paramParent"],
  data() {
    return {
      icon: false,
      pagination: {
        //sortBy: 'desc',
        //descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: "chKodeSurat",
          label: "Kode Surat",
          align: "left",
          field: "kodePembina",
        },
        {
          name: "chJenisSurat",
          label: "Jenis Surat",
          align: "left",
          field: "kodePembina",
        },
        { 
          name: "chNpp",
          label: "npp",
          align: "left",
          field: "kodePembina", 
        },
        {
          name: "chNamaPerusahaan",
          label: "Nama Perusahaan",
          align: "left",
          field: "kodePembina",
        },
        {
          name: "chTanggalSurat",
          label: "TanggalSurat",
          align: "left",
          field: "kodePembina"
        },
        {
          name: "chNamaPengirim",
          label: "Nama Pengirim",
          align: "left",
          field: "kodePembina",
        },
      ],
      data: [],
    };
  },
  mounted(){
    if(this.paramParent){
      console.log("called from other")
    }
  },
  methods:{
    detailSurat(){
      console.log("aaa")
    }
  }
};
</script>