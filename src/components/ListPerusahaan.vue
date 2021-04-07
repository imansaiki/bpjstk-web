<template>
  <q-table
    :title="'Daftar Perusahaan'"
    dense
    :data="data"
    :columns="columns"
    :pagination.sync="pagination"
    :rows-per-page-options="[10, 20, 30]"
    
    @request="onRequest"
    row-key="name"
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click="clickedNpp(props.row.npp,props.row.name)">
        <q-td key="chNpp" :props="props">
          {{ props.row.npp }}
        </q-td>
        <q-td key="chPerusahaan" :props="props">
          {{ props.row.nama }}
        </q-td>
        <q-td key="chAlamat" :props="props">
          {{ props.row.alamat }}
        </q-td>
        <q-td key="chKota" :props="props">
          {{ props.row.kota }}
        </q-td>
        <q-td key="chPic" :props="props">
          {{ props.row.namaPic }}
        </q-td>
        <q-td key="chPicPosition" :props="props">
          {{ props.row.jabatanPic }}
        </q-td>
        <q-td key="chHp" :props="props">
          {{ props.row.telepon }}
        </q-td>
        <q-td key="chEmail" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="chKodePembina" :props="props">
          {{ props.row.kodePembina }}
        </q-td>
      </q-tr>
    </template>
  </q-table>
</template>
<script>
import { Api } from 'boot/axios'
export default {
  name: "ListPerusahaan",
  props:["paramParent"],
  data() {
    return {
      query:{},
      pagination: {
        //sortBy: 'desc',
        //descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
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
        { name: "chAlamat", label: "Alamat", field: "alamat"},
        { name: "chKota", label: "Kota/Kabupaten", field: "kota" },
        { name: "chPic", label: "Nama PIC", field: "pic" },
        { name: "chPicPosition", label: "Jabatan PIC", field: "picPosition" },
        { name: "chHp", label: "HP", field: "hp" },
        { name: "chEmail", label: "Email", field: "email" },
        { name: "chKodePembina", label: "Kode Pembina", field: "kodePembina" },
      ],
      data: [],
    };
  },
  mounted(){
    console.log("ListPerusahaanInit")
    if(this.paramParent){
      console.log(this.paramParent)
    }
    this.loadData({size:this.pagination.rowsPerPage,page:this.pagination.page-1})
  },
  watch: {
    // whenever question changes, this function will run
    //pagination: function (newPagination, oldPagination) {
    //  this.loadData({page:newPagination.page,size:newPagination.rowsPerPage})
   // }
  },
  methods: {
    loadData(queryReq){
      return new Promise((resolve,reject)=>{
        this.$q.loading.show()
        console.log(this.query,"query")
        queryReq.page=this.pagination.page-1
        queryReq.size=this.pagination.rowsPerPage
        this.query=queryReq
        Api.get("/perusahaan/getAll",{params:this.query})
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
      Api.get("/perusahaan/getAll",{params:this.query})
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
    },
    clickedNpp(npp,name) {
      this.$emit("row-clicked", {npp:npp,name:name});
    },
    isAdmin(){
      return this.$store.getters("isAdmin")
    }
  },
};
</script>