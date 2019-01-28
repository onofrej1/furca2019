<template>
  <v-container fluid>
    <v-layout row>
      <v-flex v-if="activeForm" offset-md3 md6>
        <v-card class="elevation-12">
          <v-toolbar>
            <v-toolbar-title>{{ activeResource }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form>
              <template v-for="field in form">
                <v-text-field
                  :key="field.name"
                  v-if="field.type==='text'"
                  v-model="model[field.name]"
                  :label="field.label || field.name"
                  required
                ></v-text-field>

                <v-select
                  v-if="field.type==='relation'"
                  :key="field.name"
                  :items="getOptions(field.resourceTable, field.show)"
                  v-model="model[field.name]"
                  :label="field.label || field.name"
                ></v-select>
              </template>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-flex v-if="!activeForm" offset-md1 md10>
      <v-card>
        <v-card-title>
          <v-btn small color="primary" @click="createItem({})">
            <v-icon>add</v-icon>Add new
          </v-btn>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <router-link to="/crud/page">Go to Foo</router-link>
      <router-link to="/crud/article">Go to Bar</router-link>

        <v-data-table
          d-block
          :headers="table"
          :items="activeResourceData"
          hide-actions
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td
              class="text-xs-right"
              :key="field.value"
              v-for="field in table"
            >{{ field.render ? field.render(props) : props.item[field.value] }}</td>
            <td class="text-xs-right">
              <v-btn small color="primary" @click="editItem(props.item)">Edit</v-btn>
              <v-btn small color="error">Delete</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
import CrudModels from "./../CrudModels";

import { mapState, mapActions } from "vuex";

export default {
  name: "admin",
  data() {
    return {
      activeForm: false,
      models: CrudModels,
      table: [],
      form: [],
      model: {},
      search: ""
    };
  },
  components: {
    //editor: Editor,
    //quillEditor
  },
  computed: {
    ...mapState(["activeResource", "resourceData"]),
    activeResourceData: function() {
      return this.resourceData[this.activeResource];
    },
    resourceSettings: function() {
      return this.models[this.activeResource];
    }
  },
  watch: {
    //$route(to, from) {
    $route() {
      let resource = this.$route.params.resource;
      this.activeForm = false;
      console.log('resource'+resource);
      this.setActiveResource(resource);
      this.makeTable();
      this.fetchResourceData(resource);
    }
  },
  methods: {
    ...mapActions([
      "setActiveResource",
      "fetchResourceData",
      "saveResourceData"
    ]),
    getOptions: function(resourceName, field) {
      let resource = this.resourceData[resourceName];
      let options =
        resource &&
        resource.map(data => {
          return {
            value: data.id,
            text: data[field]
          };
        });
      return options;
    },
    createItem: function() {
      this.model = {};
      this.buildForm(null);
      this.activeForm = true;
    },
    editItem: function(item) {
      this.model = item;
      this.buildForm(item);
      this.activeForm = true;
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.saveResourceData(this.model);
      this.fetchResourceData(this.resourceName);
      this.model = {};
      this.activeForm = false;
    },
    onReset() {
      this.activeForm = false;
    },
    makeTable() {
      this.table = [
        {
          text: "id",
          value: "id",
          align: "right"
        }
      ];
      for (let prop of this.resourceSettings.list) {
        this.table.push({
          render: prop.render,
          text: prop.field,
          value: prop.field,
          align: "right"
        });
      }
      /*this.table.push({
                text: 'action',
                class: 'text-xs-right'
              });*/
    },
    buildForm(row) {
      this.form = [
        {
          name: "id",
          type: "hidden"
        }
      ];
      let field;

      for (let prop of this.resourceSettings.form) {
        let name = prop.name;
        if (row) {
          let value =
            row[name] instanceof Array ? row[name].map(v => v.id) : row[name];
          row[name] = value;
          console.log(value);
        }
        field = {
          ...prop
        };

        if (prop.type == "relation" || prop.type == "pivotRelation") {
          this.fetchResourceData(prop.resourceTable);
        }

        this.form.push(field);
      }
      //console.log(this.form);
    }
  }
};
</script>

<style>
</style>
