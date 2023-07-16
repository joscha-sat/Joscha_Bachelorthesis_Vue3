<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import { useDialogHelperStore } from "@/stores/DialogHelper.store";
import { useTextToSpeechStore } from "@/stores/TextToSpeech.store";
import { ref } from "vue";

const speechStore = useTextToSpeechStore();
const btnTxt = ref('click here for help!');

const dialogStore = useDialogHelperStore();

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div class="btn">
        <v-btn color="primary" @click="dialogStore.openDialog()">
            {{ btnTxt }}
        </v-btn>
        <v-icon color="primary" style="margin-left: 0.25rem" @click="speechStore.playVoice(btnTxt)">
            mdi-volume-high
        </v-icon>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>
.btn {
    padding: 1rem;
}
</style>
