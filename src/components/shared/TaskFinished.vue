<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>

import { useMascotStore } from '@/stores/mascot.store';
import { storeToRefs } from 'pinia';
import { useTextToSpeechStore } from '@/stores/TextToSpeech.store';
import { onMounted } from 'vue';

const mascotStore = useMascotStore();
const { happyDogImg, happyCatImg, isDog } = storeToRefs(mascotStore);

const speechStore = useTextToSpeechStore();

onMounted(() => {
    speechStore.playVoice(txt);
    mascotStore.playMascotSound();
});

const txt = 'Congratulations, you finished this task successfully, bravo!';
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class='container'>
        <v-img :src='isDog? happyDogImg : happyCatImg' height='50dvh' width='50dvw'></v-img>

        <span class='text'>
        {{ txt }}
        </span>

        <v-btn :to='"/home"' color='primary'>
            back to home
        </v-btn>

    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
.container {
    display: flex;
    flex-direction: column;
    place-content: center;
    place-items: center;
    gap: 2rem;

    .text {
        font-size: clamp(1rem, 13dvw, 2.5rem);
        word-break: keep-all;
    }
}
</style>
