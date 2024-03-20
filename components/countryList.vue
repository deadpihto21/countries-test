<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          @input="updateQueryParameter"
        />
      </v-card-title>
      <v-data-table
        key="cca3"
        :headers="headers"
        :items="filteredCountries"
        :search="search"
        :loading="!loaded"
      >
        <template v-slot:item.cca3="{ item }">
          <v-btn color="primary" text @click="navigateToCountry(item)">
            {{ item.cca3 }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ICountryListItem } from '~/utils/interfaces/ICountry'
import { useCountryStore } from '~/store/countries'

export default defineComponent({
  name: 'CountryList',
  data () {
    return {
      search: '' as string,
      countries: [] as ICountryListItem[],
      headers: [
        {
          text: 'Country Name',
          align: 'start',
          filterable: true,
          value: 'name.common'
        },
        {
          text: 'Flag',
          align: 'start',
          filterable: true,
          value: 'flag'
        },
        {
          text: 'Population',
          align: 'start',
          filterable: true,
          value: 'population'
        },
        {
          text: 'CCA3 code',
          align: 'start',
          filterable: true,
          value: 'cca3'
        }
      ]
    }
  },
  computed: {
    filteredCountries (): ICountryListItem[] {
      return useCountryStore().filteredCountries
    },
    loaded (): boolean {
      return useCountryStore().loaded
    }
  },
  mounted () {
    this.search = this.$route.query.search as string || ''
    const store = useCountryStore()
    if (!store.loaded) {
      store.preloadCountries()
    }
  },
  methods: {
    navigateToCountry (country: ICountryListItem) {
      useCountryStore().loadCountryByCode(country.cca3 as string)
      this.$router.push({ name: 'single', query: { cca3: country.cca3 } })
    },
    updateQueryParameter () {
      this.$router.push({ query: { search: this.search } })
    }
  }
})
</script>
