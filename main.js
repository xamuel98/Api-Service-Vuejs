// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import jQuery from 'jquery';
import 'popper.js';
import ApiService from './services/api.service'
import {TokenService} from './services/storage.service'
import Vuex from 'vuex'
import {store} from './store/store'
// import 'buefy/dist/buefy.css'
// import Buefy from 'buefy'
// Vue.use(Buefy)
// Set the base URL of the API
ApiService.init('http://confirm.test/api/');
// If token exists set header
if(TokenService.getToken()){
  ApiService.setHeader();
}

window.$ = window.jQuery = jQuery;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store : store,
  router,
  components: { App },
  template: '<App/>'
})
