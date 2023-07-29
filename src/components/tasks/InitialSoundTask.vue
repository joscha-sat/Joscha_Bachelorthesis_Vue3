<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import correct from '../../assets/sounds/tasks/correct.mp3';
import fail from '../../assets/sounds/tasks/fail.mp3';


import bear from '@/assets/images/tasks/initialSound/bear.png';
import panda from '@/assets/images/tasks/initialSound/panda.png';
import butterfly from '@/assets/images/tasks/initialSound/butterfly.png';
import balloon from '@/assets/images/tasks/initialSound/balloon.png';
import pizza from '@/assets/images/tasks/initialSound/pizza.png';
import pirate from '@/assets/images/tasks/initialSound/pirate.png';
import queen from '@/assets/images/tasks/initialSound/queen.png';
import paint from '@/assets/images/tasks/initialSound/paint.png';
import quiz from '@/assets/images/tasks/initialSound/quiz.png';
import quicksand from '@/assets/images/tasks/initialSound/quicksand.jpg';
import key from '@/assets/images/tasks/initialSound/key.png';
import koala from '@/assets/images/tasks/initialSound/koala.png';
import clown from '@/assets/images/tasks/initialSound/clown.png';
import circle from '@/assets/images/tasks/initialSound/circle.png';
import cinema from '@/assets/images/tasks/initialSound/cinema.png';
import bicycle from '@/assets/images/tasks/initialSound/bicycle.png';
import boat from '@/assets/images/tasks/initialSound/boat.png';
import popcorn from '@/assets/images/tasks/initialSound/popcorn.png';
import puzzle from '@/assets/images/tasks/initialSound/puzzle.png';
import pumpkin from '@/assets/images/tasks/initialSound/pumpkin.png';
import gameboy from '@/assets/images/tasks/initialSound/gameboy.png';
import glue from '@/assets/images/tasks/initialSound/glue.png';
import guitar from '@/assets/images/tasks/initialSound/guitar.png';
import gold from '@/assets/images/tasks/initialSound/gold.png';
import kangaroo from '@/assets/images/tasks/initialSound/kangaroo.png';
import { reactive, ref } from 'vue';
import { useTextToSpeechStore } from '@/stores/TextToSpeech.store';
import TitleWithSound from '@/components/shared/TitleWithSound.vue';
import ImageCard from '@/components/shared/Image-Card.vue';
import router from '@/router';
import { useSoundHelperStore } from '@/stores/SoundHelper.store';


interface Letter {
    id: number;
    letter: string;
}

const images = ref([
    { id: 0, src: bear, text: 'bear', correctLetter: true, showText: false },
    { id: 0, src: panda, text: 'panda', correctLetter: false, showText: false },
    { id: 0, src: butterfly, text: 'butterfly', correctLetter: true, showText: false },
    { id: 0, src: balloon, text: 'balloon', correctLetter: true, showText: false },
    { id: 0, src: pizza, text: 'pizza', correctLetter: false, showText: false },

    { id: 1, src: popcorn, text: 'popcorn', correctLetter: true, showText: false },
    { id: 1, src: boat, text: 'boat', correctLetter: false, showText: false },
    { id: 1, src: bicycle, text: 'bicycle', correctLetter: false, showText: false },
    { id: 1, src: pumpkin, text: 'pumpkin', correctLetter: true, showText: false },
    { id: 1, src: puzzle, text: 'puzzle', correctLetter: true, showText: false },

    { id: 2, src: pirate, text: 'pirate', correctLetter: false, showText: false },
    { id: 2, src: queen, text: 'queen', correctLetter: true, showText: false },
    { id: 2, src: paint, text: 'paint', correctLetter: false, showText: false },
    { id: 2, src: quiz, text: 'quiz', correctLetter: true, showText: false },
    { id: 2, src: quicksand, text: 'quicksand', correctLetter: true, showText: false },

    { id: 3, src: cinema, text: 'cinema', correctLetter: false, showText: false },
    { id: 3, src: clown, text: 'clown', correctLetter: false, showText: false },
    { id: 3, src: key, text: 'key', correctLetter: true, showText: false },
    { id: 3, src: circle, text: 'circle', correctLetter: false, showText: false },
    { id: 3, src: koala, text: 'koala', correctLetter: true, showText: false },

    { id: 4, src: guitar, text: 'guitar', correctLetter: true, showText: false },
    { id: 4, src: kangaroo, text: 'kangaroo', correctLetter: false, showText: false },
    { id: 4, src: glue, text: 'glue', correctLetter: true, showText: false },
    { id: 4, src: gold, text: 'gold', correctLetter: true, showText: false },
    { id: 4, src: gameboy, text: 'gameboy', correctLetter: true, showText: false },
]);

const correctAmount = ref(0);

const letters: Letter[] = reactive([
    { id: 0, letter: 'B / b' },
    { id: 1, letter: 'P / p' },
    { id: 2, letter: 'Q / q' },
    { id: 3, letter: 'K / k' },
    { id: 4, letter: 'G / g' },
]);

const currentCardIndex = ref(0);

const nextCard = () => {

    if (currentCardIndex.value < letters.length - 1) {
        currentCardIndex.value++;
    } else {
        currentCardIndex.value = 0;
    }
    correctAmount.value = 0;
    images.value.forEach((image) => image.showText = false);
};

const speechStore = useTextToSpeechStore();
const soundStore = useSoundHelperStore();

const speak = (txt: string) => {
    speechStore.playVoice(txt);
};

const draggedImage = ref();

const dragStart = (image) => {
    draggedImage.value = image;
};

const allFound = ref(false);

const drop = () => {
    if (!draggedImage.value.showText && draggedImage.value.correctLetter) {
        correctAmount.value += 1;
    }

    draggedImage.value.showText = true;

    if (draggedImage.value.correctLetter) {
        const audio = new Audio(correct);
        audio.play();

        if (currentCardIndex.value <= 2 && correctAmount.value === 3 || currentCardIndex.value === 3 && correctAmount.value === 2 || currentCardIndex.value === 4 && correctAmount.value === 4) {
            soundStore.playSuccess(0.3);
            speechStore.playVoice(`You found all words with the letter ${ letters[currentCardIndex.value].letter.charAt(0) }, bravo!`);
            allFound.value = true;

            setTimeout(() => {
                nextCard();
                allFound.value = false;
            }, 2500);
        }

    } else {
        const audio = new Audio(fail);
        audio.play();
    }
};
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <TitleWithSound title='Drag and drop all images that start with the given letter to the top' />

    <div class='container mt-5'>

        <!--   TOP LETTER CARD     -->
        <div class='slider-container'>

            <v-card :class='{"allFound": allFound}' class='top-card' @drop='drop()' @dragover.prevent>
                <span class='top-letter'>{{ letters[currentCardIndex].letter
                    }}</span>
            </v-card>

            <!--    CURRENT WORD NUMBER / TOTAL NUMBER OF WORDS      -->
            <h3>
                {{ currentCardIndex + 1 }} / {{ letters.length }}
            </h3>
        </div>

        <!--    BOTTOM IMAGE CARDS    -->
        <div class='image-flex'>
            <template v-for='(image, index) in images' :key='index'>
                <ImageCard
                    v-if='image.id === currentCardIndex'
                    :bottom-txt='image.text'
                    :class='{"allFound": image.showText && image.correctLetter, "incorrect": image.showText && !image.correctLetter}'
                    :has-bottom-txt='image.showText'
                    :src='image.src'
                    draggable='true'
                    @clickImg='speak(image.text)'
                    @dragstart='dragStart(image)'
                    @voice='speak(image.text)'
                />
            </template>

        </div>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>

.container {
    display: flex;
    justify-content: center;
    flex-direction: column;

    .slider-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }
}

//minmax(min(max(100% / max-columns – gap, ideal-size), 100%), 1fr)
.image-flex {
    margin-top: 5rem;

    place-content: center;
    place-items: center;

    // Grid with a maximum of 5 columns, no matter the screen width
    display: grid;
    grid-template-columns: repeat(
    auto-fit, minmax(min(max(100% / 5 - 1rem, 15rem), 100%), 1fr)
  );
    gap: 1rem;
}


.top-card {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15rem;
    padding: 2rem;
    word-break: keep-all;

    .top-letter {
        // minimum 7rem, average 13dynamic viewport width, maximum 13rem
        font-size: clamp(7rem, 13dvw, 13rem);
        font-weight: bold;
    }
}

.allFound {
    background-color: #78af78;
}

.incorrect {
    background-color: lightcoral;
}
</style>
