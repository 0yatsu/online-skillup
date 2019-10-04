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
    <div class="bg-secondary px-2 pb-3">
      <div class="input-group" style="width: 18rem;">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <font-awesome-icon icon="user" />
          </span>
        </div>
        <input v-model="$data.name" type="text" class="form-control" placeholder="Username">
      </div>
    </div>
    <ul class="username send">
      <li v-for="message in messages" class="card card-body bg-light p-2">
        <div class="pl-2">
          <div class="pb-2">
            {{message.user}}
            <font-awesome-icon icon="caret-right" class="mx-2 pt-2" style="font-size: 24px;" />
            {{message.content}}
          </div>
        </div>
      </li>
    </ul>
    <div class="p-5">
    </div>
    <div class="bg-secondary fixed-bottom pt-3 ">
      <footer class="text-center">
        <form @submit="onSubmit" class="input-group">
          <input v-model="$data.name" type="hidden" class="form-control" placeholder="Username">
          <input v-model="$data.text" type="text" class="form-control">
          <div class="input-group-append">
            <button type="submit" class="btn btn-info px-4 mr-2">
              <font-awesome-icon icon="paper-plane" />
            </button>
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
      name: '',
      text: '',
      // user: '', // inputしたユーザー名
      // content: '', // inputしたメッセージ
      /*
      cards: [
        { userlist: [] }, // 送受信したuserを格納
        { messagelist: [] }, // 送受信したmessageを格納
      ],
      */
      message: {},
      messages: [] // 送受信したname,textをuser,contentに格納
    };
  },
  created() {
    socket.on('connect', () => {
      console.log('connected!');
    });

    socket.on('send', (message) => {
      console.log(message);
      // this.$data.message = message;
      this.$data.messages.push(message);
    });

    /*
    socket.on('username', (user) => {
      console.log(user);
      this.$data.user = user;
      this.$data.cards.userlist.push(user);
    });
    */
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
        this.$data.message = { user: this.$data.name, content: this.$data.text };
        socket.emit('send', (this.$data.message));
        this.text = ''; // フォームリセット
      }
    },
    /**
     * message表示
     * @param {String} text
     * @param {String} user
     */
    /*
    pushMessage: function(text, user) {
      console.log('## pushMessage()');
      console.log('message = ${message}, user = ${user}');
      this.text.push({
        'message': text,
      });
      this.user.push({
        'user': user
      });
    },
    */
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
