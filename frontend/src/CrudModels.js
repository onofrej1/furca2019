import Vue from 'vue'

var footer = {
  name: 'my-footer',
	template: '<b>footer</b>' 
};

var footer2 = {
  name: 'my-footer',
	template: '<p>footer2</p>' 
};

/*const user = {
  title: 'Users',
  form: [
    { name: 'name', type: 'text' },
    { name: 'email', type: 'text' },
    { name: 'roles', type: 'pivotRelation', resourceTable: 'role', show: 'title', label: 'Roles' },
  ],
  list: [
    { field: 'name', label: 'Name' },
    { field: 'email', label: 'Email' },
  ]
}*/


const posts = {
  title: 'Posts',
  filter: [
    { field: 'title', type: 'select', 'op': 'eq', label:'Title'},
    { field: 'text', type: 'text', 'op': 'contains', label: 'Text'}
  ],
  form: [
    { name: 'title', type: 'text' },
    { name: 'author', type: 'text' },
    { name: 'text', type: 'text' },
    //{ name: 'content', type: 'editor' },
    //{ name: 'tags', type: 'pivotRelation', resourceTable: 'tag', show: 'title', label: 'Tags' },
  ],
  list: [
    { field: 'title' },
    { field: 'author' },
    { field: 'text' },
   /* { render: props => {
      console.log(props);
      return 'aaa'+ props.item.text;
    } },*/
  ],
  footer: footer2,
}

const users = {
  title: 'Users',
  filter: [
    { field: 'username', type: 'text', 'op': 'eq'}
  ],
  form: [
    { name: 'username', type: 'text' },
    { name: 'email', type: 'text' },
    //{ name: 'content', type: 'editor' },
    //{ name: 'tags', type: 'pivotRelation', resourceTable: 'tag', show: 'title', label: 'Tags' },
  ],
  list: [
    { field: 'username' },
    { field: 'email' },
  ],
  footer: footer,
}

/*const menuItem = {
  title: 'Menu',
  form: [
    { label: 'Title', name: 'title', type: 'text' },
    { label: 'Menu', name: 'menu_id', type: 'relation', resourceTable: 'menu', show: 'title' },
    { label: 'Page', name: 'page_id', type: 'relation', resourceTable: 'page', show: 'title' },
    { label: 'Parent', name: 'parent_id', type: 'relation', resourceTable: 'menuItem', show: 'title' },
  ],
  list: [
    { field: 'title', label: 'Title', render: (row) => `<div>${row.title}</div>` }
  ],
}

const page = {
  title: "Pages",
  form: [
    { label: 'Title', name: 'title', type: 'text' },
    { type: "editor", label: "Body", name: 'body' },
  ],
  list: [
    { field: 'title', label: 'Title', render: (row) => `<div>${row.title}</div>` }
  ],
};

const hamburg = {
  title: "Pages",
  form: [
    { label: 'Title', name: 'title', type: 'text' },
    { label: 'Date', name: 'event_date', type: 'datepicker' },
    { label: "Notes", type: "textarea", rows: 8, name: 'notes' },
  ],
  list: [
    { field: 'title', label: 'Title' },
    { label: 'Date', render: (row) => `<div>${row.event_date}</div>` }
  ],
};

const tag = {
  title: "Tags",
  form: [
    { label: 'title', name: 'title', type: 'text' },
  ],
  list: [
    { field: 'title', label: 'Title' }
  ]
};*/

const models = { users, posts };

export default models;
