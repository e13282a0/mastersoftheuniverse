<template>
  <q-card class="my-card bg-white" style="max-width: 1000px">
    <q-card-section>
      <div class="text-h6">Edit Membership Function</div>
    </q-card-section>

    <!-- Main values -->
    <q-card-section>
      <div class="q-pa-md">
        <div class="row q-gutter-xs">
          <div class="col">
            <q-input v-model="edited.name" label="Name" dense/>
          </div>
          <div class="col">
            <q-select v-model="edited.type" :options="Object.keys(FUZZY_MEMBERSHIP_FUNCTIONS)" label="Type" stack-label dense options-dense @update:model-value="state.updateKey++"/>
          </div>
        </div>
        <div class="row q-gutter-xs">
          <div class="col">
            <membership-function-graphic :key="state.updateKey" v-model="edited" />
          </div>
        </div>

        <div class="row q-gutter-xs" :key="edited.type">
          <div :key="param" v-for="param in FUZZY_MEMBERSHIP_FUNCTIONS[edited.type]" class="col">
            <q-input v-model="edited.parameters[param]" :label="param" dense/>
            <!--{{param}}-->
          </div>

        </div>

      </div>
    </q-card-section>


    <q-separator dark/>
    <q-card-actions>
      <q-space/>
      <q-btn flat label="Save" type="submit" color="primary" @click="save"/>
      <q-btn flat label="Cancel" type="reset" color="primary" @click="cancel" class="q-ml-sm"/>
    </q-card-actions>
  </q-card>
</template>

<script>
import {reactive} from "vue";
import MembershipFunctionGraphic from "@/components/MembershipFunctionGraphic.vue";
import {FUZZY_MEMBERSHIP_FUNCTIONS, VARIABLE_SOURCES} from "@/mixins/constants";

export default {
  name: "MembershipFunctionEditor",
  computed: {
    FUZZY_MEMBERSHIP_FUNCTIONS() {
      return FUZZY_MEMBERSHIP_FUNCTIONS
    }
  },
  components: {MembershipFunctionGraphic},
  props: {
    modelValue: Object,
    min:Number,
    max:Number
  },
  emits: ['update:modelValue','close','save'],
  setup(props, {emit}) {
    // make working copy
    const edited = reactive(structuredClone(props.modelValue))
    const state = reactive({
      updateKey:0
    })

    const save = function () {
      emit('update:modelValue',edited)
      emit('save',edited)
    }
    const cancel = function () {
      emit('close')
    }

    return {
      edited,
      save,
      cancel,
      state,
      VARIABLE_SOURCES,
    }
  },
}
</script>

<style scoped>

</style>