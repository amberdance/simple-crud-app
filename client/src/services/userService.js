export default {
  computed: {
    users() {
      return this.$store.getters["users/index"];
    },
  },

  methods: {
    async findAllUsers() {
      try {
        await this.$store.dispatch("users/index");
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async createUser(params) {
      try {
        await this.$store.dispatch("users/create", params);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async updateUser({ id, params }) {
      try {
        await this.$store.dispatch("users/update", { id, params });
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async deleteUser(id) {
      try {
        await this.$store.dispatch("users/delete", id);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async deleteUsers(ids) {
      try {
        await this.$store.dispatch("users/massDelete", ids);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async uploadAvatar(formData) {
      try {
        await this.$store.dispatch("users/uploadAvatar", formData);
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async detachAvatar(id) {
      try {
        await this.$store.dispatch("users/detachAvatar", { id });
        return Promise.resolve();
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
