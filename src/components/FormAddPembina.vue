<template>
<q-card bordered class="my-card" >
      <q-card-section>
        <div class="text-h6">Pembina</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-form @submit="submitForm" class="q-gutter-md">
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="pembina.nip" label="NIP" :rules="[val => !!val || 'Field is required']"/>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="pembina.nama" label="Nama" :rules="[val => !!val || 'Field is required']"/>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="pembina.kodePembina" label="Kode Pembina" :rules="[val => !!val || 'Field is required']"/>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="pembina.password" label="Password" :rules="[val => !!val || 'Field is required']"/>
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="pembina.alamat" label="Alamat" />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="pembina.kota" label="Kota"  />
                </div>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="pembina.telepon" label="Telepon" />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6 q-pa-sm">
                    <q-input v-model="pembina.email" label="Email" />
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
  name: "FormAddPembina",
  props:["pembinaObject"],
  data() {
    return {
        pembina:{
            nip:"",
            id:"",
            nama:"",
            kodePembina:"",
            password:"",
            alamat:"",
            kota:"",
            telepon:"",
            email:"",
            roleId:2
        }
    };
  },
  mounted(){
      if(this.pembinaObject){
          this.setPembina(this.pembinaObject)
      }
      
  },
  methods:{
    submitForm(){
        console.log(this.pembina)
      Api.post("/user/register",this.pembina)
      .then((response) => {
        console.log(response)
        this.$emit("data-saved","Pembina Berhasil Disimpan")
        //this.$router.push({ name: "PerusahaanPage" });
      })
      .catch((err) => {
        //console.log(err)
        Notify.create({
          color: 'negative',
          position: 'top',
          message: err.message,
          icon: 'report_problem'
        })
      })
    },
    setPembina(pembinaObject){
        if(pembinaObject.id){
          this.perusahaan.id=pembinaObject.id
      }
      if(pembinaObject.nip){
          this.perusahaan.nip=pembinaObject.nip
      }
      if(pembinaObject.nama){
          this.perusahaan.nama=pembinaObject.nama
      }
      if(pembinaObject.alamat){
          this.perusahaan.alamat=pembinaObject.alamat
      }
      if(pembinaObject.kota){
          this.perusahaan.kota=pembinaObject.kota
      }
      if(pembinaObject.password){
          this.perusahaan.password=pembinaObject.password
      }
      if(pembinaObject.kodePembina){
          this.perusahaan.kodePembina=pembinaObject.kodePembina
      }
      if(pembinaObject.email){
          this.perusahaan.email=pembinaObject.email
      }
      if(pembinaObject.telepon){
          this.perusahaan.telepon=pembinaObject.telepon
      }
    }
  }
};
</script>