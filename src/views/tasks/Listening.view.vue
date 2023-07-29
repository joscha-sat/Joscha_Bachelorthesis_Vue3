<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import HelpMeBtn from '@/components/shared/HelpMeBtn.vue';
import ListeningTask from '@/components/tasks/ListeningTask.vue';
import TutorialDialog from '@/components/dialogs/tutorial-dialog.vue';
import { ref } from 'vue';

const tutorialText = ref('On your screen you can see a figure with a play button next to it. If you click that button a sound will be played. Listen to that sound. Once the sound is over, three cards will appear on the screen. One of the cards displays the word and image to the played sound. Click on that card to get to the next sound.');

</script>


<!-- HTML ----------------------------------------------------------//-->
<template>
    <HelpMeBtn />

    <v-container>
        <ListeningTask />
        <TutorialDialog :txt='tutorialText' />
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>

</style>

