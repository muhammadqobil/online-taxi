<template>
  <q-dialog :value="value" @input="updateValue($event)" persistent
            content-style="backdrop-filter:grayscale(10%);"
            transition-show="scale"
            transition-hide="scale"
  >
    <q-card>
      <q-bar class="bg-primary text-white">

        <div class="cursor-pointer text-white">{{modelId===null?this.$t('system.new'):this.$t('system.edit')}}</div>
        <q-space/>
        <q-btn dense flat icon="close" v-close-popup class="q-px-none">
          <q-tooltip :delay="1000" content-class="bg-secondary text-white">{{$t('system.l_close')}}</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form ref="editForm" @submit="onSubmit" @validation-error="onValidationError">
        <q-card-section class="q-pa-sm">

          <slot></slot>

        </q-card-section>
        <q-separator color="secondary"/>
        <q-card-actions align="right" class="q-pa-sm">
          <div class="q-pa-md q-gutter-md">
            <q-chip dense square size="10" :color="modelId?'primary':'accent'" text-color="white" icon="mdi-key"
            >
              {{this.$t('captions.l_id')+': '+(modelId===null?this.$t('system.new'):modelId)}}
            </q-chip>
          </div>
          <q-space/>
          <q-btn flat :label="$t('system.l_cancel')" class="text-secondary" v-close-popup/>
          <q-btn flat :loading="loading" :label="$t('system.l_save')" class="text-secondary text-bold" type="submit"/>
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch } from "vue"

  export default defineComponent({
    name: 'StandartInputDialog',
    props: {
      value: {type: Boolean},
      modelId: {type: Number},
      onSubmit: {type: Function},
      onValidationError: {type: Function},
      loading:{type:Boolean},
      isReset:{type:Boolean}
    },
    setup(props, {emit}) {
      const editForm = ref();
      function updateValue(ev) {
        emit('input', ev);
      }

      watch(() => props.isReset, (newVal, oldVal) => {
        editForm.value.reset();
      })

      return {
        updateValue
      }
    }
  })
</script>
