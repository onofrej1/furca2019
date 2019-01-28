import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import CrudModels from "./../CrudModels";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  state: {
    apiUrl: "http://localhost/web/laravel/public",
    activeResource: "page",
    resourceData: {}
  },
  getters: {
    getActiveResourceData: state => state.resourceData[state.activeResource]
  },
  mutations: {
    setActiveResource(state, payload) {
      state.activeResource = payload;
    },
    setResourceData(state, payload) {
      //state.resourceData[payload.resourceName] = payload.resourceData;
      state.resourceData = {
        //...state.resourceData,
        //[payload.resourceName]: payload.resourceData
      };
    }
  },
  actions: {
    setActiveResource({ commit }, resourceName) {
      commit("setActiveResource", resourceName);
    },
    saveResourceData({ commit, state }, data) {
      let method = data.id ? "put" : "post";
      let param = data.id ? "/" + data.id : "";
      axios[method](
        state.apiUrl + "/" + state.activeResource + param,
        data
      ).then(
        response => {
          console.log("data", response.data);
        },
        error => {
          console.log(error);
        }
      );
    },
    fetchResourceData({ commit, state }, resourceName) {
      return axios.get(state.apiUrl + "/" + resourceName).then(
        response => {
          commit("setResourceData", {
            resourceName,
            resourceData: response.data
          });
          return response;
        },
        error => {
          console.log(error);
        }
      );
    }
  }
});
