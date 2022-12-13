<template>
  <div
    @click="closePopup"
    class="popup-wrapper"
  >
    <form
      @submit.prevent
      @click.stop
      class="create-edit-popup mx-auto rounded p-2"
    >
      <div
        v-show="errorMessage"
        class="form-error-message rounded"
      >
        <h5>{{ errorMessage }}</h5>
      </div>
      <h4>{{ isNew ? 'Создать' : 'Редактировать' }}</h4>
      <div class="mb-1">
        <input
          v-model="firstname"
          type="text"
          class="form-control"
          placeholder="Имя"
        >
      </div>
      <div class="mb-1">
        <input
          v-model="lastname"
          type="text"
          class="form-control"
          placeholder="Фамилия"
        >
      </div>
      <div class="flex-center-items mb-2 justify-between">
        <label>Размер ноги </label>
        <input
          v-model.number="footSize"
          type="text"
          class="form-control w-25"
        >
      </div>
      <div class="flex-center-items mb-1 w-75">
        <label>Водительское удостоверение</label>
        <input
          v-model="driverLicense"
          class="form-check-input m-2"
          type="checkbox"
        >
      </div>
      <select
        v-model="gender"
        class="form-select"
      > 
        <option
          disabled
          value="default"
          v-if="isNew"
        >
          Выберите пол
        </option>
        <option value="male">Мужчина</option>
        <option value="female">Женщина</option>
      </select>

      <div class="flex-center-items m-1">
        <label>Дата рождения</label>
        <date-picker
          type="date"
          v-model="date"
          @input="changeDate"
          value-type="format"
          class="m-1"
        />
      </div>

      <div class="button-wrapper">
        <button
          @click="saveEditedOrCreatedData"
          class="btn btn-outline-success btn-sm"
        >
          СОХРАНИТЬ
        </button>
        <button
          @click="closePopup"
          class="btn btn-outline-warning btn-sm"
        >
          ЗАКРЫТЬ
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
const photoMan = 'https://i.ibb.co/8NZJYzV/photo-man.jpg'
const photoWoman = 'https://i.ibb.co/N7ccb2H/photo-woman.jpg'

  export default {
    components: {
      DatePicker
    },
    data: () => ({
      firstname: '',
      lastname: '',
      footSize: '',
      driverLicense: false,
      birthday: '01012000',
      gender: 'default',
      date: '2000-01-01',
      id: 0,
      errorMessage: ''
    }),

    computed: {
      isNew() {
        return this.$store.state.idForEdit === 'new' ? true : false
      }
    },

    methods: {
      closePopup() {
        this.$store.commit('setShowEditPopupFlag', false)
      },

      showErrorMessage(message) {
        this.errorMessage = message
        setTimeout(() => this.errorMessage = '', 1000)
      },

      validation() {
        if (!this.firstname) {
          this.showErrorMessage('Введите имя')
          return false
        }
        if (!this.lastname) {
          this.showErrorMessage('Введите фамилию')
          return false
        }
        if (!this.footSize) {
          this.showErrorMessage('Введите размер ноги')
          return false
        }
        if (Number.isNaN(parseInt(this.footSize)) ) {
          this.showErrorMessage('Некорректный размер ноги')
          return false
        }
        if (!this.gender) {
          this.showErrorMessage('Введите пол')
          return false
        }
        return true
      },

      changeDate() {
        this.birthday = this.date.split('-').reverse().join('')
      },

      saveEditedOrCreatedData() {
        if (!this.validation()) return
        const itemsList = this.$store.state.itemsList
        const id = parseInt(itemsList[itemsList.length - 1].id) + 1
        const dataForSaving = {
          firstname: this.firstname,
          lastname: this.lastname,
          footSize: this.footSize,
          birthday: this.birthday,
          photo: this.gender === 'male' ? photoMan : photoWoman,
          driverLicense: this.driverLicense,
          gender: this.gender,
          id: this.isNew ? id.toString() : this.id
        }
        this.isNew
          ? this.$store.commit('createNewItemInList', dataForSaving )
          : this.$store.commit('saveNewDataOfEditedItem', dataForSaving)
        this.closePopup()
      }
    },

    mounted() {
      if (!this.isNew) {
        const itemData = this.$store.getters.getItemByIdForEdit
        this.firstname = itemData.firstname
        this.lastname = itemData.lastname
        this.footSize = itemData.footSize
        this.driverLicense = itemData.driverLicense
        this.gender = itemData.gender
        this.date = [
          itemData.birthday.slice(4),
          itemData.birthday.slice(2,4),
          itemData.birthday.slice(0,2)
        ].join('-')
        this.id = itemData.id
      }
    }
  }
</script>

<style lang="scss" scoped>
.create-edit-popup {
  box-shadow: 0px 0px 2px 2px inset grey;
  background-color: white;
  width: 500px;
  height: 400px;
  margin: 100px;
  position: relative;
}
.button-wrapper {
  display: flex;
  justify-content: center;
}
.button-wrapper > * + * {
  margin-left: 10px;
}
h4 {
  text-align: center;
}
.form-error-message {
  position: absolute;
  top: 100px;
  width: 80%;
  left: 10%;
    background-color: white;
    border: 1px solid rgb(221, 58, 17);
 
  h5 {
    color: rgb(221, 58, 17);
    padding: 10px 20px;
    text-align: center;
  }
}
</style>