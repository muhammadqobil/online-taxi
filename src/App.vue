<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue';
import { onMounted } from 'vue'
import {piniaState} from "stores/piniaState";
import { useI18n } from 'vue-i18n'
import 'animate.css';

export default defineComponent({
  name: 'App',
  setup(){
    const { locale } = useI18n({ useScope: 'global' });
    onMounted(()=>{
      console.log(piniaState().lang_code)
      locale.value = piniaState().lang_code;
    })
    return{
      locale
    }
  }
})
</script>
