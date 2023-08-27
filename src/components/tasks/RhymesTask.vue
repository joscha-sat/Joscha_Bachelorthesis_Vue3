<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import WordsService from '@/api/Words.service';
import mouseSrc from '@/assets/images/tasks/rhymes/mouse.png';
import ballSrc from '@/assets/images/tasks/rhymes/ball.png';
import treeSrc from '@/assets/images/tasks/rhymes/tree.png';
import sunSrc from '@/assets/images/tasks/rhymes/sun.png';
import fishSrc from '@/assets/images/tasks/rhymes/fish.png';
import { useTextToSpeechStore } from '@/stores/TextToSpeech.store';
import { onMounted, ref, Ref } from 'vue';
import ImageCard from '@/components/shared/Image-Card.vue';
import TitleWithSound from '@/components/shared/TitleWithSound.vue';
import { useSoundHelperStore } from '@/stores/SoundHelper.store';
import MascotFeedback from '@/components/shared/MascotFeedback.vue';

interface RhymeResponse {
    word: string,
    score: number,
    numSyllables: number
}

interface WordsToRhyme {
    id: number,
    src: any,
    title: string,
    rhymePhoneme: string,
}

const wordsToBeRhymedTo: Ref<WordsToRhyme[]> = ref([
    { id: 0, src: mouseSrc, title: 'Mouse', rhymePhoneme: 'rhyme phoneme: -ouse' },
    { id: 1, src: ballSrc, title: 'Ball', rhymePhoneme: 'rhyme phoneme: -all' },
    { id: 2, src: treeSrc, title: 'Tree', rhymePhoneme: 'rhyme phoneme: -ee' },
    { id: 3, src: sunSrc, title: 'Sun', rhymePhoneme: 'rhyme phoneme: -un' },
    { id: 4, src: fishSrc, title: 'Fish', rhymePhoneme: 'rhyme phoneme: -ish' },
]);

const rhymesArray = ref();
const enteredWord = ref(null);
const currentCard = ref(0);
const doesItRhyme = ref(null);
const soundStore = useSoundHelperStore();
const amountOfTries = ref(0);

const check = async (currentCard: number) => {
    const rhymes = await WordsService.geRhymes(wordsToBeRhymedTo.value[currentCard].title);
    rhymesArray.value = rhymes.data.map((items: RhymeResponse) => items.word.toLowerCase());

    if (enteredWord.value !== null) {
        amountOfTries.value += 1;
    }


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
        setTimeout(() => {
            doesItRhyme.value = null;
        }, 3500);
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
    amountOfTries.value = 0;
    localStorage.setItem('rhymesIndex', currentCard.value.toString());
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
    amountOfTries.value = 0;
    localStorage.setItem('rhymesIndex', currentCard.value.toString());
};
const txtToSpeech = useTextToSpeechStore();

onMounted(() => {
    const storageIndex = ref(localStorage.getItem('rhymesIndex'));
    if (storageIndex.value)
        currentCard.value = Number(storageIndex.value);
});
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class='allContainer'>

        <!--    MASCOT    -->
        <div style='display: flex; align-items: center'>
            <MascotFeedback :correct-boolean='doesItRhyme' :show-boolean='doesItRhyme !== null' />
        </div>

        <!--   CONTENT     -->
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
                    :title='wordsToBeRhymedTo[currentCard].rhymePhoneme'
                    both-texts
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

            <div class='input_btn'>
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
                <v-btn class='btn' color='primary' @click='check(currentCard)'>Check if my word rhymes</v-btn>

                <!--        hint after too many incorrect inputs -->
                <div v-if='amountOfTries >= 2 && currentCard === 0' class='hint' style='margin-top: 1rem'>
                    hint: h - ouse, bl - ouse
                </div>

                <div v-if='amountOfTries >= 2 && currentCard === 1' class='hint' style='margin-top: 1rem'>
                    hint: m - all, c - all
                </div>

                <div v-if='amountOfTries >= 2 && currentCard === 2' class='hint' style='margin-top: 1rem'>
                    hint: fr - ee, kn - ee
                </div>

                <div v-if='amountOfTries >= 2 && currentCard === 3' class='hint' style='margin-top: 1rem'>
                    hint: f - un, b - un
                </div>

                <div v-if='amountOfTries >= 2 && currentCard === 4' class='hint' style='margin-top: 1rem'>
                    hint: d - ish, w - ish
                </div>
            </div>
        </div>

        <div></div>
    </div>


</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
.allContainer {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
}

.hint {
    font-size: 1.5rem;
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

    .itRhymes {
        background-color: #78af78;
    }
}
</style>
