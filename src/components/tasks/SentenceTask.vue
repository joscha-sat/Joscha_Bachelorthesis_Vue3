<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import Sentence from '@/classes/Sentence.class';
import { onMounted, reactive, ref } from 'vue';
import { useTextToSpeechStore } from '@/stores/TextToSpeech.store';
import TitleWithSound from '@/components/shared/TitleWithSound.vue';
import { useSoundHelperStore } from '@/stores/SoundHelper.store';
import MascotFeedback from '@/components/shared/MascotFeedback.vue';
import { useMascotStore } from '@/stores/mascot.store';

const words: Sentence[] = reactive([
    { id: 0, text: 'your', placed: false },
    { id: 0, text: 'Play', placed: false },
    { id: 0, text: 'friends', placed: false },
    { id: 0, text: 'with', placed: false },

    { id: 1, text: 'rubs', placed: false },
    { id: 1, text: 'love', placed: false },
    { id: 1, text: 'belly', placed: false },
    { id: 1, text: 'Dogs', placed: false },

    { id: 2, text: 'cream', placed: false },
    { id: 2, text: 'I', placed: false },
    { id: 2, text: 'ice', placed: false },
    { id: 2, text: 'like', placed: false },

    { id: 3, text: 'melodies', placed: false },
    { id: 3, text: 'sing', placed: false },
    { id: 3, text: 'Birds', placed: false },
    { id: 3, text: 'sweet', placed: false },

    { id: 4, text: 'Believe', placed: false },
    { id: 4, text: 'your', placed: false },
    { id: 4, text: 'in', placed: false },
    { id: 4, text: 'dreams', placed: false },
]);

const currentIndex = ref(0);

interface Line {
    wordIndex: number | null,
}

const lines: Line[] = reactive([
    { wordIndex: null },
    { wordIndex: null },
    { wordIndex: null },
    { wordIndex: null },
]);

const activeLineIndex = ref(null);
const correct = ref(false);
const falseSentence = ref(false);
const draggedLineIndex = ref(null);
const helperIndex = ref(null);

const dragStart = (event, index, lineIndex?) => {
    event.dataTransfer.setData('text/plain', index.toString());
    helperIndex.value = lineIndex;
};

const drop = (event, lineIndex) => {
    event.preventDefault();
    const wordIndex = parseInt(event.dataTransfer.getData('text/plain'));
    const word = words[wordIndex];

    const currentLineIndex = lines.findIndex((line) => line.wordIndex === wordIndex);

    // If the line is empty, place the word on it
    if (lines[lineIndex].wordIndex === null) {
        // Remove word from previous line if it was already placed
        if (currentLineIndex !== -1) {
            lines[currentLineIndex].wordIndex = null;
            words[wordIndex].placed = false;
        }

        lines[lineIndex].wordIndex = wordIndex;
        word.placed = true;
    } else {
        // Swap positions with the word in the current line
        lines[currentLineIndex].wordIndex = lines[lineIndex].wordIndex;
        lines[lineIndex].wordIndex = wordIndex;
        words[lines[currentLineIndex].wordIndex].placed = true;
        words[wordIndex].placed = true;
    }
    activeLineIndex.value = null;
    result();
    amountOfTries.value += 1;
};

const dropWordBack = () => {
    clearLine(helperIndex.value);
};

const clearLine = (lineIndex) => {
    const wordIndex = lines[lineIndex].wordIndex;
    lines[lineIndex].wordIndex = null;
    words[wordIndex].placed = false;
};

const dragEnter = (lineIndex) => {
    activeLineIndex.value = lineIndex;
    draggedLineIndex.value = lineIndex;
};

const dragLeave = (lineIndex) => {
    if (activeLineIndex.value === lineIndex) {
        activeLineIndex.value = null;
    }
    if (draggedLineIndex.value === lineIndex) {
        draggedLineIndex.value = null;
    }
};

const isLineActive = (lineIndex) => {
    return activeLineIndex.value === lineIndex;
};

const isLineDroppable = (lineIndex) => {
    return draggedLineIndex.value === lineIndex;
};

const correctAnswers = (sentence) => {
    switch (sentence) {
        case 'Play with your friends':
            correct.value = true;
            break;
        case 'Dogs love belly rubs':
            correct.value = true;
            break;
        case 'I like ice cream':
            correct.value = true;
            break;
        case 'Birds sing sweet melodies':
            correct.value = true;
            break;
        case 'Believe in your dreams':
            correct.value = true;
            break;
    }
};


const speechStore = useTextToSpeechStore();
const soundStore = useSoundHelperStore();

const fullSentenceOnce = ref(false);

const result = () => {
    const sentence = lines
        .map((line) => (line.wordIndex !== null ? words[line.wordIndex].text : ''))
        .join(' ');

    correctAnswers(sentence);

    if (correct.value) {
        speechStore.playVoice(sentence + 'is the correct sentence! bravo!');
        soundStore.playSuccess(0.3);
        useMascotStore().playMascotSound();
        fullSentenceOnce.value = false;

        setTimeout(() => {
            nextWords();
            correct.value = false;
            falseSentence.value = false;
        }, 4000);
    }
    falseSentence.value = lines.every((word) => word.wordIndex != null);

    if (falseSentence.value && !fullSentenceOnce.value && !correct.value) {
        soundStore.playFail();
        fullSentenceOnce.value = true;
    }
};

const nextWords = () => {
    // take into account that 4 words have the same index, so the actual length is: length / 4 - 1
    if (currentIndex.value < words.length / 4 - 1) {
        currentIndex.value++;
        lines.forEach((item) => {
            item.wordIndex = null;
        });
    } else {
        lines.forEach((item) => {
            item.wordIndex = null;
        });
        words.forEach((item) => {
            item.placed = false;
        });
        currentIndex.value = 0;
    }
    amountOfTries.value = 0;
    localStorage.setItem('sentenceIndex', currentIndex.value.toString());
};

const amountOfTries = ref(0);
onMounted(() => {
    const storageIndex = ref(localStorage.getItem('sentenceIndex'));
    if (storageIndex.value)
        currentIndex.value = Number(storageIndex.value);
});
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <TitleWithSound title='Drag and drop all given words to form a valid sentence' />

    <div class='container'>
        <!--    DROP ZONES    -->
        <div class='lines'>
            <div
                v-for='(line, lineIndex) in lines'
                :key='lineIndex'
                :class="['line', { 'active-line': isLineActive(lineIndex), droppable: isLineDroppable(lineIndex), 'line-correct': correct, 'line-incorrect': falseSentence && !correct }]"
                @dragenter='dragEnter(lineIndex)'
                @dragleave='dragLeave(lineIndex)'
                @drop='drop($event, lineIndex)'
                @dragover.prevent
            >
                <h2
                    v-if='line.wordIndex !== null'
                    draggable='true'
                    style='cursor: grab'
                    @click='clearLine(lineIndex)'
                    @dragstart='dragStart($event, line.wordIndex, lineIndex)'
                >
                    {{ words[line.wordIndex].text }}
                </h2>
            </div>

            <!--      DISPLAY CURRENT STATE / MAX TASKS      -->

            <h3 style='margin-left: 2rem'>
                {{ currentIndex + 1 }} / {{ words.length / 4 }}
            </h3>

        </div>

        <!-- WORDS -->
        <div class='words' style='padding: 3rem;' @drop='dropWordBack()'
             @dragover.prevent>
            <template v-for='(word, i) in words' :key='i'>
                <v-card
                    v-if='word.id === currentIndex && !word.placed'
                    :draggable='!word.placed'
                    class='word-cards'
                    @dragstart='dragStart($event, i)'
                >
                    <v-card-title>
                        <h3>
                            {{ word.text }} |
                            <v-icon color='primary' @click='speechStore.playVoice(word.text)'>mdi-volume-high</v-icon>
                        </h3>

                    </v-card-title>

                </v-card>
            </template>
        </div>

        <!--   hints if the user has some fail tries     -->
        <span v-if='amountOfTries >= 6 && currentIndex === 0' class='hint'>
           hint: Play ____ ____ friends.
        </span>

        <span v-if='amountOfTries >= 6 && currentIndex === 1' class='hint'>
           hint: Dogs love ____ ____.
        </span>

        <span v-if='amountOfTries >= 6 && currentIndex === 2' class='hint'>
           hint: I ____ ice ____.
        </span>

        <span v-if='amountOfTries >= 6 && currentIndex === 3' class='hint'>
           hint:  Birds ____ ____ melodies.
        </span>

        <span v-if='amountOfTries >= 6 && currentIndex === 4' class='hint'>
           hint: ____ ____ your dreams.
        </span>

        <MascotFeedback :correct-boolean='correct' :show-boolean='lines.every((line) => line.wordIndex !== null)' />

    </div>


</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
}

.words {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;

    &:hover {
        cursor: grab;
    }

    .word-cards {
        padding-inline: 0.75rem;
        padding-block: 0.25rem;
    }

}

.lines {
    display: flex;
    gap: 0.5rem;
}

.line {
    flex: 1;
    border: 2px dashed #ccc;
    width: 250px;
    min-height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    position: relative;
}

.line.active-line {
    background-color: lightblue;
}

.line span {
    cursor: pointer;
}

.line-correct {
    background-color: #78af78;
}

.line-incorrect {
    background-color: lightcoral;
}

.hint {
    font-size: 1.5rem;
}
</style>
