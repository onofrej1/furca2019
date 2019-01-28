<template>
  <v-app>
    <CrudAdmin/>
  </v-app>
</template>

<script>
//import Admin from "./components/Admin.vue";
import CrudAdmin from "./components/CrudAdmin.vue";

export default {
  name: "app",
  components: {
    CrudAdmin
  }
};
</script>

<style>
</style>
