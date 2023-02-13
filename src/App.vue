<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <!-- progressbar -->
  <v-progress-linear v-if="loading" indeterminate color="cyan" />
  <!-- router view -->
  <router-view/>

</template>
<script>
import { connect } from "precompiled-mqtt"
export default {
  setup() {
    const client  = connect('mqtt://localhost:8083')
    // eslint-disable-next-line no-debugger
    //debugger
    client.on('connect', function () {
      client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('presence', 'Hello mqtt')
        }
      })
    })

    client.on('message', function (topic, message) {
      // message is Buffer
      console.log(message.toString())
      client.end()
    })
    return {
      "MQTTClient":client
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
