<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import { useMascotStore } from '@/stores/mascot.store';
import { storeToRefs } from 'pinia';

const mascotStore = useMascotStore();
const { happyCatImg, happyDogImg, sadDogImg, sadCatImg, isDog } = storeToRefs(mascotStore);

defineProps({
    showBoolean: Boolean,
    correctBoolean: Boolean,
});
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <div v-if='showBoolean' class='outer-container'>

        <!--    IMG    -->

        <img v-if='isDog' :src='correctBoolean? happyDogImg : sadDogImg' alt='dog' class='img'>
        <img v-if='!isDog' :src='correctBoolean? happyCatImg : sadCatImg' alt='cat' class='img' />

        <!--    TEXT    -->

        <span v-if='correctBoolean' class='correct'>
            Your answer is correct, awesome!
        </span>

        <span v-if='!correctBoolean' class='incorrect'>
            Your answer is incorrect, try again!
        </span>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>


.outer-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.incorrect {
    color: lightcoral;
}

.correct {
    color: #78af78;
}

.img {
    max-width: 300px;
    object-fit: contain;
}
</style>
