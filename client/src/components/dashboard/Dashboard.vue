<template>
  <v-container fluid class="ma-1">
    <v-row>
      <v-col cols="12" sm="12" lg="6" class="pl-0 pr-2">
        <Activity title="Твоя активность за сегодня" />
      </v-col>

      <v-col cols="12" sm="12" lg="6" class="pl-0 pr-2">
        <Activity title="Активность твоего коллеги" />
      </v-col>

      <v-col cols="12" sm="12" lg="12" class="pl-0 pr-2">
        <Sales />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Activity from "./Activity";
import Sales from "./Sales";

export default {
  components: {
    Activity,
    Sales,
  },
};
</script>
