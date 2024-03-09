<template>
  <q-page padding class="row items-start justify-center q-pa-sm">
    <q-card bordered class="fit">
      <module-header/>
      <staff-list class="q-pa-md"/>
    </q-card>
  </q-page>
</template>

<script>
import ModuleHeader from "components/base/ModuleHeader.vue";
import StaffList from "components/myTaxi/Staffs.vue";
export default {
  name: "PageStaffs",
  components: {StaffList, ModuleHeader}
}
</script>

<style scoped>

</style>
