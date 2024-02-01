<template>
  <div>
    <div>
      <input v-model="from" type="text" placeholder="Choose a nickname" />
    </div>
    <br />
    <div>
      <button @click="connect" :disabled="connected">Connect</button>
      <button @click="disconnect" :disabled="!connected">Disconnect</button>
    </div>
    <br />
    <div v-if="connected">
      <input v-model="text" type="text" placeholder="Write a message..." />
      <button @click="sendMessage">Send</button>
      <p v-for="message in messages" :key="message.id">
        {{ message.from }}: {{ message.text }} ({{ message.time }})
      </p>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import SockJS from "sockjs-client/dist/sockjs"
import {Stomp} from '@stomp/stompjs';

export default {
  name:'MyForm',
  setup() {
    const from = ref('');
    const text = ref('');
    const connected = ref(false);
    const messages = ref([]);
    let stompClient = null;

    function connect() {
      const url = 'http://192.168.12.7:8080/chat'
      const socket = new SockJS(url);
      stompClient = Stomp.over(socket);
      stompClient.connect({}, (frame) => {
        connected.value = true;
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', (messageOutput) => {
          showMessageOutput(JSON.parse(messageOutput.body));
        });
      });
    };
    function disconnect() {
      if (stompClient !== null) {
          stompClient.disconnect();
      }
      connected.value = false;
      console.log('Disconnected');
    };
    function sendMessage() {
      stompClient.send(
        '/app/chat',
        {},
        JSON.stringify({ from: from.value, text: text.value })
      );
      text.value = '';
    };
    function showMessageOutput(messageOutput) {
      console.log('123=>',messageOutput)
      messages.value.push(messageOutput);
    };
    return {
      from,
      text,
      connected,
      messages,

      //functions
      connect,
      disconnect,
      sendMessage,
      showMessageOutput
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
