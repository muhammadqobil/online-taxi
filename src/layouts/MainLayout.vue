<template>
  <q-layout view="lHh Lpr lFf">
    <base-header :siteWidth="siteWidth" @setSiteBarWidth="setEmitValue" :leftDrawerOpen="leftDrawerOpen"/>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      :width="siteWidth"
    >
      <q-list>
        <q-item-section class="flex justify-center items-center">
          <q-icon name="print" class="q-mt-lg" color="teal" size="40px" />
        </q-item-section>

        <side-bar
          :siteWidth="siteWidth"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import SideBar from 'components/SideBar.vue'
import BaseHeader from "components/base/BaseHeader.vue";


export default defineComponent({
  name: 'MainLayout',

  components: {
    BaseHeader,
    SideBar
  },

  setup () {
    const leftDrawerOpen = ref(true)
    const siteWidth = ref(70)
    const setEmitValue = (e) =>{
      console.log(e)
      leftDrawerOpen.value = e.leftDrawerOpen;
      siteWidth.value = e.siteWidth;
    }
    return {
      siteWidth,
      leftDrawerOpen,
      setEmitValue
    }
  }
})
</script>
