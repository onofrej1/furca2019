
// initial state
const state = {
  data: [],
  name: 'vue',
}

// getters
const getters = {}

// actions
/*const actions = {
  fetchData({ commit }) {  
      commit('setData', [{'aaa': 'bbb'}, {'ccc': 'dddd'}]);  
  }
}*/

// mutations
const mutations = {
  setData (state, data) {
    state.data = data
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  state,
  getters,
  //actions,
  mutations
}
