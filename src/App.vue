<template>
  <v-app>
    <!-- progressbar -->
    <v-progress-linear v-if="loading" indeterminate color="cyan" />
    <v-navigation-drawer app expand-on-hover rail permanent>
      <v-list>
        <v-list-item-media>
          <v-img :src="require('./assets/Masters_of_the_Universe_Logo_Classic.jpg')"/>
        </v-list-item-media>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-folder" title="My Files" to="/" link></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" to="/about" link></v-list-item>
        <v-list-item prepend-icon="mdi-variable" title="Variables" to="/variables" link></v-list-item>
        <v-list-item prepend-icon="mdi-calculator-variant-outline" title="Rule Sets" link></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>



</template>
<script>
//import { connect } from "precompiled-mqtt"
import {useStore} from "vuex";
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

    return {
      //"MQTTClient":client,
      loading:store.state.loading
    }
  },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
