<template>
  <q-table
    title="List Pembina"
    dense
    :data="data"
    :columns="columns"
    :pagination.sync="pagination"
    :rows-per-page-options="[10, 20, 30]"
    @update:pagination="loadData"
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
      data: [],
    };
  },
  mounted(){
    console.log("ListPembinaInit")
  },
  methods: {
    detailPembina(kodePembina) {
      console.log(kodePembina, "clicked");
    },
    loadData(query){
      return new Promise((resolve,reject)=>{
        query.page=this.pagination.page-1
        query.size=this.pagination.rowsPerPage
        Api.get("/pembina/getAll",{params:query})
        .then(res=>{
          console.log(res)
          this.data = res.data.content
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
  },
};
</script>