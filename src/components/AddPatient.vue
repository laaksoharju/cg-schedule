<template>
  <div class="wrapper">
    <h1>ADD PATIENT</h1>
    <div class="indata">
      <label for="name">
        Name:
      </label>
      <input id="name" type="text" v-model="name">
    </div>
    <div class="indata">
      <label for="treatment">
        Treatment
      </label>
      <select id="treatment" v-model="patternName">
        <option v-for="key in treatments" :key="key">{{ key }}</option>
      </select>
    </div>
    <div class="indata">
      <label for="seat-number">
        Seat
      </label>
      <input id="seatnumber" type="number" v-model="seat">
    </div>
    <div class="indata">
      <label for="start-time">
        Starting
      </label>
      <input id="start-time" type="number" v-model="startTime">
    </div>
    <button @click="addPatient">ADD PATIENT</button>
  </div>
</template>

<script>
export default {
  name: 'ScheduleRow',
  props: {
    patients: Array
  },
  data: function () {
    return {
      name: "",
      patternName: "",
      seat: 0,
      startTime: 0,
    }
  },
  computed: {
    treatments: function () {
      return Object.keys(this.$store.state.patterns).sort();
    }
  },
  methods: {
    addPatient() {
      this.$store.commit('addPatient', {name: this.name, seat: parseInt(this.seat), startTime: parseInt(this.startTime), patternName: this.patternName})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  width:400px;
  margin: auto;
  position: relative;
}
h1 {
  font-size: medium;
}
#name {
  width: 400px;
}
.indata {
  display: inline-block;
}
</style>
