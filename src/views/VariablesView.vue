<template>
  <v-toolbar dark  density="compact">
    <v-toolbar-title>Variables</v-toolbar-title>
    <v-spacer />
    <v-text-field hide-details prepend-icon="mdi-magnify" single-line />
    <v-btn icon>
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-toolbar>
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
        <th class="text-left">name</th>
        <th class="text-left">source</th>
        <th class="text-left">variable</th>
        <th class="text-left">min</th>
        <th class="text-left">max</th>
        <th class="text-left">membership functions</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    <tr v-for="item in variables" :key="item.name">
      <td>{{ item.name }}</td>
      <td>{{ item.source }}</td>
      <td>{{ item.variable  }}</td>
      <td>{{ item.min }}</td>
      <td>{{ item.max }}</td>
      <td></td>
      <td>
        <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </td>
    </tr>
    </tbody>
  </v-table>
  <!-- Edit Dialog -->
  <v-dialog v-model="state.dialog" width="800" persistent>
    <variable-editor :item="state.editItem" :new="state.newItem" @close="state.dialog=false"/>
  </v-dialog>
</template>

<script>
import {useStore} from "vuex";
import {computed, reactive} from "vue";
import VariableEditor from "@/components/VariableEditor.vue";

export default {
  name: "VariablesView",
  components: {VariableEditor},
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

    // eslint-disable-next-line
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