<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>

import HelpMeBtn from '@/components/shared/HelpMeBtn.vue';
import PhonemesTask from '@/components/tasks/PhonemesTask.vue';
import TutorialDialog from '@/components/dialogs/tutorial-dialog.vue';
import { ref } from 'vue';

const tutorialText = ref('On your screen you see an image card representing a word. You can listen to the word by clicking on the image or the volume button. Below you see four words and an empty drop area. Only one word is the correct spelling to the wanted word. Drag and drop the word with the correct spelling into the drop area. You can change the word with the arrow buttons');

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <HelpMeBtn />

    <v-container>
        <PhonemesTask />
        <TutorialDialog :txt='tutorialText' />
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>

</style>
