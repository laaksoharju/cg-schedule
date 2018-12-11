import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scale: 0.5,
    leftOffset: 40,
    topOffset: 70,
    seats: [0, 1, 2, 3, 4],
    patients: [
    {
      id: 1,
      name: "Jenny", 
      seat: 0,
      startTime: 0,
      patternName: "R-CHOP",
      pattern: [{time: 15, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 15, on: true}]
    }, 
    {
      id: 2,
      name: "Lolly", 
      seat: 1,
      startTime: 15,
      patternName: "CHOP",
      pattern: [{time: 10, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 15, on: true}]
    }, 
    {
      id: 3,
      name: "Bror", 
      seat: 0,
      startTime: 180,
      patternName: "CHOP",
      pattern: [{time: 10, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 15, on: true}]
    },
    {
      id: 4,
      name: "Thomas", 
      seat: 2,
      startTime: 20,
      patternName: "BRAB",
      pattern: [{time: 20, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 15, on: true}]
    }
    ],
    patterns: {
      "R-CHOP": [{time: 15, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 15, on: true}],
      "CHOP": [{time: 10, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 15, on: true}],
      "BRAB": [{time: 20, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 5, on: true}, {time: 30, on: false}, {time: 15, on: true}]
    },
  },
  mutations: {
    addPatient: function (store, payload) {
      let maxId = 0;
      for (let i = 0; i < store.patients.length; i += 1) {
        if (store.patients[i].id > maxId) {
          maxId = store.patients[i].id;
        }
      }
      payload.id = maxId + 1;
      payload.pattern = JSON.parse(JSON.stringify(store.patterns[payload.patternName]));
      store.patients.push(payload);
    },
    addSeat: function (store, key) {
      store.seats.push(key);
    },
    addPattern: function (store, key) {
      Vue.set(store.patterns, key, []);
    },
    removePattern: function(store, key) {
      delete store.patterns[key]; 
    },
    setTime: function(store, payload) {
      for (let i = 0; i < store.patients.length; i += 1) {
        if (store.patients[i].id === payload.currentPatient) {
          if (payload.block === 0)
            store.patients[i].startTime = payload.time;
          else
            store.patients[i].pattern[payload.block].time = payload.time;
        }
      }
    },
    setSeat: function (store, payload) {
      for (let i = 0; i < store.patients.length; i += 1) {
        if (store.patients[i].id === payload.currentPatient) {
          store.patients[i].seat = payload.seat;
        }
      }     
    },
    changeSeats: function (store, payload) {
      store.seats.splice(payload.key, 1, payload.val);
    },
    newTime: function (store, payload) {
      store.patterns[payload.key].push({time: payload.val, on: false});
    },
  },
  actions: {

  }
})
