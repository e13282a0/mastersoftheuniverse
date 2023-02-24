import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        loading:-1,
        variables:[]
    },
    getters: {},
    mutations: {
        loading:function(state) {
          state.loading++
        },
        loaded:function(state) {
            state.loading--
        },
        index:function(state,payload) {
          state[payload.target]=payload.data
        },
        update:function(state,payload) {
            let index = state[payload.target].findIndex((elm) => elm._id === payload.data._id);
            if (index > -1) {
                state[payload.target][index] = payload.data;
            }
        },
        add:function(state,payload) {
            state[payload.target].push(payload.data)
        },
        delete:function(state,payload) {
            let index = state[payload.target].findIndex((elm) => elm._id === payload.id);
            if (index > -1) {
                state[payload.target].splice(index, 1);
            }
        },
    },
    actions: {
        index(context,payload) {
            context.commit("loading")
            return axios.get(`/api/${payload.target}`).then((response) => {
                console.debug(response)
                context.commit('index', {target:payload.target,data:response.data})
                context.commit("loaded")
            })
        },
        add(context,payload){
            context.commit("loading")
            return axios.post(`/api/${payload.target}`,payload.data).then((response) => {
                console.debug(response)
                context.commit('add',{target:payload.target, data:response.data})
                context.commit("loaded")
            })
        },
        update(context,payload){
            context.commit("loading")
            return axios.put(`/api/${payload.target}/${payload.data._id}`,payload.data).then((response) => {
                console.debug(response)
                context.commit('update',{target:payload.target, data:response.data})
                context.commit("loaded")
            })
        },
        delete (context,payload){
            context.commit("loading")
            return axios.delete(`/api/${payload.target}/${payload.id}`).then((response) => {
                console.debug(response)
                context.commit('delete', {target:payload.target,id:response.data})
                context.commit("loaded")
            })
        },

    },
    modules: {}
})
