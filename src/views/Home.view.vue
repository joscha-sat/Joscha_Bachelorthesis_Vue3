<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import happyDog from '@/assets/images/dog/happyDog.png';
import happyCat from '@/assets/images/cat/happyCat.png';
import bark from '../assets/sounds/dog/bark.mp3';
import meow from '../assets/sounds/cat/meow.mp3';

import { useMascotStore } from '@/stores/mascot.store';
import TitleWithSound from '@/components/shared/TitleWithSound.vue';
import SelectTask from '@/components/main-menu/Select-Task.vue';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const audioRef = ref<HTMLAudioElement>();

const mascotStore = useMascotStore();
const { isDog } = storeToRefs(mascotStore);

const playSound = () => {
    if (audioRef.value)
        audioRef.value.play();
};

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <TitleWithSound style='padding: 1.5rem' title='Hello and welcome to listen, play, learn! Choose a task' />

    <div class='container'>
        <div class='left'></div>

        <div class='content'>
            <SelectTask />
        </div>

        <div class='right'>
            <img :src='isDog? happyDog : happyCat' alt='mascot' class='image' style='cursor: pointer'
                 @click='playSound'>
            <audio ref='audioRef' :src='isDog? bark : meow'></audio>
        </div>
    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
.container {
    display: flex;
    place-content: center;
    place-items: start;
    gap: 1rem;
    margin-top: 1.5rem;
}


.content {
    display: flex;
    justify-content: center;
    margin-left: 15rem;
}

.right {
    display: flex;
    justify-content: flex-end;
    max-width: 350px;
}

.image {
    height: 450px;
    object-fit: contain;
}

@media screen and (max-width: 1796px) {
    .right {
        display: none;
    }
    .content {
        margin-left: 0;
    }
}

</style>
