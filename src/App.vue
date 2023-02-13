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

    const onSubscribe=function(error, granted) {
      if (error) {
        console.log(`mqtt subscription failed: ${error}`)
      } else {
        console.log(`mqtt subscription successful:${granted[0].topic}`)
      }
    }
    client.on('connect', function () {
      client.subscribe('presence', onSubscribe)
      client.publish('presence','i bims')
    })

    client.subscribe('test', { qos: 0 }, onSubscribe)


    client.on('message', function (topic, message) {
      // message is Buffer
      // eslint-disable-next-line no-debugger
      //debugger
      console.log('mqtt received: '+message.toString())
      //client.end()
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
