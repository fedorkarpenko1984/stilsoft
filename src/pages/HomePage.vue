<template>
  <div class="home-page mx-auto flex">
    <items-list />
    <search-filter-sort-block />
    <item-full />
    <confirm-popup v-if="showDeletePopup" />
    <create-and-edit-popup v-if="showEditPopup" />
  </div>
</template>

<script>
import ItemsList from '../components/ItemsList.vue'
import ItemFull from '@/components/ItemFull.vue'
import SearchFilterSortBlock from '@/components/SearchFilterSortBlock.vue'
import CreateAndEditPopup from '@/components/CreateAndEditPopup.vue'
import ConfirmPopup from '@/components/ConfirmPopup.vue'

export default {
  components: {
    ItemsList,
    ItemFull,
    SearchFilterSortBlock,
    CreateAndEditPopup,
    ConfirmPopup
  },

  computed: {
    showDeletePopup() {
      return !!this.$store.state.idForDelete
    },

    showEditPopup() {
      return this.$store.state.showEditPopupFlag
    } 
  }
}
</script>

<style scoped>
.home-page {
  max-width: 1000px;
  display: flex;
}
</style>