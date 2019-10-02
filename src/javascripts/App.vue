<template>
  <div>
    <header class="sticky-top">
      <div class="bg-secondary">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand text-white" href="#">Bootstrap</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
    <ul id="send">
      <li v-for="(name, message) in messagelist" class="card card-body bg-light py-1 my-2">
        {{message}}-{{name}}
      </li>
    </ul>
    <div>
      <footer class="fixed-bottom bg-secondary text-center">
        <form @submit="onSubmit" class="input-group mt-2">
          <input v-model="$data.text" type="text" class="form-control ml-2">
          <div class="inputgroup-append">
            <button type="submit" class="btn btn-info px-4 mr-2">送信</button>
          </div>
        </form>
        <div class="container-fluid">
          <div class="navbar-header">
            <a class="navbar-brand text-white" href="#">pagetop</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import socket from './utils/socket';

// components
import MyComponent from './components/MyComponent.vue';

export default {
  components: {
    MyComponent
  },
  data() {
    return {
      message: '',
      messagelist: [],
      text: '',
      name: 'name'
    };
  },
  created() {
    socket.on('connect', () => {
      console.log('connected!');
    });

    socket.on('send', (message) => {
      console.log(message);
      this.$data.message = message;
      this.$data.messagelist.push(message);
    });
  },
  updated() {
    this.scrollToEnd();
  },
  methods: {
    /**
     * Enterボタンを押したとき
     */
    onSubmit(e) {
      e.preventDefault();
      socket.emit('send', this.$data.text);
      this.text = ''; // フォームリセット
    },

    // 下までスクロール
    scrollToEnd() {
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.logo {
  width: 40px;
}

.sample {
  color: $red;
}
</style>
