import '../css/base.scss';

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPaperPlane, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';

// Bootstrap
Vue.use(BootstrapVue);

// fontawesome
library.add(faPaperPlane, faUser);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  el: '#app',
  components: { App },
  template: '<app />'
});
