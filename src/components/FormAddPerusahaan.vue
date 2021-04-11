<template>
<q-card bordered class="my-card" >
      <q-card-section>
        <div class="text-h6">Perusahaan</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-form @submit="submitForm" class="q-gutter-md">
            <div class="row">
                <div class="col">
                    <q-input v-model="perusahaan.npp" label="NPP" />
                </div>
                <div class="col">
                    <q-input v-model="perusahaan.nama" label="Nama Perusahaan" />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input v-model="perusahaan.kota" label="Kota" />
                </div>
                <div class="col">
                    <q-input v-model="perusahaan.alamat" label="Alamat Perusahaan" />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input v-model="perusahaan.namaPic" label="Nama PIC" />
                </div>
                <div class="col">
                    <q-input v-model="perusahaan.jabatanPic" label="jabatan PIC"  />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input v-model="perusahaan.telepon" label="telepon" />
                </div>
                <div class="col">
                    <q-input v-model="perusahaan.email" label="email" />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <q-input v-model="perusahaan.kodePembina" label="Kode Pembina" />
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
  name: "FormAddPerusahaan",
  props:["perusahaanObject"],
  data() {
    return {
        perusahaan:{
            npp:"",
            id:"",
            nama:"",
            kota:"",
            alamat:"",
            namaPic:"",
            jabatanPic:"",
            telepon:"",
            email:"",
            kodePembina:""
        }
    };
  },
  mounted(){
      if(this.perusahaanObject){
          this.setPerusahaan(this.perusahaanObject)
      }
      
  },
  methods:{
    submitForm(){
        console.log(this.perusahaan)
      Api.post("/perusahaan/save",this.perusahaan)
      .then((response) => {
        console.log(response)
        this.$emit("data-saved","Perusahaan Berhasil Disimpan")
        //this.$router.push({ name: "PerusahaanPage" });
      })
      .catch((err) => {
        console.log(err)
        Notify.create({
          color: 'negative',
          position: 'top',
          message: 'Login Gagal',
          icon: 'report_problem'
        })
      })
    },
    setPerusahaan(perusahaanObject){
        if(perusahaanObject.id){
          this.perusahaan.id=perusahaanObject.id
      }
      if(perusahaanObject.npp){
          this.perusahaan.npp=perusahaanObject.npp
      }
      if(perusahaanObject.nama){
          this.perusahaan.nama=perusahaanObject.nama
      }
      if(perusahaanObject.alamat){
          this.perusahaan.alamat=perusahaanObject.alamat
      }
      if(perusahaanObject.kota){
          this.perusahaan.kota=perusahaanObject.kota
      }
      if(perusahaanObject.namaPic){
          this.perusahaan.namaPic=perusahaanObject.namaPic
      }
      if(perusahaanObject.jabatanPic){
          this.perusahaan.jabatanPic=perusahaanObject.jabatanPic
      }
      if(perusahaanObject.email){
          this.perusahaan.email=perusahaanObject.email
      }
      if(perusahaanObject.telepon){
          this.perusahaan.telepon=perusahaanObject.telepon
      }
    }
  }
};
</script>