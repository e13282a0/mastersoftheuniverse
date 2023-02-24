<template>
  <v-form @submit.prevent>
    <v-card class="mx-auto" max-width="800">
      <v-card-item>
        <div>
          <div class="text-overline mb-1">
            Edit Variable
          </div>
        </div>
      </v-card-item>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field label="Name" v-model="edited.name" :rules="rules.name"/>
            </v-col>
            <v-col>
              <v-combobox label="Source" v-model="edited.source" :items="VARIABLE_SOURCES" :rules="rules.source"/>
            </v-col>
            <v-col>
              <v-text-field label="Variable" v-model="edited.variable" :rules="rules.variable"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Min" v-model="edited.min" :rules="rules.min"/>
            </v-col>
            <v-col>
              <v-text-field label="Max" v-model="edited.max" :rules="rules.max"/>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" variant="outlined" @click="save">
          Save
        </v-btn>
        <v-btn variant="outlined" @click="cancel">
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>

import {reactive} from "vue";
import {FUZZY_MEMBERSHIP_FUNCTION_TYPE, VARIABLE_SOURCES} from "../../constants";
import {useStore} from "vuex";

export default {
  name: "VariableEditor",
  props: {
    item: Object,
    new: Boolean
  },
  emits: [ 'close'],
  setup(props,{emit}) {
    // make working copy
    const edited = reactive(props.new ? {min:0, max:100, source:VARIABLE_SOURCES[0]} : structuredClone(props.item))
    const rules = {
      name: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 100) || 'Name must be less than 100 characters',
      ],
      variable: [
        v => !!v || 'Variable is required',
        v => (v && v.length <= 100) || 'Variable must be less than 100 characters',
      ],
      source: [
        v => !!v || 'Source is required'
      ],
      min: [
        v => /[0-9]+/.test(v) || 'Must be numeric',
      ],
      max: [
        v => /[0-9]+/.test(v) || 'Must be numeric',
      ]
    }
    const store = useStore()

    const save = function () {
      if (props.new)
        store.dispatch('add',{target:'variables',data:edited})
      else
        store.dispatch('update',{target:'variables',data:edited})

      emit('close')
    }
    const cancel = function () {
      emit('close')
    }

    return {
      edited,
      rules,
      save,
      cancel,
      VARIABLE_SOURCES,
      FUZZY_MEMBERSHIP_FUNCTION_TYPE
    }
  },
}
</script>

<style scoped>

</style>