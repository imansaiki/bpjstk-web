<template>
  <q-table
    :title="'Daftar Perusahaan'"
    dense
    :data="data"
    :columns="filteredColumn"
    :pagination.sync="pagination"
    :rows-per-page-options="[10, 20, 30]"
    
    @request="onRequest"
    row-key="name"
  >
    <template v-slot:body="props">
      <q-tr :props="props" >
        <q-td key="chNpp" :props="props">
          {{ props.row.npp }}
        </q-td>
        <q-td key="chPerusahaan" :props="props">
          {{ props.row.nama }}
        </q-td>
        <q-td key="chKota" :props="props">
          {{ props.row.kota }}
        </q-td>
        <q-td key="chPic" :props="props">
          {{ props.row.namaPic }}
        </q-td>
        <q-td key="chHp" :props="props">
          {{ props.row.telepon }}
        </q-td>
        <q-td key="chKodePembina" :props="props">
          {{ props.row.kodePembina }}
        </q-td>
        <q-td key="chAction" :props="props" class="q-gutter-xs">
          <q-btn dense round icon="list" size="s" color="info" @click="listButton(props.row)"></q-btn>
          <q-btn dense round icon="info" size="s" color="primary" @click="detailButton(props.row)"></q-btn>
          <q-btn v-if="isAdmin" dense round icon="edit" size="s" color="accent" @click="editButton(props.row)"></q-btn>
          <q-btn v-if="isAdmin" dense round icon="delete" size="s" color="negative" @click="deleteButton(props.row)"></q-btn>
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
        { name: "chKota", label: "Kota/Kabupaten", field: "kota" },
        { name: "chPic", label: "Nama PIC", field: "namaPic" },
        { name: "chHp", label: "HP", field: "hp" },
        { name: "chKodePembina", label: "Kode Pembina", field: "kodePembina" },
        { name: "chAction", label: "Action", field: "action" },
      ],
      data: [],
    };
  },
  mounted(){
    console.log("ListPerusahaanInit")
    let query ={}
    if(this.paramParent){
      query=this.paramParent
    }
    query.size=this.pagination.rowsPerPage
    query.page=this.pagination.page-1
    console.log(query)
    this.loadData(query)
  },
  watch: {
    // whenever question changes, this function will run
    //pagination: function (newPagination, oldPagination) {
    //  this.loadData({page:newPagination.page,size:newPagination.rowsPerPage})
   // }
  },
  computed:{
    filteredColumn(){
      
      if(this.paramParent){
        return this.columns.filter(e=>e.name!="chAction")
      }
      return this.columns
    },
    isAdmin(){
      return this.$store.getters.isAdmin
    }
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
    editButton(row) {
      console.log("edit")
      this.$emit("edit-clicked", row);
    },
    detailButton(row) {
      this.$emit("detail-clicked", row);
    },
    listButton(row) {
      this.$emit("list-clicked", row);
    },
    deleteButton(row) {
      this.$emit("delete-clicked", row);
    },
    limitText(value,length){
      if(value){
        if(value.length>length) return value.substring(0,length)+"..."
      }
      return value
      
    },
    isAdmin(){
      return this.$store.getters.isAdmin
    }
  },
};
</script>