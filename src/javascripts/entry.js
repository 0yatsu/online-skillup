import '../css/base.scss';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App.vue';

// Bootstrap
Vue.use(BootstrapVue);

new Vue({
  el: '#app',
  components: { App },
  template: '<app />'
});
