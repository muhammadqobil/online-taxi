<template>
  <q-page class="q-mt-md">

    <q-card class="q-mb-md">
      <q-card-section>
        <h1>Subscribe</h1>
        <q-form @submit="doSubscribe">
          <q-input v-model="subscription.topic" label="Topic"></q-input>
          <q-select
            v-model="subscription.qos"
            :options="qosList"
            label="QoS"
          ></q-select>
          <q-btn
            type="submit"
            color="primary"
          >
            {{ subscribeSuccess ? "Subscribed" : "Subscribe" }}
          </q-btn>
          <q-btn
            v-if="subscribeSuccess"
            color="primary"
            @click="doUnSubscribe"
          >
            Unsubscribe
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <h1>Publish</h1>
        <q-form @submit="doPublish">
          <q-input v-model="publish.topic" label="Topic"></q-input>
          <q-input v-model="publish.payload" label="Payload"></q-input>
          <q-select v-model="publish.qos" :options="qosList" label="QoS"></q-select>
          <q-btn type="submit" color="primary">
            Publish
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
    <q-card class="q-mb-md">
      <q-card-section>
        <h1>Receive</h1>
        <q-input
          v-model="receiveNews"
          label="Received Messages"
          type="textarea"
          :rows="3"
          readonly
        ></q-input>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref, reactive, onMounted, defineComponent } from 'vue';
import mqtt from "mqtt";

export default defineComponent({
  name: 'MyForm',
  setup(){
    const connection = ref({
      protocol: 'ws',
      host: '91.227.40.29',
      port: 8083,
      endpoint: '/mqtt',
      clean: true,
      connectTimeout: 30 * 1000,
      reconnectPeriod: 4000,
      clientId: `emqx_vue_${Math.random().toString(16).substring(2, 8)}`,
      username: 'emqx_test',
      password: 'emqx_test',
    });

    const subscription = ref({
      topic: 'topic/mqttx',
      qos: 0,
    });

    const publish = ref({
      topic: 'taksi',
      qos: 0,
      payload: 'nima',
    });

    const receiveNews = ref('');
    const qosList = [0, 1, 2];
    const client = ref({ connected: false });
    const subscribeSuccess = ref(false);
    const connecting = ref(false);
    let retryTimes = 0;

    const handleOnReConnect = () => {
      retryTimes++;
      if (retryTimes > 5) {
        try {
          initData();
          console.error('Connection maxReconnectTimes limit, stop retry');
        } catch (error) {
          console.error(error.toString());
        }
      }
    };

    const initData = () => {
      client.value = { connected: false };
      retryTimes = 0;
      connecting.value = false;
      subscribeSuccess.value = false;
    };

    const createConnection = () => {
      try {
        connecting.value = true;
        const { protocol, host, port, endpoint, ...options } = connection.value;
        console.log(options)
        const connectUrl = `ws://91.227.40.29:8083/mqtt`;
        client.value = mqtt.connect(connectUrl, options);
        if (client.value.on) {
          client.value.on('connect', () => {
            connecting.value = false;

            client.value.subscribe("taksi", (err) => {
              if (!err) {
                client.value.publish("taksi", "Hello mqtt nima gap");
              }
            });
            console.log('Connection succeeded!');
          });

          // client.value.on('reconnect', handleOnReConnect);
          client.value.on('error', error => {
            console.log('Connection failed', error);
          });
          client.value.on('message', (topic, message) => {
            receiveNews.value = receiveNews.value.concat(message);
            console.log(`Received message ${message} from topic ${topic}`);
          });
        }
      } catch (error) {
        connecting.value = false;
        console.log('mqtt.connect error', error);
      }
    };

    const doSubscribe = () => {
      const { topic, qos } = subscription.value;
      client.value.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.log('Subscribe to topics error', error);
          return;
        }
        subscribeSuccess.value = true;
        console.log('Subscribe to topics res', res);
      });
    };

    const doUnSubscribe = () => {
      const { topic } = subscription.value;
      client.value.unsubscribe(topic, error => {
        if (error) {
          console.log('Unsubscribe error', error);
        }
      });
    };

    const doPublish = () => {
      const { topic, qos, payload } = publish.value;
      client.value.publish(topic, payload, { qos }, error => {
        if (error) {
          console.log('Publish error', error);
        }
      });
    };

    const destroyConnection = () => {
      if (client.value.connected) {
        try {
          client.value.end(false, () => {
            initData();
            console.log('Successfully disconnected!');
          });
        } catch (error) {
          console.log('Disconnect failed', error.toString());
        }
      }
    };


    onMounted(createConnection);

    return {
      connection,
      subscription,
      publish,
      receiveNews,
      qosList,
      client,
      subscribeSuccess,
      connecting,
      createConnection,
      doSubscribe,
      doUnSubscribe,
      doPublish,
      destroyConnection,
    };
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
