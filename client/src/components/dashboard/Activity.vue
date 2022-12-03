<template>
  <v-card outlined>
    <v-card-title>
      <span>{{ title }}</span>
      <v-spacer></v-spacer>

      <v-card-actions>
        <v-btn class="ma-2" icon color="teal lighten-10" @click="setLike">
          <span>{{ likes }}</span>
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>

        <v-btn class="ma-2" text icon color="red lighten-2" @click="setDislike">
          <span>{{ dislikes }}</span>
          <v-icon>mdi-thumb-down</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-sparkline
        :value="chartData"
        :smooth="10"
        :padding="8"
        :line-width="1"
        :color="color"
        auto-draw
      ></v-sparkline>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="teal accent-10 text"
        class="text-capitalize"
        @click="seedValues()"
        >Randomize</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { getRandomNumber, getRandomHexColor } from "@/utils/common";

export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      values: [],
      color: "primary",
      likesCount: getRandomNumber(1, 666),
      dislikesCount: 0,
    };
  },

  computed: {
    chartData() {
      return this.values;
    },

    likes() {
      return this.likesCount;
    },

    dislikes() {
      return this.dislikesCount;
    },
  },

  created() {
    this.seedValues();
  },

  methods: {
    seedValues(bound = 30) {
      this.values = [];

      for (let i = 0; i < bound; i++) this.values.push(getRandomNumber());

      this.color = getRandomHexColor();
    },

    setLike() {
      ++this.likesCount;
    },

    setDislike() {
      --this.dislikesCount;
    },
  },
};
</script>
