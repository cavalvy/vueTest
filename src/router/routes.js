export default [
    {
        path: '/auth/register',
        name: 'Register',
        component: () => import('@/views/auth/Register')
    },
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home')
    },
    {
        path: '*',
        redirect: '/'
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: () => import('@/views/auth/Login')
    },
    {
        path: '/users/1/edit',
        component: () => import('@/views/users/Edit.vue'),
        children : [{
            path : '',
            name : 'EditProfile',
            component: () => import('@/views/users/Profile.vue'),
            // auth 为 true，标识当前路由需要登录才能访问
            meta: { auth: true }
        }]
    },
]