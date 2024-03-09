<template>
  <q-page class="row justify-center items-center no-padding no-border">
    <q-card class="flex fit justify-center no-border no-margin no-shadow">
      <sign-in/>
    </q-card>
  </q-page>
</template>

<script>
import SignIn from "components/login/SignIn.vue";
export default {
  name: "LoginPage",
  components: {SignIn},
}
</script>

<style scoped>

</style>
