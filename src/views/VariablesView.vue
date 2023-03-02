<template>
  <q-card flat>
    <q-card-section>
             <div class="text-h6">Variables</div>
     </q-card-section>

    <q-card-section>
      <q-markup-table flat dense square>
        <thead>
        <tr>
          <th class="text-left">name</th>
          <th class="text-left">source</th>
          <th class="text-left">variable</th>
          <th class="text-left">min</th>
          <th class="text-left">max</th>
          <th  style="width: 210px">membership functions</th>
          <th style="width: 20px"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in variables" :key="item.name">
          <td>{{ item.name }}</td>
          <td>{{ item.source }}</td>
          <td>{{ item.variable  }}</td>
          <td>{{ item.min }}</td>
          <td>{{ item.max }}</td>
          <td><membership-function-reduced-graphic :value="item.functions" /></td>
          <td>
            <q-btn flat round size="10px">
              <q-icon @click="editItem(item)" name="mdi-pencil"/>
            </q-btn>
            <q-btn flat round size="10px">
              <q-icon @click="deleteItem(item)" name="mdi-delete"/>
            </q-btn>
          </td>
        </tr>
        </tbody>
      </q-markup-table>

    </q-card-section>

    <q-card-actions>
      <q-space />
      <q-btn @click="newItem" flat><q-icon name="mdi-plus" />New</q-btn>
    </q-card-actions>
  </q-card>

  <!-- Edit Dialog -->
  <q-dialog v-model="state.dialog" width="800" persistent>
    <variable-editor :item="state.editItem" :new="state.newItem" @close="state.dialog=false"/>
  </q-dialog>
</template>

<script>
import {useStore} from "vuex";
import {computed, reactive} from "vue";
import VariableEditor from "@/components/VariableEditor.vue";
import MembershipFunctionReducedGraphic from "@/components/MembershipFunctionReducedGraphic.vue";

export default {
  name: "VariablesView",
  components: {MembershipFunctionReducedGraphic, VariableEditor},
  setup() {
    const store = useStore()
    const state=reactive({
      dialog:false,
      editItem:{},
      newItem:false
    })

    const editItem=function(item){
      state.editItem=item
      state.newItem=false
      state.dialog=true
    }

    const newItem=function() {
      state.editItem={}
      state.newItem=true
      state.dialog=true
    }

    const deleteItem=function(item){
      store.dispatch("delete", {target:"variables", id:item._id})
    }

    return {
      state,
      editItem,
      newItem,
      deleteItem,
      // access a state in computed function
      variables: computed(() => store.state.variables),

      // access a getter in computed function
      //double: computed(() => store.getters.double)

      // access a mutation
      //increment: () => store.commit('increment'),

      // access an action
      //testAction: () => store.dispatch('test')
    }
  },
}
</script>

<style scoped>

</style>