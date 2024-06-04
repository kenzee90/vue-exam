
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import SingleRepo from '@/components/SingleRepo.vue';

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
  },
  {
    path: '/repo',
    component: SingleRepo,
    props: (route) => ({
      repo: {
        // Access repository details from query parameters
        name: route.query.name,
        owner: route.query.owner,
        html_url: route.query.html_url,
        description: route.query.description,
        // Add other required properties from your API response
      }
    }),
  },
    {
      path: '/:NotFound',
      component: () => import('@/pages/404NotFoundPage.vue'),
    }
  // ... other routes
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
