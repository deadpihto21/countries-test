<template>
  <v-container v-if="loaded && countryData">
    <v-card>
      <v-card-title>{{ countryData.name.common }}</v-card-title>
      <v-card-text>
        <div>Flag: {{ countryData.flag }}</div>
        <div>Population: {{ countryData.population }}</div>
        <div>CCA3 code: {{ countryData.cca3 }}</div>
        <div>
          Bordering countries CCA3:
          <li v-for="borderCountry in countryData.borders" :key="borderCountry">
            <v-btn color="primary" text @click="navigateToCountry(borderCountry)">
              {{ borderCountry }}
            </v-btn>
          </li>
        </div>
        <div>
          Google Maps :
          <a :href="countryData.maps.googleMaps">{{ countryData.maps.googleMaps }}</a>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCountryStore } from '../store/countries'
import { ICountrySingle } from '../utils/interfaces/ICountry'
export default defineComponent({
  name: 'CountryCard',
  data () {
    return {
      cca3: '' as String
    }
  },
  computed: {
    loaded (): boolean {
      return useCountryStore().loaded
    },
    countryData (): ICountrySingle {
      return useCountryStore().singleCountry
    }
  },
  mounted () {
    const store = useCountryStore()
    this.cca3 = this.$route.query.cca3 as string || ''
    store.loadCountryByCode(this.cca3 as string)
  },
  methods: {
    navigateToCountry (borderCountry: string) {
      useCountryStore().loadCountryByCode(borderCountry as string)
      this.$router.push({ name: 'single', query: { cca3: borderCountry } })
    }
  }
})
</script>
