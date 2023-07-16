<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import { useDialogHelperStore } from "@/stores/DialogHelper.store";
import { useTextToSpeechStore } from "@/stores/TextToSpeech.store";
import { storeToRefs } from "pinia";

defineProps({
    txt: String
})

const dialogHelper = useDialogHelperStore();
const { visible } = storeToRefs(dialogHelper)

const speechStore = useTextToSpeechStore();
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-dialog v-model="visible" width="40dvw">
        <v-card style="padding: 0.75rem">
            <v-card-title>
                What do I need to do?
                <v-btn color="primary" @click="speechStore.playVoice('What do I need to do?')">
                    <v-icon>mdi-volume-high</v-icon>
                </v-btn>
            </v-card-title>

            <v-card-text>
                {{ txt }}
                <v-btn color="primary" @click="speechStore.playVoice(txt)">
                    <v-icon>mdi-volume-high</v-icon>
                </v-btn>
            </v-card-text>

            <v-card-actions style="margin-top: 1rem">
                <v-btn color="primary" variant="flat" @click="dialogHelper.closeDialog()">ok</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
