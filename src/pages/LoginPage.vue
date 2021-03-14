<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="min-width: 50vh">
      <login-form></login-form>
    </div>
  </q-page>
</template>

<script>
import LoginForm from "components/LoginForm.vue";

export default {
  name: "LoginPage",
  components: { LoginForm},
  data() {
    return {
      
    };
  },
  methods: {
    listSuratShow() {
      this.listSurat = true;
    },
  },
};
</script>
