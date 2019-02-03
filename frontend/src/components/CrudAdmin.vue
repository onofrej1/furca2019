<template>
    <v-container fluid>
      <v-layout row>
        <v-flex v-if="activeForm">
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

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="onSubmit">Save</v-btn>
              <v-btn>Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <v-flex v-if="!activeForm" md12>
        <v-card>
          <v-card-title>
            <v-btn small color="primary" @click="createItem({})">
              <v-icon>add</v-icon>Add new
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-title>

          <v-container>
            <v-layout row wrap justify-start>
              <template v-for="filter in resourceSettings.filter">
                <v-flex :key="filter.field" md4>
                  <v-select
                    v-if="filter.type==='select'"
                    :key="filter.field"
                    :items="getFilterOptions(activeResourceData, filter.field)"
                    v-model="search[filter.field]"
                    append-icon="search"
                    :label="filter.label"
                    style="width:90%"
                  ></v-select>

                  <v-text-field
                    v-if="filter.type==='text'"
                    :key="filter.field"
                    v-model="search[filter.field]"
                    append-icon="search"
                    :label="filter.label"
                    style="width:90%"
                  ></v-text-field>
                </v-flex>
              </template>
            </v-layout>
          </v-container>
 
          <!--<router-link to="/crud/posts">Go to Foo</router-link>
          <router-link to="/crud/article">Go to Bar</router-link>-->
          <v-data-table
            v-if="resourceSettings"
            d-block
            :headers="table"
            :items="filteredItems"
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
                <v-icon color="primary" @click="editItem(props.item)">edit</v-icon>
                <v-icon color="red">delete</v-icon>
              </td>
            </template>

            <template slot="footer">
             <component v-bind:is="tableFooter"></component>
              </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-container>
</template>

<script>
import CrudModels from "./../CrudModels";
import DarkLayout from "./DarkLayout";

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
      search: {},
      appComponents: []
    };
  },
  components: {
    DarkLayout
    //editor: Editor,
    //quillEditor
  },
  computed: {
    ...mapState(["activeResource", "resourceData"]),
    activeResourceData: function() {
      return this.resourceData[this.activeResource] || [];
    },
    resourceSettings: function() {
      return this.models[this.activeResource];
    },
    tableFooter: function() {
      //console.log(this.resourceSettings.footer);
      return this.resourceSettings.footer;
    },
    filteredItems: function() {
      var data = this.activeResourceData;
      var search = this.search;
      if (!data) {
        return [];
      }
      this.resourceSettings.filter.forEach(function(filter) {
        data = data.filter(item => {
          var searchValue = search[filter.field];
          if (!searchValue) {
            return true;
          }
          var value = item[filter.field];
          if (filter.op === "contains") {
            return value.includes(searchValue);
          }

          return value === searchValue;
        });
      });
      return data;
    }
  },
  watch: {
    //$route(to, from) {
    $route() {
      let resource = this.$route.params.resource;
      this.activeForm = false;
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
    getFilterOptions: function(data, field) {
      var filterOptions = data.map(row => {
        return {
          value: row[field],
          text: row[field]
        };
      });
      filterOptions.unshift({ value: null, text: "" });
      return filterOptions;
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
