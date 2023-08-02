<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import { useSpeechSynthesis } from '@vueuse/core';
import clap from '../../assets/sounds/tasks/clap.mp3';
import Syllable from '@/classes/Syllable.class';

import banana from '../../assets/images/tasks/syllables/banana.png';
import caterpillar from '../../assets/images/tasks/syllables/caterpillar.png';
import dog from '../../assets/images/tasks/syllables/dog.png';
import happy from '../../assets/images/tasks/syllables/happy.png';
import sun from '../../assets/images/tasks/syllables/sun.png';
import { useTextToSpeechStore } from '@/stores/TextToSpeech.store';

import { onMounted, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import TitleWithSound from '@/components/shared/TitleWithSound.vue';
import ImageCard from '@/components/shared/Image-Card.vue';
import { useSoundHelperStore } from '@/stores/SoundHelper.store';
import MascotFeedback from '@/components/shared/MascotFeedback.vue';

const syllables: Syllable[] = reactive([
    { id: 0, syllables: 3, word: 'Banana', src: banana },
    { id: 1, syllables: 2, word: 'Happy', src: happy },
    { id: 2, syllables: 1, word: 'Dog', src: dog },
    { id: 3, syllables: 2, word: 'Sunshine', src: sun },
    { id: 4, syllables: 4, word: 'Caterpillar', src: caterpillar },
]);


const speechStore = useTextToSpeechStore();
const { speech, voice } = storeToRefs(speechStore);

const soundStore = useSoundHelperStore();

const audio = ref();
const maxRepetitions = ref(3);
let playCount = 0;

const enteredSyllableNumber = ref(null);
const answerCorrect = ref(null);

const checkAnswer = () => {
    answerCorrect.value = Number(enteredSyllableNumber.value) === syllables[currentCard.value].syllables;

    if (enteredSyllableNumber.value !== null) {
        amountOfTries.value += 1;
    }

    if (answerCorrect.value) {
        soundStore.playSuccess(0.3);
        speechStore.playVoice(`Great! ${ syllables[currentCard.value].word } has ${ syllables[currentCard.value].syllables } syllables!`);

        setTimeout(() => {
            nextCard();
            answerCorrect.value = null;
        }, 4000);

    } else if (!answerCorrect.value && enteredSyllableNumber.value) {
        soundStore.playFail(0.3);
    }
};

const playAudio = () => {
    maxRepetitions.value = syllables[currentCard.value].syllables;

    audio.value = new Audio(clap);
    setTimeout(() => {
        audio.value.volume = 0.3;
        audio.value.play();
    }, 300);
    audio.value.addEventListener('ended', restartAudio);
};

const restartAudio = () => {
    playCount++;
    if (playCount < maxRepetitions.value) {
        audio.value.currentTime = 0;
        audio.value.volume = 0.3;
        audio.value.play();
    } else {
        audio.value.removeEventListener('ended', restartAudio);
        playCount = 0;
    }
};

const speak = async (text) => {
    playAudio();
    speech.value = useSpeechSynthesis(text, { voice, rate: 0.1 });
    speech.value.speak();
};

const currentCard = ref(0);

const nextCard = () => {
    if (currentCard.value < syllables.length - 1) {
        currentCard.value++;
    } else {
        currentCard.value = 0;
    }
    enteredSyllableNumber.value = null;
    amountOfTries.value = 0;
    localStorage.setItem('syllablesIndex', currentCard.value.toString());
};

const previousCard = () => {
    if (currentCard.value > 0) {
        currentCard.value--;
    } else {
        currentCard.value = syllables.length - 1;
    }
    enteredSyllableNumber.value = null;
    amountOfTries.value = 0;
    localStorage.setItem('syllablesIndex', currentCard.value.toString());
};

const amountOfTries = ref(0);

onMounted(() => {
    const storageIndex = ref(localStorage.getItem('syllablesIndex'));
    if (storageIndex.value)
        currentCard.value = Number(storageIndex.value);
});

</script>


<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class='allContainer'>

        <!--    MASCOT    -->
        <div style='display: flex; align-items: center'>
            <MascotFeedback :correct-boolean='answerCorrect' :show-boolean='answerCorrect !== null' />
        </div>

        <!--   CONTENT     -->
        <div class='container'>

            <TitleWithSound title='How many syllables does the word have?' />

            <div class='slider-container'>
                <v-btn :icon="'mdi-arrow-left-thick'" color='primary' @click='previousCard()'></v-btn>

                <ImageCard
                    v-if='currentCard !== null'
                    :bottom-txt='syllables[currentCard].word'
                    :class='{"input-correct": answerCorrect}'
                    :src='syllables[currentCard].src'
                    has-bottom-txt
                    @clickImg='speak(syllables[currentCard].word)'
                    @voice='speak(syllables[currentCard].word)'
                />

                <v-btn :icon="'mdi-arrow-right-thick'" color='primary' @click='nextCard()'></v-btn>

                <!--    CURRENT WORD NUMBER / TOTAL NUMBER OF WORDS      -->
                <h3>
                    {{ currentCard + 1 }} / {{ syllables.length }}
                </h3>
            </div>

            <div class='input_btn'>
                <!--   NUMBER OF SYLLABLES INPUT     -->
                <v-text-field
                    v-model='enteredSyllableNumber'
                    :class="{'input-correct:': answerCorrect}"
                    class='mt-8 input'
                    placeholder='Enter the number of syllables!'
                    type='number'
                >
                </v-text-field>

                <v-btn color='primary' @click='checkAnswer'>
                    check my answer
                </v-btn>

                <div v-if='currentCard === 0 && amountOfTries >= 2' class='hint' style='margin-top: 1rem'>
                    hint: Ba - na - na
                </div>

                <div v-if='currentCard === 1 && amountOfTries >= 2' class='hint' style='margin-top: 1rem'>
                    hint: Hap - py
                </div>

                <div v-if='currentCard === 2 && amountOfTries >= 2' class='hint' style='margin-top: 1rem'>
                    hint: Dog
                </div>

                <div v-if='currentCard === 3 && amountOfTries >= 2' class='hint' style='margin-top: 1rem'>
                    hint: Sun - shine
                </div>

                <div v-if='currentCard === 4 && amountOfTries >= 2' class='hint' style='margin-top: 1rem'>
                    hint: Ca - ter - pil - lar
                </div>

            </div>
        </div>

    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>

.allContainer {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
}

.container {
    width: min(60rem, 100%);
    margin: auto;

    .slider-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .input_btn {
        margin: auto;
        width: min(40rem, 100%);
    }

    .input-correct {
        background-color: #78af78;
    }
}

.hint {
    font-size: 1.5rem;
}
</style>
