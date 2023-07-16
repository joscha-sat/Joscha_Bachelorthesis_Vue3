<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import { useSpeechSynthesis } from "@vueuse/core";

const speechStore = useTextToSpeechStore();
const { speech, voice } = storeToRefs(speechStore);
import listening from '../../assets/images/tasks/listening.png';
import rhymes from '../../assets/images/tasks/rhymes.png';
import words from '../../assets/images/tasks/words.jpg';
import iSound from '../../assets/images/tasks/initialSound.png';
import syllables from '../../assets/images/tasks/syllables.jpg';
import phonemes from '../../assets/images/tasks/phonemes.png';
import { useTextToSpeechStore } from "@/stores/TextToSpeech.store";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import ImageCard from "@/components/shared/Image-Card.vue";
import router from "@/router";

const tasks = ref([
    { i18n: 'Listening', src: listening, to: 'listening' },
    { i18n: 'Rhymes', src: rhymes, to: 'rhymes' },
    { i18n: 'Sentences and words', src: words, to: 'sentences_and_words' },
    { i18n: 'Syllables', src: syllables, to: 'syllables' },
    { i18n: 'Initial sound', src: iSound, to: 'initial_sound' },
    { i18n: 'Phonemes', src: phonemes, to: 'phonemes' }
]);

const playVoice = (txt: string) => {
    speech.value = useSpeechSynthesis(txt, {
        voice
    })
    speech.value.speak()
}

const toTask = (to: string) => {

    router.push({
        path: to
    })

}

</script>


<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class="grid">
        <ImageCard
          v-for="(task, i) in tasks"
          :key="i"
          :src="task.src"
          :title="task.i18n"
          @clickImg="toTask(task.to)"
          @voice="playVoice(task.i18n)"
        />
    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.grid {
    display: grid;
    gap: 1rem;


    grid-template-columns: repeat(
    auto-fit,
        minmax(min(max(100% / 3 - 1rem, 10rem), 100%), 1fr)
  );

}

</style>

