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
const profil = resolve => {
    require.ensure(['./components/profil.vue'], () => {
        resolve(require('./components/profil.vue'));
    })
}

const index = resolve => {
    require.ensure(['./components/index.vue'], () => {

        resolve(require('./components/index.vue'));
    })
}










const loginMiddleware = function () {
    if (localStorage.WelcomeToken) {
        store.commit("setToken", localStorage.WelcomeToken);
        store.commit("setId", localStorage.WelcomeId);
        store.commit("setName", localStorage.WelcomeName);
        store.commit("setSurname", localStorage.WelcomeSurname);
        store.commit("loginChangeStatus", true);
    }
    
    return store.getters.isLogin

}






export const routes = [
    {
        path: '/kayit', component: Register
    },



    {
        path: '/', name: 'giris', component: Login,
        beforeEnter: (to, from, next) => {
            
            if (loginMiddleware()) {
                next('/index');
            }
            next()
        }
    },

    

    {
        path: '/profil', name: 'profil', component: profil,
        beforeEnter: (to, from, next) => {
            
            if (loginMiddleware()) {
                next();
            } else {
                next("/")
            }

        }
    },


    {
        path: '/index', name: 'anasayfa', component: index,
        beforeEnter: (to, from, next) => {
        

            if (loginMiddleware()) {
                next();
            } else {
                next("/")
            }

        }
    },
   





    {
        path: "*", redirect: '/'
    }

];

