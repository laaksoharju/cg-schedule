<template>
  <div class="wrapper">
    <div
      v-for="(patient, index) in patients" 
      :class="['seat', { over : mOver[index] }]" 
      :style="{left: patient.startTime * scale + 'px', width: totalTime(index) * scale + 'px'}" 
      @mousedown="mouseDown(index, patient.id, $event)"
      @mouseup="mouseUp"
      :key="index">
      <div v-if="namesShown" class="name">{{patient.name}}</div>
      <div 
        v-for="(action, block) in patient.pattern" 
        :style="{width: action.time*scale + 'px'}" 
        :class="['pattern', {on : action.on}, { edit: editIndex === index && editBlock === block}]"
        @dblclick="toggleEditMode(index, patient.id, block)"
        @click="stopEditMode" 
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
    mouseDown: function (index, pid, e) {
      e.preventDefault();
      this.mOver = new Array(this.patients.length).fill(false);
      this.mOver.splice(index,1, true);
      this.$emit('currentPatient', {
        pid: pid, 
        offsetX: e.clientX - e.target.parentElement.getBoundingClientRect().left + this.$store.state.leftOffset,
        offsetY: e.clientY - e.target.parentElement.getBoundingClientRect().top + this.$store.state.topOffset  });
    },
    mouseUp: function () {
      this.mOver = new Array(this.patients.length).fill(false);
    },
    totalTime: function(index) {
      let time = 0;
      for (let i = 0; i < this.patients[index].pattern.length; i += 1) {
        time += this.patients[index].pattern[i].time;
      }
      return time;
    },
    resetHover: function () {
      this.mOver = new Array(this.patients.length).fill(false);
    },
    toggleEditMode: function (index, pid, block) {
      if (this.editIndex < 0) {
        this.editIndex = index;
        this.editBlock = block;
        this.$emit('edit', { pid: pid, block: block });
      }
      else {
        this.stopEditMode();
      }
    },
    stopEditMode: function () {
      this.editIndex = -1;
      this.editBlock = -1;
      this.$emit('edit', { pid: -1, block: 0 }); 
    }
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
  height:20px;
  overflow: hidden;
  cursor: grab;
  background-color: rgba(255, 255, 255, 0.5);
}

.name {
  position: absolute;
  left:5px;
  z-index:-2;
}

.seat {
  border: 1px dotted #666;
  display: inline-block;
  margin: -1px;
  position: absolute;
  height:20px;
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
.edit {
  background-color: red;
  cursor:col-resize;
}

</style>
