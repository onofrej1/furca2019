
// initial state
const state = {
  all: []
}

// getters
const getters = {}

// actions
const actions = {
  fetchData({ commit }) {
    
      commit('setData', [{'aaa': 'bbb'}, {'ccc': 'dddd'}]);
    
  }
}

// mutations
const mutations = {
  setData (state, data) {
    state.all = data
  },

  decrementProductInventory (state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
