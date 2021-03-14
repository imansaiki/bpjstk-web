<template>
<q-card bordered class="my-card" >
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>
      <q-separator inset />
      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input v-model="username" label="Username" />
            <q-input v-model="password" label="Password" />
            <q-btn label="Submit" type="submit" color="primary"/>
        </q-form>
      </q-card-section>
    </q-card>
  
</template>
<script>
export default {
  name: "LoginForm",
  data() {
    return {
      username:"",
      password:""
    };
  },
};
</script>