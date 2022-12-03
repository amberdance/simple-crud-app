export default {
  computed: {
    users() {
      return this.$store.getters["users/index"];
    },
  },

  methods: {
    async findAllUsers() {
      try {
        this.isLoading = true;
        await this.$store.dispatch("users/index");
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },

    async createUser(params) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("users/create", params);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },

    async updateUser({ id, params }) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("users/update", { id, params });
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteUser(id) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("users/delete", id);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },

    async deleteUsers(ids) {
      try {
        this.isLoading = true;
        await this.$store.dispatch("users/massDelete", ids);
      } catch (e) {
        console.error(e);
      } finally {
        this.isLoading = false;
      }
    },

    async uploadAvatar(formData) {
      try {
        await this.$store.dispatch("users/uploadAvatar", formData);
      } catch (e) {
        return Promise.reject(e);
      }
    },

    async detachAvatar(id) {
      try {
        await this.$store.dispatch("users/detachAvatar", { id });
      } catch (e) {
        return Promise.reject(e);
      }
    },
  },
};
