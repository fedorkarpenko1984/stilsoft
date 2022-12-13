<template>
  <div>
    <h3 v-if="!isLoaded">ЗАГРУЗКА...</h3>
    <h5 v-if="(isLoaded && itemsList?.length === 0)">Нет подходящиз элементов</h5>
    <div
      v-if="isLoaded"
      class="items-list"
    >
      <button
        @click="openEditPopup"
        class="btn btn-outline-primary w-25"
      >
        +
      </button>
      <item-in-list
        v-for="item in itemsList"
        :key="item.id"
        :photo="item.photo"
        :first-name="item.firstname"
        :last-name="item.lastname"
        :item-id="parseInt(item.id)"
      />
    </div>
  </div>
</template>
  
<script>
import ItemInList from './ItemInList.vue';
  export default {
    components: {
      ItemInList
    },

    methods: {
      openEditPopup() {
        this.$store.commit('changeStateValue', {
          field: 'idForEdit',
          value: 'new'
        })
        this.$store.commit('setShowEditPopupFlag', true)
      }
    },

    computed: {
      searcheByFirstnameOrLastname() {
        return this.$store.state.searchByFirstnameOrLastname
      },

      strForSearchByName() {
        console.log(this.$store.state.nameSearchString)
        return this.$store.state.nameSearchString
      },

      itemsList() {
        let list = this.$store.state.handledItemsList
        if (!list) return []
        return list
      },

      isLoaded() {
        return this.$store.state.isLoaded
      }
    },

    async mounted() {
      this.itemsList = await this.$store.dispatch('getItemsList')
      await this.$store.commit('itemsListHandler')
    }
  }
</script>
  
<style lang="scss" scoped>
.items-list {
  width: 250px;
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow-y: scroll;
}
</style>