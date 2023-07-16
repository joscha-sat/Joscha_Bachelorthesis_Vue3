import { defineStore } from 'pinia';

export const useMascotStore = defineStore('mascot', {
    state: () => ({
        isDog: true,
    }),

    // GETTER -------------------------------------------------------------------- //>
    getters: {
        getIsDog: (state) => state.isDog,
    },

    // ACTIONS ------------------------------------------------------------------- //>
    actions: {},
});
