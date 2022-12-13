<template>
  <div class="search-block">
    <!-- поиск по имени или фамилии -->
    <div class="form-check mb-3">
      <label
        for="exampleFormControlInput1"
        class="form-label"
      >
        Поиск
      </label>
      <input
        @input="changeStringForSearchByName"
        v-model="strSearchByName"
        type="text"
        class="form-control"
        placeholder="введите строку для поиска"
        checked
      >
    </div>
    <div class="form-check">
      <input
        v-model="searchFirstNameFlag"
        @input="nameSearchParameterChange('searchLastNameFlag')"
        class="form-check-input"
        type="radio"
        name="flexRadioDefault1"
      >
      <label
        class="form-check-label"
        for="flexRadioDefault1"
      >
        по имени
      </label>     
    </div>
    <div class="form-check">
      <input
        v-model="searchLastNameFlag"
        @input="nameSearchParameterChange('searchFirstNameFlag')"
        class="form-check-input"
        type="radio"
        name="flexRadioDefault2"
      >
      <label
        class="form-check-label"
        for="flexRadioDefault2"
      >
        по фамилии
      </label>
    </div>
    <!-- фильтр по наличию водительских прав -->
    <hr>
    <div class="form-check m-2">
      <input
        @input="driverLicenseFlagChange"
        class="form-check-input"
        type="checkbox"
      >
      <label
        class="form-check-label"
        for="flexCheckDefault"
      >
        Только с водительским удостоверением
      </label>
    </div>
    <hr>
    <!-- поиск по размеру ноги в диапазоне -->
    <div class="flex-center-items">
      <label
        for="exampleFormControlInput1"
        class="form-label"
      >
        Размер ноги от
      </label>
      <input
        @input="footSizeFieldChange($event.target.value, 'footSizeFrom')"
        type="text"
        class="form-control m-2 form-control-width"
      >
      <label
        for="exampleFormControlInput1"
        class="form-label"
      >
        до
      </label>
      <input
        @input="footSizeFieldChange($event.target.value, 'footSizeTo')"
        type="text"
        class="form-control m-2 form-control-width"
      >
    </div>
    <hr>
    <!-- фильтр мужчины или женщины -->
    <div class="flex-center-items">
      <div class="form-check m-2">
        <input
          @input="genderFilterChange('male', $event.target)"
          class="form-check-input"
          type="checkbox"
        >
        <label
          class="form-check-label"
          for="flexCheckDefault"
        >
          Мужчины
        </label>
      </div>
      <div class="form-check m-2">
        <input
          @input="genderFilterChange('female', $event.target)"
          class="form-check-input"
          type="checkbox"
        >
        <label
          class="form-check-label"
          for="flexCheckDefault"
        >
          Женщины
        </label>
      </div>
    </div>
    <hr>
    <!-- поиск по дате рождения: по числу и/или месяцу и/или году-->
    <h4>Поиск по дате рождения</h4>
    <p>по числу и/или месяцу, и/или году</p>
    <div class="flex-center-items">
      <label
        for="exampleFormControlInput1"
        class="form-label"
      >
        Число
      </label>
      <input
        @input="dayChange($event.target.value)"
        type="text"
        class="form-control m-2 form-control-width"
      >
      <select
        @input="monthChange($event.target.value)"
        class="form-select my-select"
      >
        <option
          :value="null"
          selected
        >
          Выберите месяц
        </option>
        <option
          v-for="(month, index) in months"
          :key="index"
          :value="index + 1"
        >
          {{ month }}
        </option>
      </select>
    </div>
    <div class="flex-center-items">
      <label
        for="exampleFormControlInput1"
        class="form-label"
      >
        Год
      </label>
      <input
        @input="yearChange($event.target.value)"
        type="text"
        class="form-control m-2 form-control-width"
      >
    </div>
  </div>
</template>

<script>
import { months } from '@/contants';

  export default {
    data: () => ({
      months: [],
      searchFirstNameFlag: true,
      searchLastNameFlag: false,
      strSearchByName: '',
      driverLicenseFlag: false,
      footSizeFrom: '',
      footSizeTo: '',
      genderFilter: {
        male: false,
        female: false
      }
    }),

    mounted() {
      this.months = months
    },

    methods: {
      // смеена параметра поиска firstname/lastname
      nameSearchParameterChange(parameter) {
        this[parameter] = false;
        parameter === 'searchLastNameFlag'
          ? this.$store.commit('changeStateValue', {
            field: 'searchByFirstnameOrLastname',
            value: 'firstname'
          })
         : this.$store.commit('changeStateValue', {
            field: 'searchByFirstnameOrLastname',
            value: 'lastname'
          })
          this.$store.commit('itemsListHandler')
      },

      changeStringForSearchByName() {
        this.$store.commit('changeStateValue', {
          field: 'nameSearchString',
          value: this.strSearchByName
        })
        this.$store.commit('itemsListHandler')
      },

      driverLicenseFlagChange() {
        this.driverLicenseFlag = !this.driverLicenseFlag
        this.$store.commit('changeStateValue', {
          field: 'onlyWithDriverLicense',
          value: this.driverLicenseFlag
        })
        this.$store.commit('itemsListHandler')
      },

      footSizeFieldChange(value, param) {

        if (Number.isNaN(parseInt(value)) && value !== '') return
        this.$store.commit('changeStateValue', {
          field: param,
          value: value ? parseInt(value) : null
        })
        this.$store.commit('itemsListHandler')
      },

      genderFilterChange(gender, target) {
        this.genderFilter[gender] = target.checked
        let valueForStore = null
        if ((this.genderFilter.male && !this.genderFilter.female) ||
            (!this.genderFilter.male && this.genderFilter.female)) {
              valueForStore = {...this.genderFilter}
          }
        this.$store.commit('changeStateValue', {
          field: 'genderFilter',
          value: valueForStore
        })
        this.$store.commit('itemsListHandler')
      },

      dayChange(value) {
        if (Number.isNaN(parseInt(value)) && value !== '') return
        this.$store.commit('changeStateValue', {
          field: 'day',
          value: value ? parseInt(value) : null
        })
        this.$store.commit('itemsListHandler')
      },

      monthChange(value) {
        this.$store.commit('changeStateValue', {
          field: 'month',
          value: value
        })
        this.$store.commit('itemsListHandler')
      },
      
      yearChange(value) {
        if (Number.isNaN(parseInt(value)) && value !== '') return
        this.$store.commit('changeStateValue', {
          field: 'year',
          value: value ? parseInt(value) : null
        })
        this.$store.commit('itemsListHandler')
      }
      
    }
  }
</script>

<style lang="scss" scoped>
.search-block {
  width: 350px;
  margin-left: 25px;
}

.form-control-width {
  width: 80px;
}
.my-select {
  width: 250px;
}
</style>