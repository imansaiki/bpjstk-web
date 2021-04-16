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
        <q-td key="chNip" :props="props">
          {{ props.row.nip }}
        </q-td>
        <q-td key="chNama" :props="props">
          {{ props.row.nama }}
        </q-td>
        <q-td key="chTelepon" :props="props">
          {{ props.row.telepon }}
        </q-td>
        <q-td key="chEmail" :props="props">
          {{ props.row.email }}
        </q-td>
        <q-td key="chAlamat" :props="props">
          {{ props.row.alamat }}
        </q-td>
        <q-td key="chKota" :props="props">
          {{ props.row.kota }}
        </q-td>
        <q-td key="chAction" :props="props" class="q-gutter-xs">
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
          label: "Kode Pembina",
          align: "left",
          field: "kodePembina",
        },
        {
          name: "chNip",
          align: "left",
          label: "NIP",
          field: "namaPembina",
        },
        {
          name: "chNama",
          align: "left",
          label: "Nama Pembina",
          field: "nama",
        },
        { name: "chTelepon", label: "Telepon", field: "telepon" },
        { name: "chEmail", label: "Email", field: "email" },
        { name: "chAlamat", label: "Alamat", field: "alamat" },
        { name: "chKota", label: "Kota", field: "kota" },
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
  computed:{
    isAdmin(){
      return this.$store.getters.isAdmin
    }
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
    isAdmin(){
      return this.$store.getters.isAdmin
    }
  }
};
</script>