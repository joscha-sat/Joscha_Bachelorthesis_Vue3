<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import happydog from "@/assets/images/dog/happyDog.png";
import happycat from "@/assets/images/cat/happyCat.png";

import { useMascotStore } from "@/stores/mascot.store";
import { storeToRefs } from "pinia";

const mascotStore = useMascotStore();
const { showCorrectPopup, isDog } = storeToRefs(mascotStore);

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-img v-if="showCorrectPopup" :src=" isDog ? happydog : happycat" class="popupImage" height="35dvh"
           width="35dvw"></v-img>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

.popupImage {
    position: fixed;
    top: 30%;
    left: 85%;
    transform: translate(-50%, -50%);
    z-index: 9999;
}
</style>
