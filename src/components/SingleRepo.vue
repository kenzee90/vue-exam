<template>
  <div class="flex justify-center align-center">
    
  <v-card v-if="repo" variant="outlined" class="mx-auto my-20" max-width="400">
    <v-card-title class="max-auto">{{ repo.name }}</v-card-title>
    <v-card-text>
      <p>{{ repo.description }}</p>
      <v-chip x-link="{ href: repo.html_url, target: '_blank' }">
        {{ repo.html_url }}
      </v-chip>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="$router.go(-1)">go back</v-btn>
    
    </v-card-actions>
  </v-card>
  <v-alert v-else type="info">No repository selected.</v-alert>
</div>
</template>

<script>
export default {
  props: {
    repo: Object,
  },
};
</script>

<style scoped>
/* Add specific styles for the single repository page */
</style>
