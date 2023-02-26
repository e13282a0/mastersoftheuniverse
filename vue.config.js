const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],
  //devServer: {
  //  proxy: "http://localhost:3000"
  //},

  pluginOptions: {
    vuetify: {},
    express: {
      shouldServeApp: true,
      serverDir: './srv'
    },
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
})
