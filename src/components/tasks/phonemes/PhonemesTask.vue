<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

import beach from '../../../assets/images/tasks/phonemes/beach.jpg'
import cloud from '../../../assets/images/tasks/phonemes/cloud.png'
import jungle from '../../../assets/images/tasks/phonemes/jungle.jpg'
import cloak from '../../../assets/images/tasks/phonemes/cloak.png'
import dolphin from '../../../assets/images/tasks/phonemes/dolphin.png'
import { reactive, ref } from "vue";
import { useTextToSpeechStore } from "@/stores/TextToSpeech.store";
import TitleWithSound from "@/components/shared/TitleWithSound.vue";
import ImageCard from "@/components/shared/Image-Card.vue";

const words = reactive([
    { id: 0, word: 'beach', src: beach },
    { id: 1, word: 'cloud', src: cloud },
    { id: 2, word: 'jungle', src: jungle },
    { id: 2, word: 'cloak', src: cloak },
    { id: 3, word: 'dolphin', src: dolphin },
]);

const answers = reactive([
    { index: 0, id: 0, word: 'beech', list: 1, correct: false },
    { index: 0, id: 1, word: 'beach', list: 1, correct: true },
    { index: 0, id: 2, word: 'baech', list: 1, correct: false },
    { index: 0, id: 3, word: 'baach', list: 1, correct: false },


    { index: 1, id: 4, word: 'claud', list: 1, correct: false },
    { index: 1, id: 5, word: 'cluod', list: 1, correct: false },
    { index: 1, id: 6, word: 'clowed', list: 1, correct: false },
    { index: 1, id: 7, word: 'cloud', list: 1, correct: true },

    { index: 2, id: 8, word: 'jungle', list: 1, correct: true },
    { index: 2, id: 9, word: 'djangle', list: 1, correct: false },
    { index: 2, id: 10, word: 'jungel', list: 1, correct: false },
    { index: 2, id: 11, word: 'djungle', list: 1, correct: false },

    { index: 3, id: 12, word: 'cloke', list: 1, correct: false },
    { index: 3, id: 13, word: 'cloak', list: 1, correct: true },
    { index: 3, id: 14, word: 'kloak', list: 1, correct: false },
    { index: 3, id: 15, word: 'clauk', list: 1, correct: false },

    { index: 4, id: 16, word: 'dolfyn', list: 1, correct: false },
    { index: 4, id: 17, word: 'doulphin', list: 1, correct: false },
    { index: 4, id: 18, word: 'dolphin', list: 1, correct: true },
    { index: 4, id: 19, word: 'dolfin', list: 1, correct: false },
])

const getList = (list) => {
    return answers.filter((item) => item.list === list)
}

const currentCard = ref(0);

const correct = ref(false);

const speechStore = useTextToSpeechStore();

const dragStart = (event, answer) => {
    event.dataTransfer.setData('answerID', answer.id);
}

const onDrop = (event, list) => {

    const answerID = event.dataTransfer.getData('answerID');
    const answer = answers.find((answer) => answer.id == answerID);


    if (list === 2 && getList(2).length > 0) {
        getList(2).forEach((item) => item.list = 1)
    }

    answer.list = list;
    correct.value = answer.correct && answer.list === 2;
};

const nextCard = () => {
    if (currentCard.value < answers.length / 4 - 1) {
        currentCard.value++;
    } else {
        currentCard.value = 0;
    }

    getList(2).forEach(item => item.list = 1);
    correct.value = false
}

const previousCard = () => {
    if (currentCard.value > 0) {
        currentCard.value--;
    } else {
        currentCard.value = answers.length / 4 - 1;
    }
    getList(2).forEach(item => item.list = 1);
    correct.value = false
}
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <TitleWithSound title="Listen to the word and choose the right spelling"/>

    <div class="container">

        <div class="slider-container">

            <v-btn :icon="'mdi-arrow-left-thick'" color="primary" @click="previousCard()"></v-btn>

            <ImageCard
              v-if="currentCard !== null"
              :src="words[currentCard].src"
              @clickImg="speechStore.playVoice(words[currentCard].word)"
              @voice="speechStore.playVoice(words[currentCard].word)"
            />

            <v-btn :icon="'mdi-arrow-right-thick'" color="primary" @click="nextCard()"></v-btn>

            <!--    CURRENT WORD NUMBER / TOTAL NUMBER OF WORDS      -->
            <h3>
                {{ currentCard + 1 }} / {{ words.length }}
            </h3>

        </div>

        <!--    DROP ZONE    -->

        <div
          :class="[{'drop-field-correct': correct, 'drop-field-incorrect': getList(2).length > 0 && !correct }]"
          class="drop-field"
          @drop="onDrop($event, 2)"
          @dragenter.prevent
          @dragover.prevent
        >
            <div
              v-for="answer in getList(2)"
              :key="answer.id"
              class='drag-el'
              draggable="true"
              @dragstart="dragStart($event, answer)"
            >
                <h1>
                    {{ answer.word }}
                </h1>
            </div>

            <span v-if="getList(2).length < 1" style="color: #ccc">Drop your word here</span>
        </div>


        <div class="word-container" @drop="onDrop($event, 1)" @dragenter.prevent @dragover.prevent>
            <template
              v-for="(answer, index) in getList(1)"
              :key="index"
            >
                <v-card
                  v-if="answer.index === currentCard"
                  class="card"
                  draggable="true"
                  @dragstart="dragStart($event, answer)"
                >
                    <v-card-title>{{ answer.word }}</v-card-title>
                </v-card>
            </template>

        </div>

    </div>

    {{ correct }}

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;

    margin-top: 2rem;

    .slider-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .card {
        padding-inline: 0.75rem;
        padding-block: 0.25rem;

        &:hover {
            cursor: grab;
        }
    }

    .drag-el:hover {
        cursor: grab;
    }

    .word-container {
        display: flex;
        gap: 1rem;

        padding-inline: 5rem;

        margin-top: 2rem;
    }

    .drop-field {
        margin-top: 2rem;
        border: 2px dashed #ccc;
        width: 400px;
        height: 100px;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .drop-field.active-line {
        background-color: lightblue;
    }

    .drop-field span {
        cursor: pointer;
    }

    .drop-field-correct {
        background-color: #78af78;
    }

    .drop-field-incorrect {
        background-color: lightcoral;
    }
}
</style>
