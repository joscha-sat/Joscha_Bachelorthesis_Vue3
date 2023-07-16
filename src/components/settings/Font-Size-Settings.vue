<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import { onMounted, ref } from "vue";

const size = ref(16);

const changeEvent = () => {
    if (size.value < 12) size.value = 12;
    if (size.value > 45) size.value = 45;
    document.body.style.fontSize = `${ size.value }px`;
    localStorage.setItem('fontSize', size.value.toString());
};

onMounted(() => {
    let value = localStorage.getItem('fontSize');

    if (value) {
        document.body.style.fontSize = `${ value }px`;
        size.value = Number(value);
    } else {
        document.body.style.fontSize = `${ size.value }px`;
    }
});
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>

    <v-card-title class='title pa-0'>Change font size!</v-card-title>

    <v-text-field v-model='size' class="mt-1" max='45' min='12' type='number' @change='changeEvent()'></v-text-field>

    <div>
        Example text font size
    </div>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>


