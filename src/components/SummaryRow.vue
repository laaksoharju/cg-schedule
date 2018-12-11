<template>
  <div class="wrapper">
    <div
      v-for="(patient, index) in patients" 
      :class="['seat', { over : mOver[index] }]" 
      :style="{left: patient.startTime * scale + 'px', width: totalTime(index) * scale + 'px'}" 
      :key="index">
      <div v-if="namesShown" class="name">{{patient.name}}</div>
      <div 
        v-for="(action, block) in patient.pattern" 
        :style="{width: action.time*scale + 'px'}" 
        :class="['pattern', {on : action.on}]"
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScheduleRow',
  props: {
    patients: Array,
    changedSeat: Boolean,
    showNames: Boolean
  },
  data: function () {
    return {
      mOver: new Array(this.patients.length).fill(false),
      currentIndex: -1,
      editIndex: -1,
      editBlock: -1
    }
  },
  computed: {
    scale: function () { return 1 / this.$store.state.scale; },
    namesShown: function () { return false || this.showNames } 
  },
  watch: {
    changedSeat: function(_, __) {
      if (this.changedSeat) {
        this.resetHover();
        this.$emit('confirmSeatChange');
      }
    }
  },
  methods: {
    totalTime: function(index) {
      let time = 0;
      for (let i = 0; i < this.patients[index].pattern.length; i += 1) {
        time += this.patients[index].pattern[i].time;
      }
      return time;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: inline-block;
  position: relative;
  top:-16px;
}
.pattern {
  display: inline-block;
  height:40px;
  overflow: hidden;
}

.seat {
  border: 0;
  display: inline-block;
  margin: -1px;
  position: absolute;
  height:40px;
}

.seat:hover {
  background-color: rgba(255,255,0,0.5);
}

.on {
  background-color: rgba(200,0,100,0.5);
}

.over {
  background-color: rgba(255,255,0,0.5);
  z-index:100;
}

</style>
