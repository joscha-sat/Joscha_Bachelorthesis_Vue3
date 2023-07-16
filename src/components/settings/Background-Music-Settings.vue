<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>

import { useSoundHelperStore } from "@/stores/SoundHelper.store";
import { storeToRefs } from "pinia";

const soundStore = useSoundHelperStore();
const { shouldBgMusicPlay } = storeToRefs(soundStore);


const change = () => {
    soundStore.onMountedBgMusic();
}

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <v-checkbox v-model="shouldBgMusicPlay" label="play background music" @change="change"></v-checkbox>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
