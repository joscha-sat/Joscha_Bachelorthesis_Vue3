import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'home' },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home.view.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.view.vue'),
    },
    {
      path: '/listening',
      name: 'listening',
      component: () => import('../views/tasks/Listening.view.vue'),
    },
    {
      path: '/rhymes',
      name: 'rhymes',
      component: () => import('../views/tasks/Rhymes.view.vue'),
    },
    {
      path: '/sentences_and_words',
      name: 'sentences_and_words',
      component: () => import('../views/tasks/Sentence.view.vue'),
    },
    {
      path: '/syllables',
      name: 'syllables',
      component: () => import('../views/tasks/Syllables.view.vue'),
    },
    {
      path: '/initial_sound',
      name: 'initial_sound',
      component: () => import('../views/tasks/InitialSound.view.vue'),
    },
    {
      path: '/phonemes',
      name: 'phonemes',
      component: () => import('../views/tasks/Phonemes.view.vue'),
    },
  ],
});

export default router;
