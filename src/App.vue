<template>
    <v-app>
        <v-app-bar :elevation='2' color='primary'>

            <template #prepend>
                <!-- HOME -->
                <v-tooltip location='bottom' text='Home'>
                    <template v-slot:activator='{ props }'>
                        <v-btn :to='"/home"' class='myBtnBorder' icon='mdi-home' v-bind='props' variant='plain'></v-btn>
                    </template>
                </v-tooltip>
            </template>

            <template #append>
                <!-- SETTINGS -->
                <v-tooltip location='bottom' text='Settings'>
                    <template v-slot:activator='{ props }'>
                        <v-btn :to='"/settings"' class='myBtnBorder' icon='mdi-cog' v-bind='props'
                               variant='plain'></v-btn>
                    </template>
                </v-tooltip>

                <!-- THEME -->
                <v-tooltip location='bottom' text='Change Theme'>
                    <template v-slot:activator='{ props }'>
                        <v-btn class='myBtnBorder' icon='mdi-theme-light-dark' style='margin-left: 1rem' v-bind='props'
                               variant='plain'
                               @click='toggleTheme()'></v-btn>
                    </template>
                </v-tooltip>

                <!-- MASCOT -->
                <v-tooltip location='bottom' text='Change companion'>
                    <template v-slot:activator='{ props }'>
                        <v-btn :icon=' isDog ? "mdi-cat" : "mdi-dog"' class='myBtnBorder' style='margin-left: 1rem'
                               v-bind='props' variant='plain'
                               @click='toggleMascot()'>
                        </v-btn>
                    </template>
                </v-tooltip>
            </template>
        </v-app-bar>
        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script lang='ts' setup>
import { useTheme } from 'vuetify';
import { useTextToSpeechStore } from '@/stores/TextToSpeech.store';
import { storeToRefs } from 'pinia';
import { useMascotStore } from '@/stores/mascot.store';
import { onMounted } from 'vue';
import { useOnLoadHelperStore } from '@/stores/OnLoadHelper.store';

const theme = useTheme();
const initialLoadingHelperStore = useOnLoadHelperStore();
const speechStore = useTextToSpeechStore();

const mascotStore = useMascotStore();
const { isDog } = storeToRefs(mascotStore);


const toggleTheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
    localStorage.setItem('mode', theme.global.name.value);
};

const toggleMascot = () => {
    isDog.value = !isDog.value;
    localStorage.setItem('mascot', isDog.value ? 'dog' : 'cat');
};

onMounted(() => {
    // set primary color on load --> from old session (localStorage)
    initialLoadingHelperStore.setPrimaryColor();

    // set font size on load from --> old session (localStorage)
    initialLoadingHelperStore.setFontSize();

    // set font family on load --> from old session (localStorage)
    initialLoadingHelperStore.setFontFamily();

    // set theme mode on load --> from old session (localStorage)
    initialLoadingHelperStore.setThemeMode();

    // set mascot on load --> from old session (localStorage)
    initialLoadingHelperStore.setMascot();

    // set voices
    speechStore.onMounted();
});
</script>

<style lang='scss'>
@use "style" as *;

.myBtnBorder {
    border: 1px solid #e1e1e1 !important;
}
</style>


