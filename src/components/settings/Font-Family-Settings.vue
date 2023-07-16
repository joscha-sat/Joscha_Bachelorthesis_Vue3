<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import { onMounted, ref, watch } from "vue";

const selectedFontFamily = ref('Roboto')
const items = ['Calibri', 'Roboto', 'Helvetica'];

watch(selectedFontFamily, () => {
    saveFontFamily();
})

const saveFontFamily = () => {
    document.body.setAttribute('data-font-family', selectedFontFamily.value.toLowerCase());
    localStorage.setItem('font-family', selectedFontFamily.value);
}

onMounted(() => {
    const fontFamily = localStorage.getItem('font-family');
    if (fontFamily) selectedFontFamily.value = fontFamily
})
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <div>
        <v-card-title class='title pa-0'>Change font family!</v-card-title>
        <v-select id='font-family-select' v-model='selectedFontFamily' :items='items' class="mt-1">
        </v-select>
    </div>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
</style>




