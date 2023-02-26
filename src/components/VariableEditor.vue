<template>
  <v-form @submit. >
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
        <v-container dense>
          <v-row dense>
            <v-col cols="4">
              <v-text-field label="Name" v-model="edited.name" :rules="rules.name"/>
            </v-col>
            <v-col cols="4">
              <v-combobox label="Source" v-model="edited.source" :items="VARIABLE_SOURCES" :rules="rules.source"/>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Variable" v-model="edited.variable" :rules="rules.variable"/>
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="4">
              <v-text-field label="Min" v-model="edited.min" :rules="rules.min"/>
            </v-col>
            <v-col cols="4">
              <v-text-field label="Max" v-model="edited.max" :rules="rules.max"/>
            </v-col>
          </v-row>
        </v-container>
        <!-- graphical display -->
        <membership-function-graphic v-model="edited.functions"></membership-function-graphic>
        <!-- edit membership function -->
        <v-table fixed-header  density="compact">
          <template v-slot:bottom>
            <v-toolbar density="compact">
              <v-spacer />
              <v-btn @click="newMembershipFunction">
                <v-icon>mdi-plus-box</v-icon>
                New
              </v-btn>
            </v-toolbar>
          </template>
          <thead>
          <tr>
            <th class="text-left">name</th>
            <th class="text-left">type</th>
            <th class="text-left">values</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in edited.functions" :key="item.name">
            <td @click="alert('test')">{{item.name}}</td>
            <td>{{item.type}}</td>
            <td></td>
            <td>
              <v-icon small @click="deleteMembershipFunction(index)">mdi-delete</v-icon>
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
import MembershipFunctionGraphic from "@/components/MembershipFunctionGraphic.vue";

export default {
  name: "VariableEditor",
  components: {MembershipFunctionGraphic},
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

    const newMembershipFunction = function() {
      edited.functions.push({})
    }
    const deleteMembershipFunction = function(index) {
      if (index > -1) {
        edited.functions.splice(index, 1);
      }
    }

    return {
      edited,
      rules,
      save,
      cancel,
      newMembershipFunction,
      deleteMembershipFunction,
      VARIABLE_SOURCES,
      FUZZY_MEMBERSHIP_FUNCTION_TYPE
    }
  },
}
</script>

<style scoped>

</style>