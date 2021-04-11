<template>
  <q-table
    title="List Pembina"
    dense
    :data="data"
    :columns="columns"
    :pagination.sync="pagination"
    :rows-per-page-options="[10, 20, 30]"
    @request="onRequest"
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
import { Api } from 'boot/axios'
export default {
  name: "ListPembina",
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
      searchQuery:{},
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
    let query ={}
    if(this.paramParent){
      query=this.paramParent
    }
    query.size=this.pagination.rowsPerPage
    query.page=this.pagination.page-1
    console.log(query)
    this.loadData(query)
  },
  methods: {
    detailPembina(kodePembina) {
      console.log(kodePembina, "clicked");
    },
    loadData(queryReq){
      return new Promise((resolve,reject)=>{
        this.$q.loading.show()
        console.log(this.query,"query")
        queryReq.page=this.pagination.page-1
        queryReq.size=this.pagination.rowsPerPage
        this.query=queryReq
        Api.get("/pembina/getAll",{params:this.query})
        .then(res=>{
          console.log(res)
          this.data = res.data.content
          this.pagination.rowsNumber=res.data.totalElements
          resolve(res)
          this.$q.loading.hide()
        }).catch(err=>{
          reject(err)
          this.$q.loading.hide()
        })
      })
    },
    onRequest(props){
      this.$q.loading.show()
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      this.query.page=page-1;
      this.query.size=rowsPerPage;
      Api.get("/pembina/getAll",{params:this.query})
        .then(res=>{
          console.log(res)
          this.data = res.data.content
          this.pagination.page = page
          this.pagination.rowsPerPage = rowsPerPage
          this.pagination.rowsNumber = res.data.totalElements
          this.$q.loading.hide()
          
        }).catch(err=>{
          console.log(err)
          this.$q.loading.hide()
        }) 
    }
  },
  isAdmin(){
    return this.$store.getters("isAdmin")
  }
};
</script>