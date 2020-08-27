<template>
  <div>
    <div class="mb-5">
      <form @submit.prevent="addMessage">
        <div class="form-group">
          <label for="username">Username</label>
          <input v-model="message.username"
            type="text"
            class="form-control"
            id="username"
            aria-describedby="usernameHelp">
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input v-model="message.subject"
            type="text"
            class="form-control"
            id="subject">
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea v-model="message.message"
            name="message"
            id="message"
            class="form-control"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
    <ul class="list-unstyled">
      <li class="media mb-3 border-bottom" v-for="message in messages" :key="message._id">
        <img v-if="message.imageUrl" :src="message.imageUrl" alt=""
        class="align-self-start mr-3 mb-2 pt-2">
        <div class="media-body">
          <h4 class="mb-0">{{ message.subject }}</h4>
          <small class="mt-0">{{ message.username }}</small><br>
          <span>{{ message.message }}</span>
          <br />
          <small class="float-right">{{message.createMessage}}</small>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
const API_URL = 'http://localhost:3000/messages';

export default {
  name: 'Home',
  data: () => ({
    messages : [],
    message: {
      username: '',
      subject: '',
      message: '',
      imageUrl: '',
    },
  }),
  mounted() {
    fetch(API_URL)
      .then((response) => response.json())
      .then((results) => {
        this.messages = results ; // eslint-disable-line
      });
  },
  methods: {
    addMessage() {
      console.log(this.message); // eslint-disable-line
    }
  }
};
</script>

<style>
img {
  width: 100px;
  height: auto;
}
</style>
