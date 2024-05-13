<template>
  <div class="sidebar">
    <div class="side-header">
      <h3>M<span v-if="siteWidth===300">y taxi</span></h3>
    </div>

    <div class="side-content">
<!--      <div class="profile">-->
<!--        <div class="profile-img bg-img" style="background-image: url(src/assets/3.jpeg)"></div>-->
<!--        <h4>David Green</h4>-->
<!--        <small>Art Director</small>-->
<!--      </div>-->
      <q-expansion-item
        v-for="(category,index) in piniaGetters().getUserCategories"
        :key="index"
        group="somegroup"
        icon="perm_identity"
        label="Second"
        :label-lines="1"
        :caption-lines="3"
        header-class="text-primary text-bold"
        expand-separator
        class="relative-position overflow-hidden"
        style="z-index: 99;background: rgba(255, 251, 231, 1);"
        >
        <q-item
          v-for="(module,index1) in category.children"
          :key="index1"
          :to="category.path+'/'+module.path"
          clickable
          v-ripple
          :active="piniaGetters().getCurrentRouteName === module.name"
          active-class="text-primary text-italic text-bold shadow-2"
          style="background: rgba(255, 251, 231, 0.1); padding-left: 30px !important;"
          class="q-pl-md text-primary"
        >
          <q-item-section avatar class="q-pl-md q-pr-none">
            <q-icon :name="module.meta.icon"/>
          </q-item-section>
          <q-item-section class="q-pl-none">{{$t(module.meta.title)}}</q-item-section>
        </q-item>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import {defineComponent, watch} from 'vue'
import {piniaGetters} from "stores/piniaGetters";

export default defineComponent({
  name: 'SideBar',
  props: {
    siteWidth:{
      type:Number
    }
  },
  setup(){
    const {getUserCategories,getCurrentRouteName} = piniaGetters();
    return{
      piniaGetters
    }
  },
})
</script>

<style scoped lang="scss" >
  $main-color: #EDAE10;
  $color-dark: #fff;
  $text-grey: #B0B0B0;
  .sidebar {
    position: fixed;
    height: 100%;
    width: 100%;
    left: 0;
    bottom: 0;
    top: 0;
    z-index: 100;
    background: $color-dark;
    transition: left 300ms;

    .side-header {
      box-shadow: 0px 5px 5px -5px rgb(0 0 0 /10%);
      background: $main-color;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .side-header h3, side-head span {
      color: #fff;
      font-weight: 400;
    }
    .side-content {
      height: calc(100vh - 60px);
      overflow: auto;

      .profile {
        text-align: center;
        padding: 2rem 0rem;
      }

      .bg-img {
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 50%;
        background-size: cover;
      }
      .profile-img {
        height: 80px;
        width: 80px;
        display: inline-block;
        margin: 0 auto .5rem auto;
        border: 3px solid #899DC1;
      }

      .profile h4 {
        font-size: 1.125rem;
        color: #fff;
        font-weight: 500;
      }

      .profile small {
        color: #899DC1;
        font-weight: 600;
      }
      .side-menu ul {
        text-align: center;
      }

      .side-menu a {
        display: block;
        padding: 1.2rem 0rem;
      }

      .side-menu a.active {
        background: #2B384E;
      }

      .side-menu a.active span, .side-menu a.active small {
        color: #fff;
        font-weight: bold;
        font-size: 18px;
      }

      .side-menu a span {
        display: block;
        text-align: center;
        font-size: 1.7rem;
      }

      .side-menu a span, .side-menu a small {
        color: #899DC1;
      }
    }
    /* width */
    .side-content::-webkit-scrollbar {
      width: 5px;
    }
    /* Track */
    .side-content::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    .side-content::-webkit-scrollbar-thumb {
      background: #b0b0b0;
      border-radius: 10px;
    }

    /* Handle on hover */
    .side-content::-webkit-scrollbar-thumb:hover {
      background: #b30000;
    }
  }

</style>
