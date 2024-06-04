<template>
  <v-container class="fill-height">
    <v-responsive class="align-centerfill-height mx-auto" max-width="900">


      <div class="text-center">
        <div class="text-body-2 font-weight-light mb-4">Welcome to</div>

        <h1 class="text-h2 font-weight-bold">kenzee90 Github repositories</h1>
      </div>

      <div class="py-4" />

      <v-row>
        <v-col cols="12">
          <v-card class="py-4" color="surface-variant" rounded="lg" variant="outlined">


            <template #title>
              <h2 class="text-h5 font-weight-bold mb-5">Search:</h2>
            </template>

            <template #subtitle>
              <v-text-field v-model="searchQuery" label="Search Repositories" variant="outlined" class="py-3"
                clearable />
            </template>

            <!-- <v-overlay
              opacity=".12"
              scrim="primary"
              contained
              model-value
              persistent
            /> -->
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="repos.length > 0">
        <v-col cols="6" v-for="repo in filteredRepos.slice((currentPage - 1) * perPage, (currentPage - 1) * perPage + perPage)" :key="repo.id">
          <v-card class="py-4" color="primary" rounded="lg" variant="outlined" hover>
            <v-card-title>{{ repo.name }}</v-card-title>
            <v-card-text>
              <p>{{ repo.description }}</p> 
              <v-chip @click="showRepo(repo)" elevated>
                {{ repo.html_url }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
     <v-pagination v-if="filteredRepos.length > 0" :length="pageCount" v-model="currentPage" @input="updatePaginatedRepos" />
    <v-alert v-else type="info">No Repositories Found</v-alert>
      

    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted  } from 'vue';
import { useRouter } from 'vue-router'
const repos = ref([]);
const router = useRouter(); // Inject the router instance
const searchQuery = ref("");
const currentPage = ref(1);
const perPage = ref(6); // Adjust per page count as needed

const getRepos = async () => {
  try {
    const response = await fetch(
      `https://api.github.com/users/kenzee90/repos`
    );
    repos.value = await response.json();
  } catch (error) {
    console.error(error);
    // Handle error (e.g., display an error message to the user)
  }
};
const showRepo = (repo) => {
      // Navigate to the single repository page (implementation depends on your router)
      router.push({ path: '/repo', query: { name: repo.name, owner: 'kenzee90', html_url: repo.html_url, description: repo.description} });
    };
const filteredRepos = computed(() =>
  repos.value.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);
const paginatedRepos = computed(() =>{
const start = (currentPage.value - 1) * perPage.value;
const end = start * perPage.value;
return filteredRepos.value.slice(start, end);
});
const updatePaginatedRepos = () => {
  this.paginatedRepos = this.filteredRepos.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
}
const pageCount = computed(() => Math.ceil(filteredRepos.value.length / perPage.value));
const totalRepos = computed(() => filteredRepos.value.length);
onMounted(async () => {

  await getRepos();
});
//
</script>
