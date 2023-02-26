<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-grey-6">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            @click="toggleLeftDrawer"
            aria-label="Menu"
            icon="menu"
        />

        <q-toolbar-title>
          Masters of the Universe
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-linear-progress v-if="loading" indeterminate color="secondary" class="q-mt-sm" />
    <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        class="bg-grey-8"
    >
      <q-img :src="require('./assets/Masters_of_the_Universe_Logo_Classic.jpg')"/>

      <q-separator />
      <q-list dark>
        <q-item clickable to="/variables">
          <q-item-section avatar>
            <q-icon name="mdi-variable" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Variables</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable to="/about">
          <q-item-section avatar>
            <q-icon name="functions" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Rule Sets</q-item-label>
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>


</template>
<script>
//import { connect } from "precompiled-mqtt"
import {useStore} from "vuex";
import {ref} from "vue";
export default {
  setup() {
    // const client  = connect('mqtt://localhost:8083')
    // const onSubscribe=function(error, granted) {
    //   if (error) {
    //     console.log(`mqtt subscription failed: ${error}`)
    //   } else {
    //     console.log(`mqtt subscription successful:${granted[0].topic}`)
    //   }
    // }
    // client.on('connect', function () {
    //   client.subscribe('presence', onSubscribe)
    //   client.publish('presence','i bims')
    // })
    // client.subscribe('test', { qos: 0 }, onSubscribe)
    // client.on('message', function (topic, message) {
    //   console.log('mqtt received: '+message.toString())
    // })
    const store = useStore()
    store.dispatch("index",{target:"variables"})

    const leftDrawerOpen = ref(false)

    return {
      //"MQTTClient":client,
      loading:store.state.loading,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  },
}
</script>
<style>


nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

</style>
