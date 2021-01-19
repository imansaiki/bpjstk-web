<template>
  <q-layout view="hHh LpR fFf">
    <q-header reveal elevated class="bg-green-7 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="left = !left" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg" />
          </q-avatar>
          BPJSTK
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="left"
      side="left"
      bordered
      content-class="bg-grey-3"
    >
      <div class="q-pb-sm"></div>
      <q-list>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="business_center" size="lg" />
          </q-item-section>
          <q-item-section> Perusahaan Binaan </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="forward_to_inbox" />
          </q-item-section>
          <q-item-section> Riwayat Surat Keluar </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section> Karyawan </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data() {
    return {
      left: false,
    };
  },
};
</script>
