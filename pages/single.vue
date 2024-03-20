<template>
    <v-row justify="center" align="center">
      <v-col cols="12"sm="12">
          <CountryCard />
      </v-col>
    </v-row>
  </template>
  
  <script>
  import CountryCard from "../components/CountryCard"
  export default {
    name: 'CountryPage',
    components: {CountryCard}
  }
  </script>
  