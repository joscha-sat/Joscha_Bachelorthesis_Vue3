<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import listening from '../../assets/images/tasks/listening.png'
import { useSoundHelperStore } from "@/stores/SoundHelper.store";

defineProps({
    soundSrc: String,
})

const soundStore = useSoundHelperStore();
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <div class="imgContainer">
        <v-img
          :src="listening"
          class="img"
          max-height="350px"
          style="cursor: pointer"
          width="100%"
          @click="soundStore.playSound(soundSrc)"
        >
        </v-img>

        <v-btn :icon="'mdi-play'" color="primary" style="transform: scale(2.5)"
               @click="soundStore.playSound(soundSrc)"></v-btn>
    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

.imgContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    margin: auto;
    width: min(23em, 100%);
}
</style>
