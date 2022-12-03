<template>
  <v-card outlined>
    <v-card-title>
      <v-spacer></v-spacer>
      <div class="text-right">График продаж за неделю</div>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-sparkline
        :value="values"
        :smooth="1"
        :padding="4"
        :line-width="10"
        :label-size="4"
      >
        <template v-slot:label="item">{{ item.value }} руб.</template>
      </v-sparkline>
    </v-card-text>

    <v-divider></v-divider>
  </v-card>
</template>

<script>
import { getRandomNumber } from "@/utils/common";

export default {
  data() {
    return {
      values: [],
    };
  },

  mounted() {
    for (let i = 0; i < 7; i++) this.values.push(getRandomNumber(900, 9999));
  },
};
</script>
