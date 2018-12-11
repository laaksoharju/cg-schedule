<template>
  <div class="home">
    <div>
      <div class="label">
        Seats
      </div>
      <input class="seats" v-for="(seat, key) in seats" type="text" :value="seat" @input="changeSeat($event.target.value, key)" :key="key">
      <input ref="addSeatInput" class="seats new" type="text" @change="addSeat($event.target.value)">
      <hr>
    </div>
    <div v-for="(pattern, key) in patterns" :key="key">
      <div class="label">
        {{ key }}
      </div>
      <span class="value" v-for="(val, key) in pattern" :key="key">
        <input type="number" v-model="val.time">
        <input type="checkbox" v-model="val.on">
      </span>
      <span class="value">
        <input ref="newTimeInput" class="new" type="number" @change="newTime($event.target.value, key)">
      </span>
    </div>
    <div>
      <div class="label">
        <input ref="addPatternInput" class="seats new" type="text" @change="addPattern($event.target.value)">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  computed: {
    patterns: function () {
      return this.$store.state.patterns;
    },
    seats: function () {
      return this.$store.state.seats;
    }
  },
  methods: {
    changeSeat: function (val, key) {
      this.$store.commit('changeSeats', { val: val, key: key });
    },
    addSeat: function (val) {
      this.$store.commit('addSeat', val);
      this.$refs.addSeatInput.value = "";
    },
    newTime: function (val, key) {
      this.$store.commit('newTime', { val: val, key: key });
      for (let i = 0; i < this.$refs.newTimeInput.length; i += 1) {
        this.$refs.newTimeInput[i].value = "";
      }
    },
    addPattern: function (val) {
      this.$store.commit('addPattern', val);
      this.$refs.addPatternInput.value = "";
    }
  }
}
</script>
<style scoped>
.home {
  margin-left: 1em;
}
.value {
  border: 1px dotted #999;
  margin-right: 1em;
  display: inline-block;
}
.value input[type=number] {
  width:60px;
  margin: auto;
}
.label {
  display: inline-block;
  width:80px;
}
.seats {
  width:60px;
  display: inline-block;
}
.new {
  background-color: #ffd;
}
</style>