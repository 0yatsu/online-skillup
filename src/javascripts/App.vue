<template>
  <div>
    <div>
      <div v-b-modal.modal-center></div>
      <b-modal id="enter" class="modal-center" centered title="Welcome!" v-bind:no-close-on-esc="true" :no-close-on-backdrop="true" :hide-header-close="true">
        <form @submit="onSubmitName" class="input-group send-form">
          <input v-model="$data.name" class="form-control input-group-append" placeholder="Enter your name">
          <button type="submit" class="btn btn-secondary px-4 mr-2">
            <font-awesome-icon icon="paper-plane" />
          </button>
        </form>
        <div slot="modal-footer">
        </div>
      </b-modal>
    </div>
    <header class="sticky-top">
      <div class="bg-info">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand text-white" href="#">atChat</a>
            </div>
          </div>
        </nav>
      </div>
      <div class="bg-info pl-4 pb-3">
        <div class="input-group" style="width: 15em;">
          <div class="input-group-prepend">
            <div class="input-group-text">
              <font-awesome-icon icon="user" />
            </div>
          </div>
          <div type="text" class="form-control text-center" placeholder="Username">
            {{$data.name}}
          </div>
        </div>
      </div>
    </header>
    <div class="pb-4 mb-5">
      <div class="send">
        <div v-for="message in messages" class="mx-4" >
          <div v-if="message.user===$data.name" class="card card-body alert alert-info p-2 m-3 pl-2">
            <div class="pb-2 pl-2">
              {{message.user}}
              <font-awesome-icon icon="caret-right" class="mx-2 pt-2" style="font-size: 24px;" />
              {{message.content}}
            </div>
          </div>
          <div v-else-if="message.user==='systemmessage'" class="card card-body bg-white p-2 m-3 pl-2">
            <div class="pb-2 pl-2">
              {{"System"}}
              <font-awesome-icon icon="caret-right" class="mx-2 pt-2" style="font-size: 24px;" />
              {{message.content}}
            </div>
          </div>
          <div v-else class="card card-body alert-secondary p-2 m-3 pl-2">
            <div class="pb-2 pl-2">
              {{message.user}}
              <font-awesome-icon icon="caret-right" class="mx-2 pt-2" style="font-size: 24px;" />
              {{message.content}}
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="text-center bg-info fixed-bottom py-3">
      <form @submit="onSubmit" class="input-group send-form">
        <div class="pl-4 col align-self-end input-group-append">
          <input v-model="$data.text" type="text" class="form-control">
          <button type="submit" class="btn btn-secondary px-4 mr-2">
            <font-awesome-icon icon="paper-plane" />
          </button>
        </div>
      </form>
    </footer>
  </div>
</template>

<script>
import socket from './utils/socket';

// components
import MyComponent from './components/MyComponent.vue';

export default {
  components: {
    MyComponent,
  },
  data() {
    return {
      name: '',
      text: '',
      message: {}, // 受信したname,textをuser,contentに格納する用
      messages: [], // 送受信したmessageを格納する用
    };
  },
  created() {
    socket.on('connect', () => {
      console.log('connected!');
      this.$bvModal.show('enter');
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
    // name送信
    onSubmitName(e) {
      e.preventDefault();
      if (this.$data.name === '') {
        return;
      } else {
        this.$data.message = { user: 'systemmessage', content: this.$data.name + ' さんが参加しました！' };
        socket.emit('send', (this.$data.message));
        this.$bvModal.hide('enter');
      }
    },
    // message送信
    onSubmit(e) {
      e.preventDefault();
      if (this.$data.text === '' | this.$data.name === '') {
        return; // ユーザー名またはメッセージフォームが空欄のときは送信しない
      } else {
        this.$data.message = { user: this.$data.name, content: this.$data.text }; // userとcontentをmessageとして送信
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
//
</style>
