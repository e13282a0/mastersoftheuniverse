import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        loading:-1,
        membershipFunctions:[]
    },
    getters: {},
    mutations: {
        loading:function(state) {
          state.loading++
        },
        loaded:function(state) {
            state.loading--
        },
        index:function(state,target,data) {
          state[target]=data
        },
        update:function(state,target,data) {
            let index = state[target].findIndex((elm) => elm.id === data.id);
            if (index > -1) {
                state[target][index] = data;
            }
        },
        add:function(state,target,data) {
            state[target].push(data)
        },
        delete:function(state,target,id) {
            let index = state[target].findIndex((elm) => elm.id === id);
            if (index > -1) {
                state[target].splice(index, 1);
            }
        },
    },
    actions: {
        index(context,target) {
            context.commit("loading")
            return axios.get(`/api/${target}`).then((response) => {
                console.debug(response)
                context.commit('index', response.data)
                context.commit("loaded")
            })
        },
        add(context,target,data){
            context.commit("loading")
            return axios.post(`/api/${target}`,data).then((response) => {
                console.debug(response)
                context.commit('add', response.data)
                context.commit("loaded")
            })
        },
        update(context,target,data){
            context.commit("loading")
            return axios.put(`/api/${target}/${data.id}`,data).then((response) => {
                console.debug(response)
                context.commit('update', response.data)
                context.commit("loaded")
            })
        },
        delete (context,target,data){
            context.commit("loading")
            return axios.post(`/api/${target}/${data.id}`).then((response) => {
                console.debug(response)
                context.commit('delete', response.data)
                context.commit("loaded")
            })
        },

    },
    modules: {}
})
