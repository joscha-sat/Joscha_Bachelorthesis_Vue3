<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import HelpMeBtn from "@/components/shared/HelpMeBtn.vue";
import SentenceTask from "@/components/tasks/sentences_and_words/SentenceTask.vue";
import TutorialDialog from "@/components/dialogs/tutorial-dialog.vue";

const tutorialText = "On your screen you can see four empty spaces and four words. The words you see are in a random order. You can click on the volume button to listen to the word. You need to drag and drop the words into the empty spaces above. The task is done correctly if the words are in the right order to form a valid sentence. There is only one possible order to form a valid sentence. Once you find that sentence you will get a new one"
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <HelpMeBtn/>

    <v-container>
        <SentenceTask/>
        <TutorialDialog :txt="tutorialText"/>
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
