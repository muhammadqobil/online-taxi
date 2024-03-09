<template>
  <div>
    <q-card-section
      class="hedr q-card__section q-py-xs bg-primary text-white q-px-sm"
      style="border-radius: 5px 5px 0 0"
    >
      <div class="flex row items-center">
        <div class="">
          <q-icon name="mdi-information-outline" size="md" />
        </div>
        <div class="col-11 q-pl-sm">
          <div>
            {{ $t(currentModule().meta.title) }}
          </div>
          <div class="text-caption">
            {{ $t(currentModule().meta.description) }}
          </div>
        </div>
      </div>
    </q-card-section>
  </div>
</template>

<script lang="ts">
import useComp from "src/composables/mixins";
import { defineComponent } from "vue";
export default defineComponent({
  name: "ModuleHeader",
  setup() {
    const { currentModule } = useComp();
    return {
      currentModule,
    };
  },
});
</script>
