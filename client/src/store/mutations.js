import Vue from "vue";

const deepUpdate = (object, data) => {
  for (const key in data) {
    if (_.isObject(data[key])) {
      if (object[key] === null) object[key] = {};
      deepUpdate(object[key], data[key]);
    } else {
      Vue.set(object, key, data[key]);
    }
  }
};

export default {
  // Handle array of objects with key items or pagination
  massSet(state, { key, data }) {
    if (_.has(data, "pagination")) state.pagination = data.pagination;

    data = _.has(data, "items") ? data.items : data;
    data.forEach((props) => Vue.set(state[key], props.id, props));
  },

  set(state, { key, data }) {
    Vue.set(state[key], data.id, data);
  },

  update(state, { key, data, deep = true }) {
    deep
      ? deepUpdate(state[key][data.id], data)
      : Vue.set(state[key], data.id, data);
  },

  clear(state, key) {
    state[key] = {};
  },

  delete(state, { key, id }) {
    if (!_.isArray(id)) id = [id];

    id.forEach((id) => Vue.delete(state[key], id));
  },
};
