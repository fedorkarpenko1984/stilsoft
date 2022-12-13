<template>
  <div class="item-full rounded">
    <h4
      v-if="!itemData"
      class="p-2"
    >
      Выберите элемент в списке
    </h4>
    <div v-if="itemData">
      <card-photo
        :photo="itemData?.photo"
        class="mx-auto mt-3 mb-3" 
        :width="200"
        :height="200"
      />
      <h5>{{ itemData?.firstname }}</h5>
      <h5>{{ itemData?.lastname }}</h5>
      <h5>Размер ноги: {{ itemData?.footSize }}</h5>
      <h6>Дата рождения:</h6>
      <h5>{{ getBirthday }}</h5>
      <h5>{{ getGender }}</h5>
      <h5>Водительские права: {{ getDriverLicense }}</h5>
    </div>
  </div>
</template>

<script>
import CardPhoto from './CardPhoto.vue';
import { months } from '@/contants';

function getMonth (birthday) {
  const month = months[parseInt(birthday.slice(2,4)) - 1]
  if (month === 'Март' || month === 'Август') return month + 'а'
  return month.slice(0, month.length - 1) + 'я'
}

  export default {
    components: {
      CardPhoto
    },

    mounted() {

    },

    computed: {
      
      itemData() {
        return this.$store.getters.getItemById
      },

      getBirthday() {
        if (this.itemData) {
          const birthday = this.itemData.birthday
          const day = parseInt(birthday.slice(0,2))
          const month = getMonth(birthday)
          return day + ' ' + month + ' ' + birthday.slice(4)
        }
        return ''
      },

      getGender() {
        if (this.itemData.gender === 'male') return 'Мужчина'
        return 'Женщина'
      },

      getDriverLicense() {
        if (this.itemData.driverLicense) return 'да'
        return 'нет'
      }

    }
  }

</script>

<style lang="scss" scoped>
.item-full {
  width: 350px;
  height: 500px;
  margin-left: 20px;
  box-shadow: 0px 0px 2px 2px rgb(202, 202, 202);
}
h5, h6 {
  margin-left: 75px;
}
</style>