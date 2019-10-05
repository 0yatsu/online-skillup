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
    <div class="bg-secondary pl-3 pb-3" style="z-index: 1; position: fixed; width: 100%;">
      <div class="input-group" style="width: 18rem;">
        <div class="input-group-prepend">
          <div class="input-group-text">
            <font-awesome-icon icon="user" />
          </div>
        </div>
        <input v-model="$data.name" type="text" class="form-control" placeholder="Username">
      </div>
    </div>
    <div class="py-5 mb-5" style="z-index: 0;">
      <ul class="username send">
        <li v-for="message in messages" class="card card-body bg-light p-2 m-3">
          <div class="pl-2">
              <div class="pb-2">
                {{message.user}}
                <font-awesome-icon icon="caret-right" class="mx-2 pt-2" style="font-size: 24px;" />
                {{message.content}}
              </div>
            </div>
        </li>
      </ul>
      <div class="bg-secondary pt-3 pb-4" style="position: fixed; bottom: 0; width: 100%;">
        <form @submit="onSubmit" class="input-group">
          <input v-model="$data.name" type="hidden" class="form-control" placeholder="Username">
          <div class="ml-2 col align-self-end input-group-append">
            <input v-model="$data.text" type="text" class="form-control" style="border-radius: 0.25rem 0 0 0.25rem;">
            <button type="submit" class="btn btn-info px-4 mr-2">
              <font-awesome-icon icon="paper-plane" />
            </button>
          </div>
        </form>
      </div>
      <div class="m-2">
        <a class="text-black" href="#">pagetop</a>
      </div>
    </div>
    <footer class="text-center bg-secondary fixed-bottom pt-3">
      <div class="container-fluid">
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
      name: '',
      text: '',
      message: {}, // 送信するname,textをuser,content格納する用
      messages: [] // 送受信したmessageを格納する用
    };
  },
  created() {
    socket.on('connect', () => {
      console.log('connected!');
    });

    socket.on('send', (message) => {
      console.log(message);
      this.$data.messages.push(message);
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
      if (this.$data.text === '' | this.$data.name === '') {
        return 1; // ユーザー名またはフォームが空欄のときは送信しない
      } else {
        this.$data.message = { user: this.$data.name, content: this.$data.text }; // nameとcontentをmessageとして送信
        socket.emit('send', (this.$data.message));
        this.text = ''; // フォームリセット
      }
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
