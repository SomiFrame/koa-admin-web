import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@page/Layout.vue'
import Home from '@page/Home.vue'
import Login from '@page/Login.vue'
import Register from '@page/Register.vue'
import Video from '@page/video'
import VideoList from '@page/video/list.vue'
import VideoAdd from '@page/video/add.vue'
import VideoEdit from '@page/video/edit.vue'
import Tag from '@page/tag'
import TagList from '@page/tag/list.vue'
import TagAdd from '@page/tag/add.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'layout',
        component: Layout,
        children: [
            {
                path:'',
                name: 'home',
                component: Home
            },
            {
                path: 'about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
            },
            {
                path:'video',
                name: 'video',
                component: Video,
                children: [
                    {
                        path: 'list',
                        component: VideoList
                    },
                    {
                        path: 'add',
                        component: VideoAdd
                    },
                    {
                        path: 'edit/:id',
                        component: VideoEdit
                    }
                ]
            },
            {
                path:'tag',
                name: 'tag',
                component: Tag,
                children: [
                    {
                        path: 'list',
                        component: TagList
                    },
                    {
                        path: 'add',
                        component: TagAdd
                    }
                ]
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
  ]
})
