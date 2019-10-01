<template>
  <div>
    <p>
      <img class="logo" src="../images/logo.jpg" alt="ロゴ">
      <span class="sample">サンプルだよ</span>
    </p>
    <MyComponent :message="$data.message" />
    <ul id="send">
      <li v-for="(name, message) in messagelist">
        {{name}}-{{message}}
      </li>
    </ul>
    <form @submit="onSubmit">
      <input v-model="$data.text" type="text">
      <button type="submit">送信</button>
    </form>
    <a>
      地面地面地面地面地面地面地面地面地面地面地面地面
    </a>
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
  methods: {
    /**
     * Enterボタンを押したとき
     */
    onSubmit(e) {
      e.preventDefault();
      socket.emit('send', this.$data.text);
      this.text = ''; // フォームリセット
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
