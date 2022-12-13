<template>
  <transition name="confirm">
    <div
      @click="$store.commit('setIdForDelete', null)"
      class="popup-wrapper"
    >
      <div
        @click.stop
        class="popup card"
      >
        <h6>Удалить выбраный элемент?</h6>
        <div class="buttons-wrapper">
          <button
            @click.stop="deleteElement"
            class="btn btn-primary"
          >
            ДА
          </button>
          <button
            @click="$store.commit('setIdForDelete', null)"
            class="btn btn-secondary"
          >
            НЕТ
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    methods: {
      deleteElement() {
        this.$store.commit('deleteItemFromList')
        this.$store.commit('setIdForDelete', null)
        this.$store.commit('itemsListHandler')
      }
    }
  }
</script>

<style lang="scss" scoped>
.popup {
  transform: translateX(-50%);
  left: 50%;
  top: 200px;
  padding: 15px;
  position: absolute;
}
.buttons-wrapper {
  margin: 0 auto;
  width: 150px;
  display: flex;
  justify-content: space-around;
}
</style>