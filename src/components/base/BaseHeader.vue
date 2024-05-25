<template>
  <q-header elevated style="height: 60px;">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />

      <q-toolbar-title>
        {{$t('app_name')}}
      </q-toolbar-title>
      <div class="flex justify-center items-center column date-container q-mx-sm">
        <div class="text-bold">{{currentTime}}</div>
        <div class="text-bold">{{$dateutil.formatDate(new Date(), "DD.MM.YYYY")}}</div>
      </div>
      <q-select
        v-model="language"
        :options="languages"
        option-value="code"
        option-label="name"
        :display-value="language ? language.name : 'No'"
        borderless
        transition-show="flip-up"
        transition-hide="flip-down"
      >
        <template v-slot:selected="">
          <div class="text-bold active_label_color text-white" v-if="language?.name">
            {{ language.name }}
          </div>
        </template>

        <template #option="props">
          <q-item
            v-bind="props.itemProps"
            v-on="props.itemEvents"
            style="cursor: pointer"
          >
            <div class="row full-width">
              <div class="col col-12" v-if="props.opt?.name">
                {{ props.opt["name"] }}
              </div>
            </div>
          </q-item>
        </template>
      </q-select>
      <div>
        <q-btn
          dense flat round
          @click="$q.fullscreen.toggle()"
          :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
        />

        <q-btn dense flat round icon="mdi-exit-to-app" @click="logout"/>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import {computed, defineComponent, onMounted, ref} from "vue";
import useComp from "src/composables/mixins";
import {useRouter} from "vue-router";
import {piniaActions} from "stores/piniaActions";
import {piniaState} from "stores/piniaState";
import {useI18n} from 'vue-i18n'
import {i18n} from "src/boot/i18n";

export default defineComponent({
  name: "BaseHeader",
  emits: ['setSiteBarWidth'],
  props: {
    siteWidth: {
      type: Number
    },
    leftDrawerOpen: {
      type: Boolean
    }
  },
  setup(props, {emit}) {
    const {confirmDialog} = useComp();
    const router = useRouter();
    const {clearUserSession} = piniaActions();
    const $t = i18n.global.t;
    const { locale } = useI18n({ useScope: 'global' });
    const logout = () => {
      confirmDialog($t('captions.l_confirm'), $t('captions.l_you_really_exit'), () => {
        router.replace('/login');
        clearUserSession()
      });
    }
    const toggleLeftDrawer = () => {
      if (props.leftDrawerOpen) {
        console.log(props.siteWidth)
        if (props.siteWidth === 300) {
          emit('setSiteBarWidth', {siteWidth: 70, leftDrawerOpen: true});
        } else {
          emit('setSiteBarWidth', {siteWidth: 300, leftDrawerOpen: true});
        }
      } else {
        emit('setSiteBarWidth', {siteWidth: 300, leftDrawerOpen: true});
      }
    }

    const language = computed({
      get:()=> {
        if (!i18n.locale) {
          // if (i18n.locale = piniaState().user) {
          //   i18n.locale = piniaState().user.lang_code;
          // } else {
          // }
          i18n.locale = piniaState().lang_code;
        }
        return piniaState().appLocales.find(
          (locale) => locale.code === piniaState().lang_code
        );
      },
      set:(langObj)=> {
        locale.value = langObj.code;
        piniaActions().setUserLangCode(locale.value);
        // window.location.reload();
        // this.$axios.post(urls.SET_LANG, 'lang=' + langObj.code, {headers: {'content-type': 'application/x-www-form-urlencoded'}})
        //   .then(response => {
        //   })
        //   .catch(e => {
        //     this.showError(e);
        //   });
      }
    })
    const  languages = computed(()=> piniaState().appLocales);
    const currentTime = ref('') ;
    const time = () =>{
      const d = new Date();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();

      if (hours < 10){
        hours = '0'+hours
      }
      if (minutes < 10){
        minutes = '0'+minutes
      }
      if (seconds < 10){
        seconds = '0'+seconds
      }
      currentTime.value = hours + ':' + minutes + ':' + seconds
      return currentTime;
    }

    onMounted(()=>{
      setInterval(()=>{
        time();
      },1000);
    })
    return {
      toggleLeftDrawer,
      logout,
      languages,
      language,
      currentTime
    }
  }
})
</script>

<style scoped>
.date-container{
  border: 1.5px solid #f3f2f2;
  padding:5px 10px;
  border-radius: 3px;
}
</style>
