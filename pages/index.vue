<template>
  <v-row justify="center" align="center">
    <v-col sm="12">
      <CountryList />
    </v-col>
  </v-row>
</template>

<script>
import CountryList from '~/components/countryList'
export default {
  name: 'IndexPage',
  components: { CountryList }
}
</script>
