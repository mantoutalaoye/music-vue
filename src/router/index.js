import Vue from 'vue'
import VueRouter from 'vue-router'
import Fxyy from '../views/Fxyy'
import recommend from "../views/fxyy/Recommend.vue"
import Playlistdetail from "../views/playlist/Playlistdetail.vue"

Vue.use(VueRouter)

const routes = [{
    path: '/fxyy',
    name: 'Fxyy',
    component: Fxyy,
    children: [{
        path: "/fxyy/recommend",
        component: recommend
      },
      {
        path: "/fxyy/rankinglist",
        component: () => import("../views/fxyy/RankingList.vue")
      },
      {
        path: "/fxyy/fxplaylist",
        component: () => import("../views/fxyy/Fxplaylist.vue"),
        children: [{
            path: "/fxyy/fxplaylist/:id",
            component: () => import("../views/fxyy/Classitflist.vue"),
          },
          {
            path: '/fxyy/fxplaylist',
            redirect: '/fxyy/fxplaylist/华语' //重定向保证视图有内容显示全局匹配不到就到films中
          }
        ]
      },
      {
        path: "/fxyy/rankinglist",
        component: () => import("../views/fxyy/RankingList.vue"),
      },
      {
        path: "/fxyy",
        redirect: "/fxyy/recommend"
      }
    ]
  },
  {
    path: "/recommendplaylist",
    component: () => import("../views/fxyy/Recommendplaylist.vue")
  },
  {
    path: '/bk',
    name: 'BK',
    component: () => import( /* webpackChunkName: "about" */ '../views/Bk.vue')
  },
  {
    path: '/sp',
    component: () => import( /* webpackChunkName: "about" */ '../views/Sp.vue')
  },
  {
    path: '/zb',
    component: () => import( /* webpackChunkName: "about" */ '../views/Zb.vue')
  },
  {
    path: '/srfm',
    component: () => import( /* webpackChunkName: "about" */ '../views/Srfm.vue')
  },
  {
    path: '/gz',
    component: () => import( /* webpackChunkName: "about" */ '../views/Gz.vue')
  },
  {
    path: '/recentlyplay',
    component: () => import('../views/Recentlyplay.vue')
  },
  {
    path: '/playdetail/:id',
    component: Playlistdetail,
    children: [{
        path: "/playdetail/:id/list",
        component: () => import( /* webpackChunkName: "about" */ '../views/playlist/List.vue')
      },
      {
        path: "/playdetail/:id/comments",
        component: () => import( /* webpackChunkName: "about" */ '../views/playlist/Comments.vue')
      },
      {
        path: '/playdetail/:id',
        redirect: '/playdetail/:id/list' //重定向保证视图有内容显示全局匹配不到就到films中
      }
    ]
  },
  {
    path: '/playdetails/update',
    component: () => import( /* webpackChunkName: "about" */ '../views/playlist/updatepalylist.vue')
  },
  {
    path: '/searchlist',
    component: () => import( /* webpackChunkName: "about" */ '../views/search/Searchlist.vue'),
    children: [{
        path: "/searchlist/single",
        component: () => import( /* webpackChunkName: "about" */ '../views/search/Single.vue'),
      },
      {
        path: "/searchlist/singer",
        component: () => import( /* webpackChunkName: "about" */ '../views/search/Singer.vue'),
      },
      {
        path: "/searchlist/album",
        component: () => import( /* webpackChunkName: "about" */ '../views/search/Album.vue'),
      },
      {
        path: "/searchlist/video",
        component: () => import( /* webpackChunkName: "about" */ '../views/search/Video.vue'),
      },
    ]
  },
  {
    path: "/lyric",
    component: () => import("../views/Lyric.vue"),
    meta: {
      isaside: true
    }
  },
  {
    path: "*",
    redirect: "/fxyy"
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
