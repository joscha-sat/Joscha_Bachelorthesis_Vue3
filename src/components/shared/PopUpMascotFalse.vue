<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import saddog from "@/assets/images/dog/sadDog.png";
import sadcat from "@/assets/images/cat/sadCat.png";

import { useMascotStore } from "@/stores/mascot.store";
import { storeToRefs } from "pinia";

const mascorStore = useMascotStore();
const { showFalsePopup, isDog } = storeToRefs(mascorStore);

</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-img v-if="showFalsePopup" :src=" isDog ? saddog : sadcat" class="popupImage" height="35dvh"
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
