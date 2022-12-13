<template>
  <div
    @click="openItem()"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    class="item card"
    :class="hover ? 'open' : 'closed'"
  >
    <card-photo
      :photo="photo"
      :width="100"
      :height="100"
    />
    <div>
      <h6 class="first-name">{{ firstName }}</h6>
      <h6>{{ lastName }}</h6>
    </div>
    <div class="icons">
      <img
        @click.stop="openEditPopup"
        class="icon"
        :src="editIcon"
        alt="edit icon"
      >
      <img
        @click.stop="$store.commit('setIdForDelete', itemId)"
        class="icon"
        :src="deleteIcon"
        alt="delete icon"
      >
    </div>
  </div>
</template>

<script>
import CardPhoto from './CardPhoto.vue';
import deleteIcon from '../assets/icons/delete-icon.svg'
import editIcon from '../assets/icons/edit-icon.svg'

  export default {
    components: {
      CardPhoto
    },
    props: {
      firstName: String,
      lastName: String,
      photo: String,
      itemId: Number
    },
    data: () => ({
      hover: false,
      deleteIcon,
      editIcon
    }),

    methods: {
      openItem() {
        this.$store.commit('changeStateValue', {
          field: 'itemIdForShowFullInfo',
          value: this.itemId
        })
      },

      openEditPopup() {
        this.$store.commit('setShowEditPopupFlag', true)
        this.$store.commit('setIdForEdit', this.itemId)
      }
    }
  }
</script>

<style lang="scss" scoped>
.item {
  width: 240px;
  flex-direction: row !important;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  border: 2px solid grey;
  transition: all 0.5s;
  margin-top: 10px;
  cursor: pointer;
}
.closed {
  min-height: 50px !important;
  .photo {
    display: none !important;
  }
}
.open {
  min-height: 150px !important;
  .icons {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
}
.icon {
  width: 20px;
  height: 20px;
  margin-left: 10px;
}
.first-name {
  margin-top: 10px !important;
}
</style>