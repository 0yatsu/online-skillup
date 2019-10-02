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
    <MyComponent :message="$data.message" />
    <ul id="send">
      <li v-for="(name, message) in messagelist" class="my-3 mx-5">
        {{name}}-{{message}}
      </li>
    </ul>
    <footer class="fixed-bottom bg-secondary">
      <div class="text-right m-4">
        <form @submit="onSubmit">
          <input v-model="$data.text" type="text">
          <button type="submit">送信</button>
        </form>
      </div>
      <div class="text-white text-right m-4">
        地面地面地面地面地面地面地面地面地面地面地面地面
      </div>
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand text-white" href="#">pagetop</a>
        </div>
      </div>
    </footer>
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
