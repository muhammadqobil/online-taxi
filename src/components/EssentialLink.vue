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

      <div class="side-menu">
        <ul>
          <li>
            <a href="" class="active">
              <span>
                <q-icon name="mdi-home" size="md"/>
              </span>
              <small v-if="siteWidth === 300">Dashboard</small>
            </a>
          </li>
          <li>
            <a href="">
              <span class="las la-user-alt"></span>
              <small>Profile</small>
            </a>
          </li>
          <li>
            <a href="">
              <span class="las la-envelope"></span>
              <small>Mailbox</small>
            </a>
          </li>
          <li>
            <a href="">
              <span class="las la-clipboard-list"></span>
              <small>Projects</small>
            </a>
          </li>
          <li>
            <a href="">
              <span class="las la-shopping-cart"></span>
              <small>Orders</small>
            </a>
          </li>
          <li>
            <a href="">
              <span class="las la-tasks"></span>
              <small>Tasks</small>
            </a>
          </li>

        </ul>
      </div>
    </div>
  </div>
<!--  <q-item-->
<!--    clickable-->
<!--    tag="a"-->
<!--    :active="link === 'test'"-->
<!--    @click="link === 'test'"-->
<!--    active-class="border"-->

<!--  >-->
<!--    <q-item-section-->
<!--      v-if="icon"-->
<!--      avatar-->
<!--    >-->
<!--      <q-icon :name="icon" />-->
<!--    </q-item-section>-->
<!--    <q-item-section v-if="siteWidth === 300">-->
<!--      <q-item-label>{{ title }}</q-item-label>-->
<!--      <q-item-label caption>{{ caption }}</q-item-label>-->
<!--    </q-item-section>-->
<!--  </q-item>-->
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EssentialLink',
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },
    siteWidth:{
      type:Number
    }
  }
})
</script>

<style scoped lang="scss" >
  * {
    margin: 0;
    padding: 0;
    text-decoration: none;
    list-style-type: none;
    box-sizing: border-box;
    font-family: 'Merriweather', sans-serif;
  }
  $main-color: #22BAA0;
  $color-dark: #34425A;
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
