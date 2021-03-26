<template>
  <q-table
    title="List Surat"
    dense
    :data="data"
    :columns="columns"
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
        <q-td key="chKodePerusahaan" :props="props">
          {{ props.row.hp }}
        </q-td>
        <q-td key="chNamaPerusahaan" :props="props">
          {{ props.row.alamat }}
        </q-td>
        <q-td key="chTanggalSurat" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="chKodePembina" :props="props">
          {{ props.row.level }}
        </q-td>
        <q-td key="chNamaPengirim" :props="props"> </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
export default {
  name: "ListSuratPerusahaan",
  props:["npp"],
  data() {
    return {
      icon: false,
      columns: [
        {
          name: "chKodeSurat",
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina",
        },
        {
          name: "chJenisSurat",
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina",
        },
        { 
          name: "chKodePerusahaan",
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina", 
        },
        {
          name: "chNamaPerusahaan",
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina",
        },
        {
          name: "chKodePembina",
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina"
        },
        {name: "chKodePembina",
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina"
        },
        {
          name: "chKodePembina",
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina",
        },
        {
          name: "chKodePembina",
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina",
        },
      ],
      data: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: "14%",
          iron: "1%",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: "8%",
          iron: "1%",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: "6%",
          iron: "7%",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: "3%",
          iron: "8%",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: "7%",
          iron: "16%",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: "0%",
          iron: "0%",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: "0%",
          iron: "2%",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: "0%",
          iron: "45%",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: "2%",
          iron: "22%",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: "12%",
          iron: "6%",
        },
      ],
    };
  },
};
</script>