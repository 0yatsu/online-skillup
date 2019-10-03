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
      <form @submit="onSubmit">
        <div class="input-group" style="width: 18rem;">
          <div class="input-group-prepend">
            <span class="input-group-text" id="user">
              <font-awesome-icon icon="user" />
            </span>
          </div>
          <input  v-model="$data.username" type="text" class="form-control" placeholder="Username">
        </div>
      </form>
    </div>
    <ul id="send">
      <li v-for="message in messagelist" class="card card-body bg-light py-1 my-2" style="width: 18rem;">
        {{message}}
      </li>
    </ul>
    <div class="p-5">
    </div>
    <div class="bg-secondary fixed-bottom pt-3 ">
      <footer class="text-center">
        <form @submit="onSubmit" class="input-group">
          <input v-model="$data.text" type="text" class="form-control ml-2">
          <div class="inputgroup-append">
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
      message: '',
      messagelist: [], // 送受信したmessageを格納
      text: '',
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
      if (this.$data.text === '') {
        return 1; // フォームが空欄のときは送信しない
      } else {
        socket.emit('send', this.$data.text);
        this.text = ''; // フォームリセット
      }
    },
    /**
     * message表示
     * @param {String} text
     * @param {String} user
     */
    pushMessage: function(text, user) {
      console.log('## pushMessage()');
      console.log('message = ${message}, user = ${user}');
      this.text.push({
        'message': text,
        'user': user
      });
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
