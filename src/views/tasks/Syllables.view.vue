<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import SyllableTask from '@/components/tasks/SyllableTask.vue';
import HelpMeBtn from '@/components/shared/HelpMeBtn.vue';
import TutorialDialog from '@/components/dialogs/tutorial-dialog.vue';
import { ref } from 'vue';

const tutorialText = ref('On your screen you can see an image with a word. You can listen to the word by clicking the image or the volume button. Below you see an input. You have to enter the right amount of syllables to the given word. You have to enter a number. You can check your answer by clicking on the check answer button. You can use the array keys to get a new word');

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <HelpMeBtn />

    <v-container>
        <SyllableTask />
        <TutorialDialog :txt='tutorialText' />
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
</style>
