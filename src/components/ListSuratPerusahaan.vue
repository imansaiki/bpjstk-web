<template>
  <q-table
    :title="'List Surat '"
    dense
    :data="data"
    :columns="filteredColumn"
    :pagination.sync="pagination"
    :rows-per-page-options="[10, 20, 30]"
    @request="onRequest"
    row-key="name"
  >
    <template v-slot:body="props">
      <q-tr :props="props" @click="detailSurat(props.row.kodeSurat)">
        <q-td key="chKodeSurat" :props="props">
          {{ props.row.kodeSurat }}
        </q-td>
        <q-td key="chJenisSurat" :props="props">
          {{ props.row.jenisSurat }}
        </q-td>
        <q-td key="chJudulSurat" :props="props">
          {{ props.row.judulSurat }}
        </q-td>
        <q-td key="chNpp" :props="props">
          {{ props.row.npp }}
        </q-td>
        <q-td key="chNamaPerusahaan" :props="props">
          {{ props.row.namaPerusahaan }}
        </q-td>
        <q-td key="chTanggalSurat" :props="props">
          {{ formattedDate(props.row.tanggalSurat) }}
        </q-td>
        <q-td key="chNamaPengirim" :props="props">
           {{ props.row.namaPengirim }}
        </q-td>
        <q-td key="chAction" :props="props" class="q-gutter-xs">
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
          name: "chJudulSurat",
          label: "Judul Surat",
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
        { name: "chAction", label: "Action", field: "action" },
      ],
      data: [],
    };
  },
  mounted(){
    let query ={}
    if(this.paramParent){
      query=this.paramParent
    }
    query.size=this.pagination.rowsPerPage
    query.page=this.pagination.page-1
    console.log(query)
    this.loadData(query)
    //this.loadData({size:this.pagination.rowsPerPage,page:this.pagination.page-1})
  },
  computed:{
    filteredColumn(){
      if(this.paramParent){
        return this.columns.filter(e=>e.name!="chAction")
      }
      return this.columns
    }
  },
  methods:{
    detailSurat(e){
      console.log(e)
    },
    loadData(queryReq){
      return new Promise((resolve,reject)=>{
        this.$q.loading.show()
        console.log(queryReq,"query")
        queryReq.page=this.pagination.page-1
        queryReq.size=this.pagination.rowsPerPage
        this.query=queryReq
        Api.get("/surat/getAll",{params:this.query})
        .then(res=>{
          console.log(res)
          this.data = res.data.content
          this.pagination.rowsNumber=res.data.totalElements
          this.$q.loading.hide()
          resolve(res)
        }).catch(err=>{
          this.$q.loading.hide()
          reject(err)
        })
      })
    },
    onRequest(props){
      this.$q.loading.show()
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      this.query.page=page-1;
      this.query.size=rowsPerPage;
      Api.get("/surat/getAll",{params:this.query})
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
    formattedDate(date){
      let dateType = new Date(date)
      let month = dateType.getMonth() +1
      return dateType.getFullYear()+"-"+month+"-"+dateType.getDate()
    },
    limitText(value,length){
      if(value) return value.substring(0,length)
    },
    isAdmin(){
      return this.$store.getters("isAdmin")
    }
  }
};
</script>