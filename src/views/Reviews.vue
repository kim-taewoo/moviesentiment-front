<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="10" md="6">
        <v-card class="elevation-12">
          <v-toolbar color="indigo darken-1" dark flat>
            <v-toolbar-title>REVIEWS</v-toolbar-title>
            <div class="flex-grow-1"></div>
          </v-toolbar>
          <v-card-text v-if="hasResult">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">리뷰</th>
                    <th class="text-left">감정</th>
                    <th class="text-left">확률(%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in result" :key="item.name">
                    <td>{{ item.review }}</td>
                    <td>{{ item.sentiment=="1"?"긍정":"부정" }}</td>
                    <td>{{ item.probability }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-text v-else>No reviews</v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn :to="'/'" color="indigo darken-1">Classifier</v-btn>
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
      result: ""
    };
  },
  computed: {
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
  created() {
    this.getReviews();
  },
  methods: {
    getReviews() {
      const baseURI = "https://senti-classifier-backend.herokuapp.com/";
      axios
        .get(`${baseURI}/items`)
        .then(response => {
          console.log(response.data);
          this.result = response.data["items"];
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
