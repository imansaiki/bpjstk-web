<template>
<q-card bordered class="my-card" >
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-form @submit="login" class="q-gutter-md">
            <q-input v-model="username" label="Username" />
            <q-input v-model="password" label="Password" />
            <q-btn label="Submit" type="submit" color="primary"/>
        </q-form>
      </q-card-section>
    </q-card>
  
</template>
<script>

import { api } from 'boot/axios'
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
      api.post('/user/signin',{
        username:this.username,
        password:this.password
      })
      .then((response) => {
        console.log(response)
        localStorage.setItem("token",response.data.data.token) 
        
      })
      .catch(() => {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Loading failed',
          icon: 'report_problem'
        })
      })
    }
  }
};
</script>