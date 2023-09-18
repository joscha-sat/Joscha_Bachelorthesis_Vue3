<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import rainSound from '../../assets/sounds/tasks/listening/rain.mp3';
import carSound from '../../assets/sounds/tasks/listening/car.mp3';
import hammerSound from '../../assets/sounds/tasks/listening/hammer.mp3';
import elephantSound from '../../assets/sounds/tasks/listening/elephant.mp3';
import pingpongSound from '../../assets/sounds/tasks/listening/pingpong.mp3';

import rainImage from '../../assets/images/tasks/listening/rain.jpg';
import windImage from '../../assets/images/tasks/listening/wind.jpg';
import fireImage from '../../assets/images/tasks/listening/fire.png';

import carImg from '../../assets/images/tasks/listening/car.png';
import airplaneImg from '../../assets/images/tasks/listening/airplane.png';
import shipImg from '../../assets/images/tasks/listening/ship.png';

import hammerImg from '../../assets/images/tasks/listening/hammer.png';
import scissorImg from '../../assets/images/tasks/listening/scissors.png';
import sawImg from '../../assets/images/tasks/listening/saw.png';

import lionImg from '../../assets/images/tasks/listening/lion.png';
import horseImg from '../../assets/images/tasks/listening/horse.png';
import elephantImg from '../../assets/images/tasks/listening/elephant.png';

import tabletennisImg from '../../assets/images/tasks/listening/table-tennis.png';
import tennisImg from '../../assets/images/tasks/listening/tennis.png';
import badmintonImg from '../../assets/images/tasks/listening/badminton.png';

import success from '../../assets/sounds/tasks/success.mp3';
import fail from '../../assets/sounds/tasks/fail.mp3';
import { useSoundHelperStore } from '@/stores/SoundHelper.store';
import router from '@/router';
import ListeningAnswer from '@/classes/ListeningAnswer.class';
import { onMounted, ref, Ref } from 'vue';
import { useTextToSpeechStore } from '@/stores/TextToSpeech.store';
import { storeToRefs } from 'pinia';
import TitleWithSound from '@/components/shared/TitleWithSound.vue';
import ListeningPlaySound from '@/components/shared/ListeningPlaySound.vue';
import ImageCard from '@/components/shared/Image-Card.vue';


const speechStore = useTextToSpeechStore();
const sounds = ref([rainSound, carSound, hammerSound, elephantSound, pingpongSound]);
const currentIndex = ref(0);

const answers: Ref<ListeningAnswer[]> = ref([
    { id: 0, src: rainImage, title: 'rain', correct: true, clicked: false },
    { id: 0, src: windImage, title: 'wind', correct: false, clicked: false },
    { id: 0, src: fireImage, title: 'fire', correct: false, clicked: false },

    { id: 1, src: airplaneImg, title: 'airplane', correct: false, clicked: false },
    { id: 1, src: shipImg, title: 'ship', correct: false, clicked: false },
    { id: 1, src: carImg, title: 'car', correct: true, clicked: false },

    { id: 2, src: hammerImg, title: 'hammer', correct: true, clicked: false },
    { id: 2, src: sawImg, title: 'saw', correct: false, clicked: false },
    { id: 2, src: scissorImg, title: 'scissor', correct: false, clicked: false },

    { id: 3, src: lionImg, title: 'lion', correct: false, clicked: false },
    { id: 3, src: elephantImg, title: 'elephant', correct: true, clicked: false },
    { id: 3, src: horseImg, title: 'horse', correct: false, clicked: false },

    { id: 4, src: tennisImg, title: 'tennis', correct: false, clicked: false },
    { id: 4, src: badmintonImg, title: 'badminton', correct: false, clicked: false },
    { id: 4, src: tabletennisImg, title: 'table-tennis', correct: true, clicked: false },
]);


const clickImage = (clickedItem) => {
    const audio = ref();
    clickedItem.clicked = true;

    if (clickedItem.correct) {
        audio.value = new Audio(success);
        audio.value.play();
        soundStore.stopEnteredSound();
        if (currentIndex.value < answers.value.length / 3 - 1) {
            setTimeout(() => {
                nextSound();
                soundStore.playSound(sounds.value[currentIndex.value]);
            }, 3500);
        } else {
            nextSound();
            router.push({
                path: '/finished',
            });
        }

    } else {
        audio.value = new Audio(fail);
        audio.value.play();
        setTimeout(() => {
            soundStore.playSound(sounds.value[currentIndex.value]);
        }, 2500);
    }
};

const nextSound = () => {
    if (currentIndex.value < answers.value.length / 3 - 1) {
        currentIndex.value++;
        isPlayedOnce.value = false;
    } else {
        currentIndex.value = 0;
        isPlayedOnce.value = false;
    }

    localStorage.setItem('listeningIndex', currentIndex.value.toString());
};

const soundStore = useSoundHelperStore();
const { isPlayedOnce } = storeToRefs(soundStore);

onMounted(() => {
    isPlayedOnce.value = false;
    const storageIndex = ref(localStorage.getItem('listeningIndex'));
    if (storageIndex.value)
        currentIndex.value = Number(storageIndex.value);


});

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class='sound-container'>

        <h3>
            Remaining duration: {{ soundStore.formatDuration() }}
        </h3>

        <!--  SOUND TO PLAY  -->
        <ListeningPlaySound :sound-src='sounds[currentIndex]' />

        <h3>
            {{ currentIndex + 1 }} / {{ answers.length / 3 }}
        </h3>

    </div>

    <!--  TEXT WHAT TO DO  -->
    <TitleWithSound title='Listen to the sound, then select what you have heard!' />

    <template v-if='isPlayedOnce'>
        <!-- ANSWERS -->
        <div class='container'>
            <template v-for='(item, i) in answers' :key='i'>
                <ImageCard
                    v-if='item.id === currentIndex'
                    :bottom-txt='item.title'
                    :class='{"incorrect": item.clicked && !item.correct}'
                    :src='item.src'
                    has-bottom-txt
                    @clickImg='clickImage(item)'
                    @voice='speechStore.playVoice(item.title)'
                />
            </template>
        </div>
    </template>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
.container {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    gap: 1.5rem;

}

.sound-container {
    display: flex;
    align-items: center;
}

h1 {
    text-align: center;
    margin-block: 2rem;
}

.incorrect {
    background-color: lightcoral;
}
</style>
