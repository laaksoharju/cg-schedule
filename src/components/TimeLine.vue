<template>
  <div>
    <div class="pattern" :style="{width: (60/$store.state.scale - 1) + 'px'}"
      v-for="hour in time">
      {{hour}}
      <div class="half">
      </div>
    </div>
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
      time: [7,8,9,10,11,12,13,14,15,16,17]
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pattern {
  display: inline-block;
  height:100vh;
  border-left: 1px dashed #aaa;
}
.half {
  height:100vh;
  width:calc(50% - 1px);
  border-right: 1px dashed #e9e9e9; 
}


</style>
