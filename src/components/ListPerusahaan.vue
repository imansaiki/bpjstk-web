<template>
  <q-table
    title="Daftar Perusahaan"
    dense
    :data="data"
    :columns="columns"
    row-key="name"
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click="listSuratShow(props.row.npp)">
        <q-td key="chNpp" :props="props">
          {{ props.row.npp }}
        </q-td>
        <q-td key="chPerusahaan" :props="props">
          {{ props.row.name }}
        </q-td>
        <q-td key="chAlamat" :props="props">
          {{ props.row.alamat }}
        </q-td>
        <q-td key="chKota" :props="props">
          {{ props.row.kota }}
        </q-td>
        <q-td key="chPic" :props="props">
          {{ props.row.pic }}
        </q-td>
        <q-td key="chPicPosition" :props="props">
          {{ props.row.picPosition }}
        </q-td>
        <q-td key="chHp" :props="props">
          {{ props.row.hp }}
        </q-td>
        <q-td key="chEmail" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="chAction" :props="props"> </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
export default {
  name: "ListSurat",
  props:["kpp"],
  data() {
    return {
      icon: false,
      columns: [
        {
          name: "chNpp",
          required: true,
          label: "NPP",
          field: "npp",
          align: "left",
        },
        {
          name: "chPerusahaan",
          label: "Perusahaan",
          field: "perusahaan",
          align: "left",
        },
        { name: "chAlamat", label: "Alamat", field: "alamat", sortable: true },
        { name: "chKota", label: "Kota/Kabupaten", field: "kota" },
        { name: "chPic", label: "Nama PIC", field: "pic" },
        { name: "chPicPosition", label: "Jabatan PIC", field: "picPosition" },
        { name: "chHp", label: "HP", field: "hp" },
        { name: "chEmail", label: "Email", field: "email" },
        { name: "chAction", label: "Action" },
      ],
      data: [
        {
          name: "DEOMASTER HYGIENE INDONESIA",
          npp: 16079301,
          alamat: "",
          kota: "Jakarta Selatan",
          pic: "Ade Nugraha",
          picPosition: "HRD",
          hp: "088912323411",
          email: "hr@deomaster.com",
        },
        {
          name: "MARBOT MASJID HIMMATUL MASAAKIN",
          npp: 16079302,
          alamat: "",
          kota: "Kota Tangerang",
          pic: "Bagas Darnamaba",
          picPosition: "HRD",
          hp: "085722812884",
          email: "hr@deomaster.com",
        },
        {
          name: "VETERAN INDO KOR",
          npp: 16079303,
          alamat: "",
          kota: "Jakarta Utara",
          pic: "Bagus Tanubana",
          picPosition: "HRD",
          hp: "085722812884",
          email: "hr@deomaster.com",
        },
        {
          name: "PENGURUS RT 02 RW 06 PULO -APARATUR RUKUN TETANGGA",
          npp: 16079304,
          alamat: "",
          kota: "Jakarta Pusat",
          pic: "Andre Suramartawi",
          picPosition: "HRD",
          hp: "085722812884",
          email: "hr@deomaster.com",
        },
        {
          name: "ALFINDO MITRA SEMBADA",
          npp: 16079305,
          alamat: "",
          kota: "Jakarta Selatan",
          pic: "Sukirman Madureja",
          picPosition: "HRD",
          hp: "085722812884",
          email: "hr@deomaster.com",
        },
        {
          name: "KANTOR NOTARIS RISBERT, SH",
          npp: 16079306,
          alamat: "",
          kota: "Jakarta Selatan",
          pic: "Sayuti Admaja",
          picPosition: "HRD",
          hp: "085722812884",
          email: "hr@deomaster.com",
        },
        {
          name: "UNGGUL PUTRA JAYA",
          npp: 16079307,
          alamat: "",
          kota: "Jakarta Selatan",
          pic: "Tiona Kusnandi",
          picPosition: "HRD",
          hp: "085722812884",
          email: "hr@deomaster.com",
        },
        {
          name: "GIGIEAT INDONESIA RAYA - MANAGEMENT",
          npp: 16079308,
          alamat: "",
          kota: "Jakarta Selatan",
          pic: "Indah Herawati",
          picPosition: "HRD",
          hp: "085722812884",
          email: "hr@deomaster.com",
        },
        {
          name: "GRANIT ABADI SEJAHTERA PT",
          npp: 16079309,
          alamat: "",
          kota: "Jakarta Selatan",
          pic: "Malik Mulyana",
          picPosition: "HRD",
          hp: "085722812884",
          email: "hr@deomaster.com",
        },
        {
          name: "PRIMA TEKNOLOGI ABADI",
          npp: 16079310,
          alamat: "",
          kota: "Jakarta Selatan",
          pic: "Edward Manunggal",
          picPosition: "HRD",
          hp: "085722812884",
          email: "hr@deomaster.com",
        },
      ],
    };
  },
  methods: {
    listSuratShow(npp) {
      this.$emit("row-clicked", npp);
    },
  },
};
</script>