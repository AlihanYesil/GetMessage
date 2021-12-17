import store from './store.js'


const Login = resolve => {
    require.ensure(['./components/Login.vue'], () => {
        resolve(require('./components/Login.vue'));
    })
}

const Register = resolve => {
    require.ensure(['./components/Register.vue'], () => {
        resolve(require('./components/Register.vue'));
    })
}

const index = resolve => {
    require.ensure(['./components/index.vue'], () => {
        resolve(require('./components/index.vue'));
    })
}

export const routes = [
    { 
        path: '/kayit', component: Register 
    },
    {
         path: '/', name: 'giris', component: Login
         },
    { 
        path: '/index', name: 'anasayfa', component: index ,
        beforeEnter: (to, from, next) => {
            if(store.state.user.token){
                next();
            }else{
                next("giris")
            }
            
        }
    },
    { 
        path: "*", redirect: '/'
     }

];

