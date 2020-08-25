import Vue from 'vue'
import Vuex from 'vuex'
import chips from './modules/chips.store.js'
import session from './modules/session.store.js'
import battle from './modules/battle.store.js'
import { SceneNames } from '../common/constants'; 

//import moment from 'moment'

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
  },
  mutations: {
    // updateTime(state) {
    //   state.timeNow = new moment().format("hh:mm");
    // }, 
    initializeSession(state) {
      // Check if the ID exists
      if(localStorage.getItem('sessionStore')) {
        //Assign session saved in local storage
        var sessionState = Object.assign(state.session, JSON.parse(localStorage.getItem('sessionStore')));
        if(sessionState.isInBattle) {
          sessionState.isInBattle = false;
          sessionState.currentScene = SceneNames.StandBy;
        } 
        
        state.session = sessionState
      }
    },     
  },
  actions: {
    // updateTime ({commit}) {
    //   commit('updateTime')
    // }
  },
  modules: {
    chips,
    session,
    battle
  }
})

// Subscribe to store updates
store.subscribe((mutation, state) => {
  if(state.session) {
    // Store the state object as a JSON string
    localStorage.setItem('sessionStore', JSON.stringify(state.session));
  }
});

export default store;