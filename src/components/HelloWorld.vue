<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="indigo darken-1" dark flat>
            <v-toolbar-title>REVIEW ANALYZER</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                label="Review"
                name="review"
                prepend-icon="mdi-pencil-plus-outline"
                type="text"
                v-model="review"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card v-if="hasResult">
            <v-card-text>
              위 문장은
              <strong :class="sentimentColor">{{result.probability}}%</strong>
              의 확률로
              <strong
                :class="sentimentColor"
              >{{result.sentiment == "1" ? "긍정" : "부정"}}</strong>적인 평가를 하고 있습니다.
            </v-card-text>
          </v-card>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn :to="'reviews'">LIST</v-btn>
            <v-btn
              :loading="loading"
              :disabled="loading"
              @click="analyze"
              color="indigo darken-1"
            >ANALYZE</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      review: "",
      result: "",
      loadStatus: false
    };
  },
  computed: {
    loading() {
      return this.loadStatus;
    },
    hasResult() {
      return this.result;
    },
    sentimentColor() {
      return {
        "red--text text--lighten-1": this.result.sentiment == "1",
        "blue--text text--lighten-1": this.result.sentiment == "0"
      };
    }
  },
  methods: {
    onSubmit() {
      this.analyze();
    },
    analyze() {
      this.loadStatus = true;
      const baseURI = "https://senti-classifier-backend.herokuapp.com";
      axios
        .post(`${baseURI}/item/${this.review}`, {
          review: this.review
        })
        .then(response => {
          console.log(response);
          this.result = response.data;
          this.loadStatus = false;
        })
        .catch(error => {
          console.log(error);
          this.loadStatus = false;
        });
    }
  }
};
</script>
