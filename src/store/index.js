import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        loading:false,
      test: "Oje",
    },
    getters: {},
    mutations: {
        loading:function(state) {
          state.loading=true
        },
        loaded:function(state) {
            state.loading=false
        },
      test:function(state, data) {
        state.test=data
      }
    },
    actions: {
        test: function (context) {
            context.commit("loading")
            return axios.get("/api").then((response) => {
                context.commit('test', response.data.msg)
                context.commit("loaded")
            })
        }
    },
    modules: {}
})
