<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import HelpMeBtn from "@/components/shared/HelpMeBtn.vue";
import RhymesTask from "@/components/tasks/rhymes/RhymesTask.vue";
import TutorialDialog from "@/components/dialogs/tutorial-dialog.vue";

const tutorialText = 'In the middle of the screen you see an image together with a word. You can listen to the word by clicking on the image or on the volume button. Below you see a textfield. Now enter words you believe rhyme to the given word. You can check your answer with the button below'

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class="header">
        <HelpMeBtn/>
        <div>
            rhymes are checked by
            <a href="https://rhymebrain.com/api.html" target="_blank">RhymeBrain API</a>
        </div>
    </div>

    <v-container>
        <RhymesTask/>
        <TutorialDialog :txt="tutorialText"/>
    </v-container>


</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;

    padding: 1rem;
}
</style>
