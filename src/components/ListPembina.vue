<template>
  <q-table
    title="List Pembina"
    dense
    :data="data"
    :columns="columns"
    row-key="name"
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click="detailPembina(props.row.kodePembina)">
        <q-td key="chKodePembina" :props="props">
          {{ props.row.kodePembina }}
        </q-td>
        <q-td key="chNamaPembina" :props="props">
          {{ props.row.namaPembina }}
        </q-td>
        <q-td key="chHp" :props="props">
          {{ props.row.hp }}
        </q-td>
        <q-td key="chAlamat" :props="props">
          {{ props.row.alamat }}
        </q-td>
        <q-td key="chEmail" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="chLevel" :props="props">
          {{ props.row.level }}
        </q-td>
        <q-td key="chAction" :props="props"> </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
export default {
  name: "ListPembina",
  data() {
    return {
      icon: false,
      columns: [
        {
          name: "chKodePembina",
          required: true,
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina",
        },
        {
          name: "chNamaPembina",
          align: "left",
          label: "Nama Pembina",
          field: "namaPembina",
        },
        { name: "chHp", label: "HP", field: "hp" },
        { name: "chAlamat", label: "Alamat", field: "alamat" },
        { name: "chEmail", label: "Email", field: "email" },
        { name: "chLevel", label: "Level", field: "level" },
        {
          name: "chAction",
          label: "Action",
          field: "action",
        },
      ],
      data: [
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
        {
          kodePembina: "ABS9921",
          namaPembina: "Achmad Bumi Sentosa",
          hp: "081221334443",
          email: "23@gmail.com",
          alamat: "JL.Fatmawati Jakarta Selatan",
          level: 1,
        },
      ],
    };
  },
  mounted(){
    console.log("ListPembinaInit")
  },
  methods: {
    detailPembina(kodePembina) {
      console.log(kodePembina, "clicked");
    },
  },
};
</script>