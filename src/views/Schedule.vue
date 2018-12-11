<template>
  <div class="home" @mousemove="mouseMove($event)" @mouseup="mouseUp">
    <TimeLine class="background"/>
    <div v-for="seat in seats" class="seat-row">
      <div class="seat-no">
        {{ seat }} 
      </div>
      <ScheduleRow 
        :patients="seatPatients(seat)"
        @newStartTime="newStartTime($event)"
        :showNames="true"
        @currentPatient="setCurrentPatient($event)"
        :changedSeat="changedSeat"
        @confirmSeatChange="confirmSeatChange"
        @edit="editPattern($event)"/>
      <hr>
    </div>
    <div class="summary-row">
      <div class="seat-no">
        All
      </div>
      <SummaryRow :patients="patients"/>
    </div>
    <div class="add-patient">
      <AddPatient />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ScheduleRow from '@/components/ScheduleRow.vue'
import SummaryRow from '@/components/SummaryRow.vue'
import AddPatient from '@/components/AddPatient.vue'
import TimeLine from '@/components/TimeLine.vue'

export default {
  name: 'home',
  components: {
    ScheduleRow,
    SummaryRow,
    TimeLine,
    AddPatient
  },
  data: function () {
    return {
      currentPatient: -1,
      offsetX: 0,
      editOffsetX: 0,
      offsetY: 0,
      changedSeat: false,
      editingBlock: 0,
      minBlockLength: 0
    }
  },
  computed: {
    seats: function () {
      return this.$store.state.seats;
    },
    patients: function () {
      return this.$store.state.patients;
    }
  },
  methods: {
  	seatPatients: function (seat) {

  		return this.patients.filter( function (pat) {
        return pat.seat === seat;

  		});
  	},
    setTime: function (time, block) {
      let snappedTime = Math.floor(time/5) * 5;
      this.$store.commit('setTime', {currentPatient: this.currentPatient, time: snappedTime, block: block });
    },
    setSeat: function (pos) {
      let snappedSeat = Math.floor(Math.abs(pos)/40);
      this.$store.commit('setSeat', {currentPatient: this.currentPatient, seat: snappedSeat});
      this.changedSeat = true;
    },
    confirmSeatChange: function () {
      this.changedSeat = false;
    },
    setCurrentPatient: function (pat) {
      this.currentPatient = pat.pid;
      this.offsetX = pat.offsetX;
      this.offsetY = pat.offsetY;
    },
    mouseMove: function (e) {
      if (this.currentPatient >= 0) {
        if (this.editingBlock === 0) {
          this.setTime(Math.max((e.clientX - this.offsetX) * this.$store.state.scale, this.minBlockLength), this.editingBlock);
          this.setSeat((e.clientY - this.offsetY));
        }
        else {
          console.log("editOffsetX 2", this.editOffsetX);
          this.setTime(Math.max((e.clientX - this.editOffsetX) * this.$store.state.scale, this.minBlockLength), this.editingBlock);
        }
      }
    },
    mouseUp: function () {
      this.currentPatient = -1;
      this.minBlockLength = 0;
    },
    editPattern(payload) {
      let offset = 0; //this.$store.state.leftOffset;
      for (let i = 0; i < this.patients.length; i += 1) {
        if (this.patients[i].id === payload.pid) {
          this.minBlockLength = this.$store.state.patterns[this.patients[i].patternName][payload.block].time;
          offset += this.patients[i].startTime / this.$store.state.scale;
          console.log("startTime", offset);
          for (let j = 0; j < payload.block; j += 1) {
            offset += this.patients[i].pattern[j].time / this.$store.state.scale;
            console.log(j, offset);
          }
          break;
        }
      }
      this.editOffsetX = offset;
      console.log("editOffsetX", this.editOffsetX);
      this.currentPatient = payload.pid;
      this.editingBlock = payload.block;
    }
  }
}
</script>
<style scoped>
.seat-no {
  display: inline-block;
  width: 30px;
  height: 20px;
  padding-left:10px;
}
.seat-row {
  /*background-color: rgba(0, 0, 255, 0.3)*/
}
.background {
  position: absolute;
  z-index: -2;
  top:0;
  left: 40px;
}
.add-patient {
  position: fixed;
  bottom:0;
  left:0;
  width:100%;
  padding:1em;
  background-color: lightgreen;
  border:1px dotted #999;
}
.summary-row {
  display: inline-block;
  background-color: white;
  width:100%;
  height: 40px;
}
</style>
