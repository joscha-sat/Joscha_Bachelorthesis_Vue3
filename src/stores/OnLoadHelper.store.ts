import { defineStore, storeToRefs } from 'pinia';
import { useTheme } from 'vuetify';
import { useMascotStore } from '@/stores/mascot.store';
import { ref } from 'vue';

export const useOnLoadHelperStore = defineStore('onLoadHelper', () => {
    // STATE ------------------------------------------------------------------------------------------ |>
    const theme = useTheme();
    const canSee = ref(true);

    // GETTER | COMPUTED ------------------------------------------------------------------------------ |>

    // ACTIONS | FUNCTIONS ---------------------------------------------------------------------------- |>

    const setPrimaryColor = () => {
        const color = localStorage.getItem('primary-color');
        if (color) {
            theme.themes.value.light.colors.primary = color;
            theme.themes.value.dark.colors.primary = color;
        }
    };

    const setFontSize = () => {
        const fontSize = localStorage.getItem('fontSize');
        if (fontSize) document.body.style.fontSize = `${fontSize}px`;
    };

    const setFontFamily = () => {
        const fontFamily = localStorage.getItem('font-family');
        if (fontFamily) document.body.setAttribute('data-font-family', fontFamily.toLowerCase());
    };

    const setThemeMode = () => {
        const selectedTheme = localStorage.getItem('mode');
        if (selectedTheme && selectedTheme === 'light') {
            theme.global.name.value = 'light';
        } else if (selectedTheme && selectedTheme === 'dark') {
            theme.global.name.value = 'dark';
        }
    };

    const setMascot = () => {
        const mascotStore = useMascotStore();
        const { isDog } = storeToRefs(mascotStore);
        const selectedMascot = localStorage.getItem('mascot');
        if (selectedMascot === 'dog') {
            isDog.value = true;
        } else if (selectedMascot === 'cat') {
            isDog.value = false;
        }
    };

    // RETURN --------------------------------------------------------------------------------------- |>
    return { setPrimaryColor, setFontSize, setFontFamily, setThemeMode, setMascot, canSee };
});
