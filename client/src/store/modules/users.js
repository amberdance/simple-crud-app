import { httpServiceProvider } from "@/providers/httpServiceProvider";
import mutations from "@/store/mutations";

export default {
  namespaced: true,

  state: {
    users: [],
    drawer: [],
  },

  getters: {
    index: (state) => Object.values(state.users),
    drawer: (state) => Object.values(state.drawer)[0],
  },

  mutations,

  actions: {
    async index({ commit }, params) {
      commit("clear", "users");

      const data = await httpServiceProvider.get("/users", params);

      commit("massSet", { key: "users", data });
    },

    async create({ commit }, params) {
      const data = await httpServiceProvider.post("/users", params);

      commit("set", { key: "users", data });
    },

    async update({ commit }, { id, params }) {
      const data = await httpServiceProvider.patch(`/users/${id}`, params);

      commit("update", {
        key: "users",
        data,
      });
    },

    async delete({ commit }, id) {
      await httpServiceProvider.delete(`/users/${id}`);
      commit("delete", { key: "users", id });
    },

    async massDelete({ commit }, ids) {
      await httpServiceProvider.post("/users/remove", { ids });
      commit("delete", { key: "users", id: ids });
    },

    async uploadAvatar({ commit }, formData) {
      const data = await httpServiceProvider.post(
        "/users/upload-avatar",
        formData
      );

      commit("update", {
        key: "users",
        data,
      });
    },

    async detachAvatar({ commit }, id) {
      await httpServiceProvider.post("/users/detach-avatar", id);

      commit("update", {
        key: "users",
        data: { ...id, image: null },
      });
    },

    syncDrawer({ commit }, data) {
      commit("clear", "drawer");
      commit("set", { key: "drawer", data });
    },
  },
};
