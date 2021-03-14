<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-green-7 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          SIYAP
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <login-page/>
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginPage from "pages/LoginPage.vue";
export default {
  name: "LoginLayout",
  components: {LoginPage },
  data() {
    return {
      left: false,
    };
  },
};
</script>
