<template>
<q-card bordered class="my-card" >
      <q-card-section>
        <div class="text-h6">Surat</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-form @submit="submitForm" class="q-gutter-md">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="surat.kodeSurat" label="Kode Surat" />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="surat.npp" label="NPP" />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="surat.judulSurat" label="Judul Surat" />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="surat.tanggalSurat" label="Tanggal Surat" />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="surat.jenisSurat" label="Jenis Surat" />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="surat.namaPengirim" label="Nama Pengirim"  />
                </div>
            </div>                       
            <q-btn label="Submit" type="submit" color="primary"/>
        </q-form>
      </q-card-section>
    </q-card>
  
</template>
<script>

import { Api } from 'boot/axios'
import { Notify } from 'quasar'
export default {
  name: "FormAddSurat",
  props:["suratObject"],
  data() {
    return {
        surat:{
            kodeSurat:"",
            id:"",
            judulSurat:"",
            tanggalSurat:"",
            jenisSurat:"",
            npp:"",
            namaPengirim:"",
        }
    };
  },
  mounted(){
      if(this.suratObject){
          this.setSurat(this.suratObject)
      }
      
  },
  methods:{
    submitForm(){
        console.log(this.surat)
      Api.post("/surat/save",this.surat)
      .then((response) => {
        console.log(response)
        this.$emit("data-saved","Surat Berhasil Disimpan")
        //this.$router.push({ name: "PerusahaanPage" });
      })
      .catch((err) => {
        console.log(err)
        Notify.create({
          color: 'negative',
          position: 'top',
          message: err.message,
          icon: 'report_problem'
        })
      })
    },
    setSurat(suratObject){
        if(suratObject.id){
          this.surat.id=suratObject.id
      }
      if(suratObject.npp){
          this.surat.npp=suratObject.npp
      }
      if(suratObject.judulSurat){
          this.surat.judulSurat=suratObject.judulSurat
      }
      if(suratObject.kodeSurat){
          this.surat.kodeSurat=suratObject.kodeSurat
      }
      if(suratObject.tanggalSurat){
          this.surat.tanggalSurat=suratObject.tanggalSurat
      }
      if(suratObject.jenisSurat){
          this.surat.jenisSurat=suratObject.jenisSurat
      }
      if(suratObject.namaPengirim){
          this.surat.namaPengirim=suratObject.namaPengirim
      }
    }
  }
};
</script>