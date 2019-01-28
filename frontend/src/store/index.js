import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    apiUrl: "http://localhost:8000",
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
        ...state.resourceData,
        [payload.resourceName]: payload.resourceData
      };
    }
  },
  actions: {
    setActiveResource({ commit }, resourceName) {
      commit("setActiveResource", resourceName);
    },
    saveResourceData({ state }, data) {
      let method = data.id ? "put" : "post";
      let param = data.id ? "/" + data.id +"/" : "";
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
      return axios.get(state.apiUrl + "/" + resourceName +"/").then(
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
