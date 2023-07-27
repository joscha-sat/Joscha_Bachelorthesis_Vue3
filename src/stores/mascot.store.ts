import { defineStore } from 'pinia';

import happyCat from '../assets/images/cat/happyCat.png';
import sadCat from '../assets/images/cat/sadCat.png';

import happyDog from '../assets/images/dog/happyDog.png';
import sadDog from '../assets/images/dog/sadDog.png';

export const useMascotStore = defineStore('mascot', {
    state: () => ({
        isDog: true,
        happyCatImg: happyCat,
        sadCatImg: sadCat,
        happyDogImg: happyDog,
        sadDogImg: sadDog,
    }),

    // GETTER -------------------------------------------------------------------- //>
    getters: {
        getIsDog: (state) => state.isDog,
    },

    // ACTIONS ------------------------------------------------------------------- //>
    actions: {},
});
