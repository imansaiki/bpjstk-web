<template>
  <q-table
    :title="'Daftar Perusahaan'"
    dense
    :data="data"
    :columns="columns"
    :pagination.sync="pagination"
    :rows-per-page-options="[10, 20, 30]"
    @update:pagination="loadData"
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
      pagination: {
        //sortBy: 'desc',
        //descending: false,
        page: 1,
        rowsPerPage: 10
        // rowsNumber: xx if getting data from a server
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
      ],
      data: [],
    };
  },
  mounted(){
    console.log("ListPerusahaanInit")
    if(this.paramParent){
      console.log(this.paramParent)
    }
    //this.loadData({size:this.pagination.rowsPerPage,page:this.pagination.page-1})
  },
  watch: {
    // whenever question changes, this function will run
    //pagination: function (newPagination, oldPagination) {
    //  this.loadData({page:newPagination.page,size:newPagination.rowsPerPage})
   // }
  },
  methods: {
    loadData(query){
      return new Promise((resolve,reject)=>{
        query.page=this.pagination.page-1
        query.size=this.pagination.rowsPerPage
        Api.get("/perusahaan/getAll",{params:query})
        .then(res=>{
          console.log(res)
          this.data = res.data.content
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    },
    clickedNpp(npp,name) {
      this.$emit("row-clicked", {npp:npp,name:name});
    },
  },
};
</script>