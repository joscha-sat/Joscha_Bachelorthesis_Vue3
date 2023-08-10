<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import SyllableTask from '@/components/tasks/SyllableTask.vue';
import HelpMeBtn from '@/components/shared/HelpMeBtn.vue';
import TutorialDialog from '@/components/dialogs/tutorial-dialog.vue';
import { ref } from 'vue';
import { useOnLoadHelperStore } from '@/stores/OnLoadHelper.store';
import { storeToRefs } from 'pinia';

const tutorialText = ref('On your screen you can see an image with a word. You can listen to the word by clicking the image or the volume button. Below you see an input. You have to enter the right amount of syllables to the given word. You have to enter a number. You can check your answer by clicking on the check answer button. You can use the array keys to get a new word');


const helperStore = useOnLoadHelperStore();
const { canSee } = storeToRefs(helperStore);

const btnClick = () => {
    canSee.value = !canSee.value;
};
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <div style='display: flex; justify-content: space-between'>
        <HelpMeBtn />
        <v-btn color='primary' style='margin: 1rem' @click='btnClick'>
            <span v-if='canSee'>I can't hear</span>
            <span v-if='!canSee'>I can hear</span>
        </v-btn>
    </div>
    
    <v-container>
        <SyllableTask />
        <TutorialDialog :txt='tutorialText' />
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
</style>
