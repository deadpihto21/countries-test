import { defineStore } from 'pinia'
import axios from 'axios'
import { ICountryListItem, ICountrySingle } from '~/utils/interfaces/ICountry'

export const useCountryStore = defineStore('country', {
  state: () => ({
    countries: [] as ICountryListItem[],
    singleCountry: {} as ICountrySingle,
    loaded: false,
    search: '' as string
  }),
  actions: {
    async preloadCountries () {
      this.loaded = false
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        this.countries = response.data
        this.loaded = true
      } catch (error) {
        console.info('Error preloading countries:', error)
      }
    },
    async loadCountryByCode (countryCode: String) {
      this.loaded = false
      try {
        const response = await axios.get('https://restcountries.com/v3.1/alpha/' + countryCode)
        this.singleCountry = response.data[0]
        this.loaded = true
      } catch (error) {
        console.info('Error loading country:', error)
      }
    }
  },
  getters: {
    filteredCountries (): ICountryListItem[] {
      return this.countries.filter((country: ICountryListItem) => {
        if ((country.name && typeof country.name.common === 'string') && country.cca3) {
          return country.name.common.toLowerCase().includes(this.search.toLowerCase()) || country.cca3.toLowerCase().includes(this.search.toLowerCase())
        }
        return false
      })
    }
  }
})
