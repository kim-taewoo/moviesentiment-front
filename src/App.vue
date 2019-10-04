<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="text-uppercase">
        <span class="mr-2">Senti</span>
        <span class="font-weight-light">Classifier</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text href="https://github.com/kim-taewoo?tab=repositories" target="_blank">
        <span class="mr-2">Source Code</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  data: () => ({
    //
  })
};
</script>
