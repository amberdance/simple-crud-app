<template>
  <div>
    <v-app-bar color="teal lighten-1" app dark clipped-right>
      <v-toolbar-title>{{ APP_TITLE }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click="isDrawerVisible = !isDrawerVisible"
      ></v-app-bar-nav-icon>
    </v-app-bar>

    <v-navigation-drawer
      v-model="isDrawerVisible"
      app
      fixed
      floating
      hide-overlay
      light
      temporary
      right
    >
      <v-list nav dense>
        <v-list-item-group>
          <v-list-item
            v-for="(item, i) in NAVIGATION_MENU"
            :key="i"
            :to="item.to"
            dense
            color="teal lighten-1"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon ?? "mdi-view-dashboard" }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { NAVIGATION_MENU } from "@/values";

export default {
  data() {
    return {
      APP_TITLE: process.env.VUE_APP_TITLE,
      NAVIGATION_MENU: NAVIGATION_MENU,
      isDrawerVisible: false,
    };
  },
};
</script>
