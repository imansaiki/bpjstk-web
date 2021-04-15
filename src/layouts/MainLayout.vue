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
        <q-btn flat icon="exit_to_app" @click="logout">Logout</q-btn>
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
        <q-item  v-for="(menu,index) in listMenuFiltered" v-bind:key="index"  clickable v-ripple @click="route(menu.url)" :active="active(menu.url)" active-class="bg-teal-1 text-grey-8">
          <q-item-section avatar>
            <q-icon :name="menu.icon" size="lg" />
          </q-item-section>
          <q-item-section> {{menu.name}} </q-item-section>
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
      listMenu:[
        {
          name:"Daftar Perusahaan",
          url:"/",
          forRole:["ROLE_ADMIN","ROLE_PEMBINA"],
          icon:"business_center"
        },
        {
          name:"Riwayat Surat",
          url:"/surat",
          forRole:["ROLE_ADMIN","ROLE_PEMBINA"],
          icon:"forward_to_inbox"
        },
        {
          name:"Daftar Pembina",
          url:"/pembina",
          forRole:["ROLE_ADMIN","ROLE_PEMBINA"],
          icon:"person"
        },
      ]
    };
  },
  computed:{
    listMenuFiltered(){
      return this.listMenu.filter(e=>e.forRole.includes(this.$store.getters.getRole))
    }
  },
  methods:{
    route(path){
      if (this.$route.path !== path) this.$router.push(path)
    },
    active(path){
      if (this.$route.path == path) return true
    },
    logout(){
      this.$store.dispatch("logout").then((resp)=>{
        this.$router.push({ name: "LoginPage" });
      })
    }
  }
};
</script>
