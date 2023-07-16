<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import happyDog from '@/assets/images/dog/happyDog.png';
import happyCat from '@/assets/images/cat/happyCat.png';
import bark from '../assets/sounds/dog/bark.mp3';
import meow from '../assets/sounds/cat/meow.mp3';

import { useMascotStore } from "@/stores/mascot.store";
import TitleWithSound from "@/components/shared/TitleWithSound.vue";
import SelectTask from "@/components/main-menu/Select-Task.vue";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const audioRef = ref<HTMLAudioElement>();

const mascotStore = useMascotStore();
const { isDog } = storeToRefs(mascotStore)

const playSound = () => {
    audioRef.value.play()
}

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <TitleWithSound title="Hello and welcome to listen, play, learn! Choose a task"/>

    <div class="container">
        <div class="left"></div>

        <div class="content">
            <SelectTask/>
        </div>

        <div class="right">
            <img :src="isDog? happyDog : happyCat" alt="mascot" class="image" style="cursor: pointer"
                 @click="playSound">
            <audio ref="audioRef" :src="isDog? bark : meow"></audio>
        </div>
    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
}

.left {
    flex-basis: 10%;
}

.content {
    flex-basis: 55%;
    display: flex;
    justify-content: center;

}

.right {
    flex-basis: 25%;
    display: flex;
    justify-content: flex-end;
}

.image {
    height: 450px;

    object-fit: contain;
}
</style>



