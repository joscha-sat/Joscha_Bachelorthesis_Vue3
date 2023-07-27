import { defineStore } from 'pinia';

import happyCat from '../assets/images/cat/happyCat.png';
import sadCat from '../assets/images/cat/sadCat.png';

import happyDog from '../assets/images/dog/happyDog.png';
import sadDog from '../assets/images/dog/sadDog.png';

import bark from '../assets/sounds/dog/bark.mp3';
import meow from '../assets/sounds/cat/meow.mp3';

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
    actions: {
        playMascotSound() {
            if (this.isDog) {
                const audio = new Audio(bark);
                audio.play().then();
            }
            if (!this.isDog) {
                const audio = new Audio(meow);
                audio.play().then();
            }
        },
    },
});
