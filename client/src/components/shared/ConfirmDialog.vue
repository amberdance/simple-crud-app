<template>
  <v-dialog v-model="isActive" max-width="450">
    <v-card>
      <v-card-title>
        {{ title }}
      </v-card-title>

      <v-card-text v-if="description">
        {{ description }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="onSuccess">Да</v-btn>
        <v-btn color="red darken-1" text @click="onCancel">Нет</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default: "Вы уверены ?",
    },

    description: {
      type: String,
      required: false,
    },
  },

  data() {
    return {
      isActive: false,
    };
  },

  methods: {
    show() {
      this.isActive = true;
    },

    close() {
      this.isActive = false;
    },

    onSuccess() {
      this.isActive = false;
      this.$emit("onDialogConfirm");
    },

    onCancel() {
      this.isActive = false;
      this.$emit("onDialogClose");
    },
  },
};
</script>
