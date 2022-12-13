<template>
  <div
    :style="{
      width: width + 'px',
      height: height + 'px'
    }"
    class="photo rounded m-1"
  >
    <img
      :src="photo"
      alt="photo"
      :class="portrait ? 'portrait' : 'landscape'"
    >
  </div>
</template>

<script>
  export default {
    props: {
      photo: String,
      width: Number,
      height: Number
    },

    computed: {
      portrait() {
        const img = new Image()
        img.src = this.photo
        if (img.width > img.height) return false
        return true
      }
    }
    
  }
</script>

<style lang="scss" scoped>
.photo {
  border: 1px solid grey;
  overflow: hidden;
}
.portrait {
  width: 100%;
  height: auto;
}
.landscape {
  height: 100%;
  width: auto;
}
</style>