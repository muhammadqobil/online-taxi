<template>
  <q-layout view="lHh Lpr lFf">
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
          Quasar App
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

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


export default defineComponent({
  name: 'MainLayout',

  components: {
    SideBar
  },

  setup () {
    const leftDrawerOpen = ref(true)
    const siteWidth = ref(70)
    return {
      leftDrawerOpen,
      siteWidth,
      toggleLeftDrawer () {
        // leftDrawerOpen.value = true
        if (leftDrawerOpen.value){
          if (siteWidth.value === 300 ){
            siteWidth.value = 70
          }else {
            siteWidth.value = 300
          }
        }else {
          leftDrawerOpen.value = true
          siteWidth.value = 300
        }
      }
    }
  }
})
</script>
