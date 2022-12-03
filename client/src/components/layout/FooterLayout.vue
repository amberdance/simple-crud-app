<template>
  <v-footer app class="teal lighten-1" :elevation="10">
    <div class="footer_content">{{ currentYear }} - {{ APP_TITLE }}</div>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      APP_TITLE: process.env.VUE_APP_TITLE,
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer_content {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  font-weight: bold;
  color: #ffffff;
  padding: 0.7rem 0;
}
</style>
