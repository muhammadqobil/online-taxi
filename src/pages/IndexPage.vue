<template>
  <div class="items-center">
    <my-form/>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import MyForm from "pages/MyForm.vue";

export default {
  components: {MyForm},
  setup() {
  },
};
</script>
