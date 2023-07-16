import { defineStore } from 'pinia';

export const useDialogHelperStore = defineStore('dialogHelper', {
    state: () => ({
        visible: false,
    }),

    // GETTER -------------------------------------------------------------------- //>
    getters: {},

    // ACTIONS ------------------------------------------------------------------- //>
    actions: {
        openDialog() {
            this.visible = true;
        },

        closeDialog() {
            this.visible = false;
        },
    },
});
