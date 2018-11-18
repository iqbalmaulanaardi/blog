import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            name: 'blogs',
            component: () =>
                import ('@/components/AllBlogs'),
        },
        {
            path: '/blog',
            name: 'blog',
            component: () =>
                import ('./views/Blog.vue'),
            children: [{
                path: 'blog',
                name: 'childblogall',
                component: () =>
                    import ('@/components/AllBlogs')
            }, {
                path: 'add',
                name: 'addarticle',
                component: () =>
                    import ('@/components/Addarticle.vue')
            }, {
                path: 'myblogs',
                name: 'myblogs',
                component: () =>
                    import ('@/components/MyBlogs.vue')
            }, {
                path: 'edit/:id',
                name: 'editblog',
                component: () =>
                    import ('@/components/Editarticle.vue')
            }, {
                path: ':id',
                name: 'childblogdetail',
                component: () =>
                    import ('@/components/DetailedBlog')
            }]
        },
        {
            path: '/login',
            name: 'login',
            component: () =>
                import ('./views/Login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () =>
                import ('./views/Register.vue')
        },
        {
            path: '/livechat',
            name: 'livechat',
            component: () =>
                import ('./components/Chat.vue')
        }
    ],

})