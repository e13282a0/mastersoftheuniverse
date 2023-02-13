<template>
  Hallo!
  <v-text-field v-model="test"></v-text-field>
  <v-btn @click="testAction">Probier mal</v-btn>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
export default {
  name: "TheTest",
  setup() {
    const store = useStore()

    return {
      // access a state in computed function
      test: computed(() => store.state.test),

      // access a getter in computed function
      //double: computed(() => store.getters.double)

      // access a mutation
      //increment: () => store.commit('increment'),

      // access an action
      testAction: () => store.dispatch('test')
    }
  },
}
</script>

<style scoped>

</style>