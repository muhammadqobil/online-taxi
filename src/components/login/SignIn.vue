<template>
  <div class="row q-col-gutter-x-md full-width login_page">
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-0 col-xs-0 flex row justify-center items-center" style="height: 100vh; background-image: url(src/assets/6676294.webp);background-repeat: no-repeat;background-position: center; background-size: contain">

    </div>
    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 my-bg-color flex items-center" style="height: 100vh">
      <div class="login_tabs_wrapper">
<!--        <div class="text-white login_title">New version ga xush kelibsiz</div>-->
<!--        <div class="text-white login_desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum in iure laudantium neque recusandae. Pariatur.</div>-->
        <div class="login_tabs">
          <q-tab-panels
            v-model="tab"
            animated
            swipeable
            vertical
            transition-prev="jump-up"
            transition-next="jump-up"
          >
            <q-tab-panel name="sing-in">
              <q-form @submit.prevent="onSubmit" class="q-gutter-md">
                <div class="q-pa-sm column items-center justify-center login_section">
                  <div class="text-primary q-mb-md text-center">
                    <h6>Tizimga kirish uchun, login va parol kiriting</h6>
                  </div>
                  <div class="q-pa-sm justify-left full-width">
                    <div class="row">
                      <div class="col-12">
                        <label>Login</label>
                        <q-input
                          v-model="bean.login"
                          outlined
                          rounded
                          :label="$t('login.l_username')"
                          :placeholder="$t('login.l_username')"
                          standout="primary white"
                          class="col-12"
                          lazy-rules
                          :rules="[ val => !!val || $t('system.field_is_required') ]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="mdi-account" />
                          </template>
                          <template v-slot:append>
                            <q-icon
                              :name="viewPsw ? 'visibility_off' : 'visibility' "
                              class="cursor-pointer"
                              v-show="false"
                              @click="viewPsw = !viewPsw"

                            />
                          </template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <label>Parol</label>
                        <q-input
                          class="col-12"
                          outlined
                          rounded
                          standout="primary white"
                          :type=" viewPsw ? 'text' : 'password' "
                          v-model="bean.password"
                          :label=" $t('login.l_password') "
                          :placeholder=" $t('login.l_password') "
                          lazy-rules
                          :rules="[
                              val => !!val || $t('system.field_is_required'),
                              val => val.length >= 3 || $t('system.min_6_chars')
                            ]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="mdi-account-key"/>
                          </template>
                          <template v-slot:append>
                            <q-icon
                              :name="viewPsw ? 'visibility_off' : 'visibility' "
                              class="cursor-pointer"
                              @click="viewPsw = !viewPsw"

                            />
                          </template>
                        </q-input>
                      </div>
                      <div class="full-width row wrap justify-between items-center">
                        <q-checkbox v-model="bean.remember" :label="$t('login.l_remember')" color="primary" size="xs"/>
                        <q-btn flat :label="$t('login.l_forgot_password')" color="primary" size="md" no-caps />
                      </div>
                      <div class="full-width row justify-center q-mt-lg">
                        <q-btn type="submit" class="full-width bg-primary text-white" :label="$t('login.l_login')"></q-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </q-form>
            </q-tab-panel>

            <q-tab-panel name="alarms">
              <div class="text-h4 q-mb-md">Alarms</div>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {defineComponent, onMounted, ref} from "vue";
import {urls} from "src/utils/constants";
import {$axios} from "boot/axios";
import $cookie from "boot/cookie";
import { piniaActions } from 'src/stores/piniaActions';
import { piniaGetters } from 'src/stores/piniaGetters';
import { useRouter } from 'vue-router';
import useComp from "src/composables/mixins";
export default defineComponent({
  name: "SignIn",
  setup(){
    const tab = ref('sing-in')
    const bean = ref({
      login:null,
      password:null,
      remember:false
    });
    const viewPsw = ref(false);
    const {setUser, setUserAals} = piniaActions();
    const {getPath} = piniaGetters();
    const router = useRouter();
    const { showError } = useComp();
    const onSubmit = () =>{
      $axios.post(urls.LOGIN , bean.value , {headers: {"content-type": "application/json"}}).then( response => {
        if(!response.data){
          return
        };
        if (bean.value.remember) {
          $cookie.setUserLogin(response.data.user.login);
        } else {
          $cookie.clearUserLogin();
        }

        setUser(response.data.user)
        setUserAals(response.data.user.roles)

        if (getPath) {
          router.replace(getPath)
        } else {
          router.replace('/home');

        }
      } ).catch((error)=>{
        showError(error)
      })
    };
    onMounted(() => {
      if($cookie.isHasUserLogin()){
        bean.value.login = $cookie.getUserLogin()
        bean.value.remember = true
      }
    })
    return{
      tab,
      bean,
      viewPsw,
      onSubmit,
    }
  }
})
</script>

<style scoped lang="scss">
.login_page {
  .my-bg-color{
    background: linear-gradient(45deg, #50a7ea 30%, #1fecb8 100%);
  }
  .login_tabs_wrapper{
    max-width: 480px;
    margin: 5% auto;

    .login_title{
      font-size: 28px;
      margin: 25px 0 15px;
    }
    .login_desc{
      font-size: 16px;
      margin: 0 0 25px;
    }
    .login_tabs{
      border-radius: 15px;
      padding: 15px;
      box-shadow: #00000040 0 14px 28px, #00000038 0 10px 10px;
      background-color: white;

      .login_section{
        max-width: 460px;
      }

    }
  }
}
</style>
