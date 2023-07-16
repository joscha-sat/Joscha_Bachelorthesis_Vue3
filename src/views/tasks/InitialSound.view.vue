<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

import { ref } from "vue";
import HelpMeBtn from "@/components/shared/HelpMeBtn.vue";
import InitialSoundTask from "@/components/tasks/initial_sound/InitialSoundTask.vue";
import TutorialDialog from "@/components/dialogs/tutorial-dialog.vue";

const tutorialText = ref('At the top of your screen you see a letter. Below you see five image cards representing a word. You can listen to the word by clicking on the image or on the volume button. Drag all image cards where its word starts with the given letter at the top')

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <HelpMeBtn/>

    <v-container>
        <InitialSoundTask/>
        <TutorialDialog :txt="tutorialText"/>
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
