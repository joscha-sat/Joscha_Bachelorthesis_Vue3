<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
defineProps({
    title: String
})
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-title>
                {{ title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <slot></slot>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped>

</style>
