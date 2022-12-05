<template>
  <div>
    <v-card>
      <v-card-title>
        <v-container fluid>
          <v-row>
            <v-btn
              text
              outlined
              color="teal accent-10 text"
              class="text-capitalize mr-1"
              @click="openDrawer({})"
            >
              <v-icon>mdi-plus</v-icon>
              Добавить
            </v-btn>

            <v-btn
              v-show="selectedRows.length"
              text
              outlined
              color="red lighten-1"
              class="text-capitalize mr-1"
              @click="handleDeleteUsers()"
            >
              <v-icon>mdi-delete</v-icon> Удалить({{ selectedRows.length }})
            </v-btn>
          </v-row>
        </v-container>
      </v-card-title>

      <v-data-table
        v-model="selectedRows"
        :headers="headers"
        :items="users"
        :items-per-page="15"
        :search="search"
        :custom-filter="filterTable"
        :loading="isLoading"
        show-select
        fixed-header
        height="600px"
        class="elevation-1"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>
              <span class="py-2 d-block"
                >Список сотрудников</span
              ></v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              clearable
              flat
              hide-details
              single-line
              append-icon="mdi-magnify"
              label="Поиск"
              class="mx-4"
            ></v-text-field>
          </v-toolbar>
        </template>

        <template #item.citizenship="{ item }">
          <v-simple-checkbox
            v-model="item.citizenship"
            disabled
          ></v-simple-checkbox>
        </template>

        <template #item.actions="{ item }">
          <v-icon small class="mr-2" color="teal" @click="openDrawer(item)">
            mdi-pencil
          </v-icon>
          <v-icon small color="red" @click="deleteUser(item.id)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>

    <el-drawer
      size="70%"
      direction="ltr"
      :visible.sync="isDrawerVisible"
      @closed="closeDrawer"
    >
      <template #title>
        <span>
          {{ drawerTitle }}
        </span>
      </template>
      <UserDrawer
        ref="UserDrawer"
        @onUserDelete="handleDeleteUsers(true)"
        @onDrawerClose="closeDrawer"
      />
    </el-drawer>
  </div>
</template>

<script>
import userService from "@/services/userService";
import UserDrawer from "@/components/entity/user/UserDrawer";

export default {
  mixins: [userService],

  components: {
    UserDrawer,
  },

  data() {
    return {
      isLoading: false,
      isDrawerVisible: false,
      search: "",
      selectedUser: {},
      selectedRows: [],

      headers: [
        { text: "Id", value: "id" },
        { text: "Фамилия", value: "lastName" },
        { text: "Имя", value: "firstName" },
        { text: "Отчество", value: "patronymic" },
        { text: "Дата рождения", value: "birthday" },
        { text: "Email", value: "email" },
        { text: "Город", value: "city" },
        { text: "Телефон", value: "phone" },
        { text: "Гражданство РФ", value: "citizenship", filterable: false },
        { text: "", value: "actions", sortable: false },
      ],
    };
  },

  async created() {
    try {
      this.isLoading = true;
      await this.findAllUsers();
    } catch (e) {
      this.$onError("Не удалось загрузить список сотрудников");
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  },

  computed: {
    drawerTitle() {
      return _.isEmpty(this.selectedUser)
        ? "Добавление пользователя"
        : `${this.selectedUser.firstName} ${this.selectedUser.lastName}`;
    },
  },

  methods: {
    filterTable(value, search) {
      return (
        value != null &&
        search != null &&
        value.toString().toLowerCase().indexOf(search.toLowerCase()) !== -1
      );
    },

    openDrawer(user) {
      this.selectedUser = user;
      this.$store.dispatch("users/syncDrawer", user);

      if (_.has(this.$refs, "UserDrawer")) this.$refs.UserDrawer.refreshData();

      this.isDrawerVisible = true;
    },

    closeDrawer() {
      this.isDrawerVisible = false;
    },

    async handleDeleteUsers(isEmmitedFromDrawer = false) {
      if (isEmmitedFromDrawer) {
        await this.deleteUser(this.selectedUser.id);

        this.closeDrawer();
        this.$onSuccess();

        return;
      }

      const ids = this.selectedRows.map(({ id }) => id);

      if (ids.length > 5)
        await this.$confirm("Удалить выбранных пользователей ?", {
          confirmButtonText: "да",
          cancelButtonText: "нет",
          type: "warning",
        });

      try {
        this.isLoading = true;

        ids.length == 1
          ? await this.deleteUser(ids[0])
          : await this.deleteUsers(ids);

        this.$onSuccess();
      } catch (e) {
        this.$onError();
        console.error(e);
      } finally {
        this.selectedRows = [];
        this.isLoading = false;
      }
    },
  },
};
</script>
