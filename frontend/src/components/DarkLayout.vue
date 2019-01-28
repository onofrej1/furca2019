<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile @click="setModel(modelName)" :key="modelName" v-for="modelName in modelNames">
          <v-list-tile-action>
            <v-icon>dashboard</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ modelName }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left color="indigo">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">O5 Bežecký klub Furča</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <slot name="content"></slot>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "dark-layout",
  data: () => ({
    drawer: true
  }),
  props: {
    source: String,
    models: Object
  },
  methods: {
    setModel: function(modelName) {
      console.log(modelName);
      this.$router.push({
        name: "crud",
        params: { resource: modelName }
      });
    }
  },
  computed: {
    modelNames: function() {
      return Object.keys(this.models);
    }
  }
};
</script>
<style>
.content {
  margin: 0px !important;
}
</style>
