<template>
  <div>
    <div>
      <div v-b-modal.modal-center></div>
      <b-modal id="enter" class="modal-center" centered title="Welcome!" v-bind:no-close-on-esc="true" :no-close-on-backdrop="true" :hide-header-close="true">
        <form @submit="onSubmitName" class="input-group">
          <input v-model="$data.name" class="form-control input-group-append" style="border-radius: 0.25rem 0 0 0.25rem;" placeholder="Enter your name">
          <button type="submit" class="btn btn-secondary px-4 mr-2" style="border-radius: 0 0.25rem 0.25rem 0;">
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
      <div class="bg-info pl-4 pb-3" style="z-index: 1;">
        <div class="input-group" style="width: 15rem;">
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
    <div class="pb-5 mb-5" style="z-index: 0;">
      <ul class="send pl-0">
        <div v-for="message in messages" class="mx-auto" style="width: 90%;">
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
      </ul>
      <div class="bg-info pt-3 pb-4" style="position: fixed; bottom: 0; width: 100%;">
        <form @submit="onSubmit" class="input-group">
          <div class="pl-4 col align-self-end input-group-append">
            <input v-model="$data.text" type="text" class="form-control" style="border-radius: 0.25rem 0 0 0.25rem;">
            <button type="submit" class="btn btn-secondary px-4 mr-2">
              <font-awesome-icon icon="paper-plane" />
            </button>
          </div>
        </form>
      </div>
    </div>
    <footer class="text-center bg-info fixed-bottom pt-3">
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
    MyComponent,
  },
  data() {
    return {
      name: '',
      text: '',
      mymessage: {}, // 送信したname,textをuser,contentに格納する用
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
    /**
     * Enterボタンを押したとき
     */
    onSubmitName(e) {
      e.preventDefault();
      if (this.$data.name === '') {
        return 1;
      } else {
        this.$data.message = { user: 'systemmessage', content: this.$data.name + ' さんが参加しました！' };
        socket.emit('send', (this.$data.message));
        this.$bvModal.hide('enter');
      }
    },

    onSubmit(e) { // message送信
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
//
</style>
