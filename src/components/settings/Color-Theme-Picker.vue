<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import { useTheme } from 'vuetify';
import { onMounted, ref, watch } from "vue";
import ExpansionPanel from "@/components/shared/Expansion-Panel.vue";

const color = ref();
const theme = useTheme();

watch(color, (newColor) => {
    theme.themes.value.light.colors.primary = newColor;
    theme.themes.value.dark.colors.primary = newColor;
    localStorage.setItem('primary-color', newColor);
});

onMounted(() => {
    const storedColor = localStorage.getItem('primary-color');

    if (storedColor) {
        color.value = storedColor;
    }
});
</script>


<!-- HTML ----------------------------------------------------------//-->
<template>
    <!-- expansion panel with color theme picker -->

    <ExpansionPanel title='Choose your favourite color'>
        <v-color-picker v-model='color' style='margin: auto'></v-color-picker>
    </ExpansionPanel>

</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>


</style>
