<template>
  <q-card class="my-card bg-white" style="max-width: 1000px">
    <q-card-section>
      <div class="text-h6">Edit Variable</div>
    </q-card-section>

    <!-- Main values -->
    <q-card-section>
      <div class="q-pa-md">
        <div class="row q-gutter-xs">
          <div class="col">
            <q-input v-model="edited.name" label="Name" dense/>
          </div>
          <div class="col">
            <q-select v-model="edited.source" :options="VARIABLE_SOURCES" label="Source" stack-label dense options-dense/>
          </div>
          <div class="col">
            <q-input v-model="edited.variable" label="Variable" dense/>
          </div>
          <div class="col">
            <q-input v-model="edited.min" label="Min" dense/>
          </div>
          <div class="col">
            <q-input v-model="edited.max" label="Max" dense/>
          </div>
        </div>
      </div>
    </q-card-section>

    <!-- graphical display -->
    <q-card-section>
      <membership-function-graphic  :key="state.updateKey" v-model="edited.functions" @update:model-value="state.updateKey++"/>
    </q-card-section>

    <!-- membership functions -->
    <q-card-section>
      <q-markup-table flat dense square>
        <thead>
        <tr>
          <th class="text-left">name</th>
          <th class="text-left">type</th>
          <th class="text-left">values</th>
          <th style="width: 210px">form</th>
          <th style="width: 50px"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item,index) in edited.functions" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.values }}</td>
          <td><membership-function-reduced-graphic :value="item" /></td>
          <td>
            <q-btn flat round size="10px">
              <q-icon @click="editMembershipFunction(index)" name="mdi-pencil"/>
            </q-btn>
            <q-btn flat round size="10px">
              <q-icon @click="deleteMembershipFunction(index)" name="mdi-delete"/>
            </q-btn>
          </td>
        </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
    <q-card-actions>
      <q-space />
      <q-btn @click="newMembershipFunction" flat><q-icon name="mdi-plus" />New</q-btn>
    </q-card-actions>
    <q-separator dark/>
    <q-card-actions>
      <q-space/>
      <q-btn flat label="Save" type="submit" color="primary" @click="save"/>
      <q-btn flat label="Cancel" type="reset" color="primary" @click="cancel" class="q-ml-sm"/>
    </q-card-actions>
  </q-card>

  <q-dialog v-model="state.msfDialog" width="800" persistent>
    <membership-function-editor v-model="state.activeMembershipFunction" @update:model-value="state.updateKey++" @save="saveMembershipFunction" @close="state.msfDialog=false"/>
  </q-dialog>

</template>

<script>

import {reactive} from "vue";
import MembershipFunctionGraphic from "@/components/MembershipFunctionGraphic.vue";
import {useStore} from "vuex";
import MembershipFunctionEditor from "@/components/MembershipFunctionEditor.vue";
import MembershipFunctionReducedGraphic from "@/components/MembershipFunctionReducedGraphic.vue";
import {FUZZY_MEMBERSHIP_FUNCTION_STEP, FUZZY_MEMBERSHIP_FUNCTIONS, VARIABLE_SOURCES} from "@/mixins/constants";

export default {
  name: "VariableEditor",
  components: {MembershipFunctionReducedGraphic, MembershipFunctionEditor, MembershipFunctionGraphic},
  props: {
    item: Object,
    new: Boolean
  },
  emits: ['close'],
  setup: function (props, {emit}) {
    const store = useStore()

    const state = reactive({
      msfDialog: false,
      activeMembershipFunction: {},
      activeMembershipFunctionIndex:-1,
      updateKey:0
    })

    // make working copy
    const edited = reactive(props.new ? {min: 0, max: 100, source: VARIABLE_SOURCES[0], functions: []} : structuredClone(props.item))

    const save = function () {
      if (props.new)
        store.dispatch('add', {target: 'variables', data: edited})
      else
        store.dispatch('update', {target: 'variables', data: edited})

      emit('close')
    }

    const cancel = function () {
      emit('close')
    }

    const newMembershipFunction = function () {
      //create empty default element
      let draft = {name:'new', type:'', parameters:{}}
      Object.keys(FUZZY_MEMBERSHIP_FUNCTIONS).forEach(function(type){
        FUZZY_MEMBERSHIP_FUNCTIONS[type].forEach(function(param){
          draft.parameters[param]=''
        })
      })
      state.activeMembershipFunction = draft
      state.activeMembershipFunctionIndex = -1
      state.msfDialog = true
    }

    const deleteMembershipFunction = function (index) {
      if (index > -1) {
        edited.functions.splice(index, 1);
      }
      state.updateKey++
    }

    const editMembershipFunction = function (index) {
      state.activeMembershipFunctionIndex=index
      state.activeMembershipFunction = edited.functions[index]
      state.msfDialog = true
    }

    const saveMembershipFunction = function (item) {
      //complete values from variable
      item.parameters.minValue=edited.min
      item.parameters.maxValue=edited.max
      item.parameters.step=FUZZY_MEMBERSHIP_FUNCTION_STEP

      if(state.activeMembershipFunctionIndex>-1)
        edited.functions[state.activeMembershipFunctionIndex]=item
      else
        edited.functions.push(item)
      state.msfDialog = false
      state.updateKey++
    }

    return {
      state,
      edited,
      save,
      cancel,
      newMembershipFunction,
      deleteMembershipFunction,
      editMembershipFunction,
      saveMembershipFunction,
      VARIABLE_SOURCES,
    }
  },
}
</script>

<style scoped>

</style>