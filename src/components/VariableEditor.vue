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
        <!-- Main values -->
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
        <!-- graphical display -->
        <membership-function-editor v-model="edited.functions"></membership-function-editor>
        <!-- edit membership function -->
        <v-table fixed-header  density="compact">
          <template v-slot:bottom>
            <v-toolbar density="compact">
              <v-spacer />
              <v-btn @click="newItem">
                <v-icon>mdi-plus-box</v-icon>
                New
              </v-btn>
            </v-toolbar>
          </template>
          <thead>
          <tr>
            <th class="text-left">type</th>
            <th class="text-left">values</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in edited.functions" :key="item.name">
            <td>{{ item.type }}</td>
            <td></td>
            <td>
              <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
            </td>
          </tr>
          </tbody>
        </v-table>
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
import MembershipFunctionEditor from "@/components/MembershipFunctionEditor.vue";

export default {
  name: "VariableEditor",
  components: {MembershipFunctionEditor},
  props: {
    item: Object,
    new: Boolean
  },
  emits: [ 'close'],
  setup(props,{emit}) {
    // make working copy
    const edited = reactive(props.new ? {min:0, max:100, source:VARIABLE_SOURCES[0],functions:[]} : structuredClone(props.item))
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