import * as rule from './guard'


const routes = [
  {
    path: '/login',
    name:'LoginPage',
    beforeEnter:rule.isAuthenticated,
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '/',
        name:'PerusahaanPage',
        beforeEnter:rule.isAuthenticated,
        component: () => import('pages/perusahaan/MainPerusahaan.vue') 
      },
      { 
        path: '/pembina',
        name:'PembinaPage',
        beforeEnter:rule.isAuthenticated,
        component: () => import('pages/pembina/MainPembina.vue') 
      },
      { 
        path: '/surat',
        name:'SuratPage',
        beforeEnter:rule.isAuthenticated,
        component: () => import('pages/surat/MainSurat.vue') 
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
