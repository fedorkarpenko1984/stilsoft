import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    itemsList: null,
    handledItemsList: null,
    error: null,
    isLoaded: false,

    itemIdForShowFullInfo: null,
    idForDelete: null,
    showEditPopupFlag: false,
    idForEdit: null,

    nameSearchString: '',
    searchByFirstnameOrLastname: null, // 'firstName/lastName'
    onlyWithDriverLicense: false,
    footSizeFrom: null,
    footSizeTo: null,
    genderFilter: null, // 'male', 'female' или null
    day: null,
    month: null,
    year: null
  },

  getters: {

    getItemIdForShowFullInfo(state) {
      return state.itemIdForShowFullInfo
    },

    getItemById(state) {
      if (state.itemsList) {
        return state.itemsList.find(item => item.id == state.itemIdForShowFullInfo)
      }
    },
    getItemByIdForEdit(state) {
      if (state.itemsList) {
        return state.itemsList.find(item => item.id == state.idForEdit)
      }
    }
  },

  mutations: {
    itemsListHandler(state) {
      state.handledItemsList = state.itemsList

      // фильтр по имени/фамилии
      if (state.nameSearchString && state.searchByFirstnameOrLastname) {
        state.handledItemsList = state.handledItemsList.filter(item => {
          const param = state.searchByFirstnameOrLastname
          const searchStr = state.nameSearchString
          if (item[param].toLowerCase().indexOf(searchStr) === 0) {
            return item
          }
        })
      }

      // водительские права 
      if (state.onlyWithDriverLicense) {
        state.handledItemsList = state.handledItemsList.filter(item => item.driverLicense)
      }

      // размер ноги
      if (!state.footSizeFrom) state.footSizeFrom = 0
      if (!state.footSizeTo) state.footSizeTo = 0
      if (state.footSizeFrom && !state.footSizeTo) {
        state.handledItemsList = state.handledItemsList.filter(item => {
          if (item.footSize > state.footSizeFrom) return item
        })
      }
      if (state.footSizeTo) {
        state.handledItemsList = state.handledItemsList.filter(item => {
          if (item.footSize > state.footSizeFrom && item.footSize < state.footSizeTo) return item
        })
      }

      // пол
      if (state.genderFilter?.male && !state.genderFilter?.female) {
        state.handledItemsList = state.handledItemsList.filter(item => item.gender === 'male')
      }
      if (!state.genderFilter?.male && state.genderFilter?.female) {
        state.handledItemsList = state.handledItemsList.filter(item => item.gender === 'female')
      }
      
      // по дате
      if (state.day) {
        state.handledItemsList = state.handledItemsList.filter(item => {
          const day = parseInt(item.birthday.slice(0,2))
          if (state.day === day) return item
        })
      }

      if (state.month) {
        state.handledItemsList = state.handledItemsList.filter(item => {
          const month = parseInt(item.birthday.slice(2,4))
          if (state.month === month.toString()) return item
        })
      }

      if (state.year) {
        state.handledItemsList = state.handledItemsList.filter(item => {
          const year = parseInt(item.birthday.slice(4))
          if (state.year === year) return item
        })
      }
    },

    setItemsList(state, payload) {
      state.itemsList = payload
    },

    setIsLoaded(state) {
      state.isLoaded = true
    },


    changeStateValue(state, payload) {
      state[payload.field] = payload.value
    },

    setIdForDelete(state, payload) {
      state.idForDelete = payload
    },

    setIdForEdit(state, payload) {
      state.idForEdit = payload
    },

    setShowEditPopupFlag(state, payload) {
      state.showEditPopupFlag = payload
    },

    deleteItemFromList(state) {
      state.itemsList = state.itemsList.filter(item => item.id !== state.idForDelete.toString())
    },

    createNewItemInList(state, payload) {
      state.itemsList.push(payload)
    },

    saveNewDataOfEditedItem(state, payload) {
      const index = state.itemsList.findIndex(item => item.id === payload.id)
      state.itemsList.splice(index, 1, payload)
    }
  },

  actions: {
    async getItemsList(context) {
      try {
        const response = await fetch('https://638b225581df38ab34623c87.mockapi.io/api/users')
        if (response.ok) {
          const decoded = await response.json()
          context.commit('setItemsList', decoded)
          context.commit('setIsLoaded')
          return decoded
        } else {
          console.error('Ошибка получения данных с сервера')
        }
      } catch (e) {
        console.error('Ошибка ', e)
      }
    }
  },

  modules: {
  }
})
