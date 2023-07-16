<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import WordsService from '@/api/Words.service';
import mouseSrc from '@/assets/images/tasks/rhymes/mouse.png';
import ballSrc from '@/assets/images/tasks/rhymes/ball.png';
import treeSrc from '@/assets/images/tasks/rhymes/tree.png';
import sunSrc from '@/assets/images/tasks/rhymes/sun.png';
import fishSrc from '@/assets/images/tasks/rhymes/fish.png';
import { useTextToSpeechStore } from '@/stores/TextToSpeech.store';
import { ref, Ref } from 'vue';
import ImageCard from '@/components/shared/Image-Card.vue';
import TitleWithSound from '@/components/shared/TitleWithSound.vue';
import { useSoundHelperStore } from '@/stores/SoundHelper.store';

interface RhymeResponse {
    word: string,
    score: number,
    numSyllables: number
}

interface WordsToRhyme {
    id: number,
    src: any,
    title: string
}

const wordsToBeRhymedTo: Ref<WordsToRhyme[]> = ref([
    { id: 0, src: mouseSrc, title: 'Mouse' },
    { id: 1, src: ballSrc, title: 'Ball' },
    { id: 2, src: treeSrc, title: 'Tree' },
    { id: 3, src: sunSrc, title: 'Sun' },
    { id: 4, src: fishSrc, title: 'Fish' },
]);

const rhymesArray = ref();
const enteredWord = ref();
const currentCard = ref(0);
const doesItRhyme = ref();
const soundStore = useSoundHelperStore();

const check = async (currentCard: number) => {
    const rhymes = await WordsService.geRhymes(wordsToBeRhymedTo.value[currentCard].title);
    rhymesArray.value = rhymes.data.map((items: RhymeResponse) => items.word.toLowerCase());

    if (enteredWord.value) {
        doesItRhyme.value = rhymesArray.value.includes(enteredWord.value.toLowerCase());
    }

    if (doesItRhyme.value && enteredWord.value) {
        soundStore.playSuccess(0.3);
        txtToSpeech.playVoice(`the words ${ wordsToBeRhymedTo.value[currentCard].title } and ${ enteredWord.value } do rhyme! bravo!`);

        setTimeout(() => {
            nextCard();
        }, 3500);

    } else if (!doesItRhyme.value && enteredWord.value) {
        soundStore.playFail(0.3);
        txtToSpeech.playVoice(`either I do not know your word or they do not rhyme, try again!`);
    }

};

const nextCard = () => {
    if (currentCard.value < wordsToBeRhymedTo.value.length - 1) {
        currentCard.value++;
        doesItRhyme.value = null;
    } else {
        currentCard.value = 0;
        doesItRhyme.value = null;
    }
    enteredWord.value = null;
};

const previousCard = () => {
    if (currentCard.value > 0) {
        currentCard.value--;
        doesItRhyme.value = null;
    } else {
        currentCard.value = wordsToBeRhymedTo.value.length - 1;
        doesItRhyme.value = null;
    }
    enteredWord.value = null;
};
const txtToSpeech = useTextToSpeechStore();
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class='container'>

        <TitleWithSound title='Find a word that rhymes to the given word!' />

        <div class='slider-container'>
            <!--    PREVIOUS CARD BUTTON   -->
            <v-btn :icon="'mdi-arrow-left-thick'" color='primary' @click='previousCard()'></v-btn>

            <!--    CARD WORD TO RHYME TO    -->
            <ImageCard
                v-if='currentCard !== null'
                :bottom-txt='wordsToBeRhymedTo[currentCard].title'
                :class='{"itRhymes": doesItRhyme}'
                :src='wordsToBeRhymedTo[currentCard].src'
                has-bottom-txt
                @clickImg='txtToSpeech.playVoice(wordsToBeRhymedTo[currentCard].title)'
                @voice='txtToSpeech.playVoice(wordsToBeRhymedTo[currentCard].title)'
            />

            <!--    NEXT CARD BUTTON    -->
            <v-btn :icon="'mdi-arrow-right-thick'" color='primary' @click='nextCard()'></v-btn>

            <!--    CURRENT WORD NUMBER / TOTAL NUMBER OF WORDS      -->
            <h3>
                {{ currentCard + 1 }} / {{ wordsToBeRhymedTo.length }}
            </h3>

        </div>

        <!--    USER TEXT INPUT    -->

        <v-text-field
            v-model='enteredWord'
            append-icon='mdi-volume-high'
            class='input mt-8'
            label='Enter your rhyme'
            @click:append='txtToSpeech.playVoice(enteredWord)'
        >
        </v-text-field>


        <!--    CHECK RESULT BUTTON    -->
        <v-btn color='primary' @click='check(currentCard)'>Check if my word rhymes</v-btn>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
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

    .input {
        margin: auto;
    }

    .itRhymes {
        background-color: #78af78;
    }
}
</style>
