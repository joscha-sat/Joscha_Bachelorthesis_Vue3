<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>


defineProps({
    title: String,
    src: String,
    hasBottomTxt: {
        type: Boolean,
        default: false,
    },
    bottomTxt: String,
    bothTexts: {
        type: Boolean,
        default: false,
    },
});

defineEmits(['voice', 'clickImg']);
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-card class='card'>

        <!--    TOP TITLE    -->
        <v-card-title
            v-if='!hasBottomTxt || bothTexts'
            style='display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; overflow-wrap: break-word'
        >

            {{ title }}

            <v-btn v-if='!hasBottomTxt || !bothTexts' color='primary' @click="$emit('voice')">
                <v-icon>mdi-volume-high</v-icon>
            </v-btn>
        </v-card-title>

        <!--    CENTER IMAGE    -->
        <v-img
            :src='src'
            class='img'
            contain
            height='300px'
            style='cursor: pointer; padding: 2rem'
            width='100%'
            @click="$emit('clickImg')"
        >
        </v-img>

        <!--    BOTTOM TITLE     -->
        <v-card-title
            v-if='hasBottomTxt'
            style='display: flex; justify-content: center; align-items: center; gap: 1rem'
        >
            <div>{{ bottomTxt }}</div>

            <v-btn color='primary' @click="$emit('voice')">
                <v-icon>mdi-volume-high</v-icon>
            </v-btn>
        </v-card-title>
    </v-card>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
.card {
    width: min(25rem, 100%);
    display: flex;
    flex-direction: column;


    // disables overflow
    .v-card-title {
        white-space: normal;
    }

    &:hover {
        filter: brightness(95%);
    }

    :deep(.v-img__img) {
        padding: 1rem;
    }
}
</style>
