<template>
  <v-app>
    <NavigationLayout />
    <MainLayout />
    <FooterLayout />
  </v-app>
</template>

<script>
import NavigationLayout from "@/components/layout/NavigationLayout";
import MainLayout from "@/components/layout/MainLayout";
import FooterLayout from "@/components/layout/FooterLayout";

export default {
  components: {
    NavigationLayout,
    FooterLayout,
    MainLayout,
  },
};
</script>
