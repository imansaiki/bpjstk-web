<template>
<q-card bordered class="my-card" >
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-form @submit="login" class="q-gutter-md">
            <q-input v-model="username" label="Username" />
            <q-input v-model="password" label="Password" type="password" />
            <q-btn label="Submit" type="submit" color="primary"/>
        </q-form>
      </q-card-section>
    </q-card>
  
</template>
<script>

import { Api } from 'boot/axios'
import { Notify } from 'quasar'
export default {
  name: "LoginForm",
  data() {
    return {
      username:"",
      password:""
    };
  },
  methods:{
    login(){
      this.$q.loading.show()
      this.$store.dispatch("login",{username:this.username, password:this.password})
      .then((response) => {
        console.log(response)
        this.$router.push({ name: "PerusahaanPage" });
        this.$q.loading.hide()
      })
      .catch((err) => {
        this.$q.loading.hide()
        console.log(err)
        Notify.create({
          color: 'negative',
          position: 'top',
          message: 'Login Gagal',
          icon: 'report_problem'
        })
      })
    }
  }
};
</script>