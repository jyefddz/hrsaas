<template>
  <div style="margin: 0 8px">
    <svg-icon
      @click="onFullscreen"
      className="fullscreen"
      iconClass="fullscreen"
    />
  </div>
</template>

<script>
import ScreenFull from 'screenfull'
export default {
  name: 'FullScreen',
  data() {
    return {}
  },

  created() {},

  methods: {
    onFullscreen() {
      if (ScreenFull.isEnabled) {
        ScreenFull.toggle()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fullscreen {
  color: #fff;
  cursor: pointer;
  width: 20px;
  height: 100%;
}
</style>
