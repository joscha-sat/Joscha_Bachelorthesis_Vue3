<!-- TS ------------------------------------------------------------//-->
<script lang="ts" setup>
import { useRouter } from "vue-router";

const router = useRouter();
defineProps({
    hasCancelBtn: Boolean
})

defineEmits(['save'])
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-card-actions>
        <!-- SAVE BTN -->
        <v-btn class="flex-grow-1" color="primary" variant="flat" @click="$emit('save'); router.back();">
            Save
        </v-btn>

        <!-- CANCEL BTN -->
        <v-btn v-if="hasCancelBtn" class="flex-grow-1" color="cancel" variant="flat" @click="router.back()">
            Back
        </v-btn>
    </v-card-actions>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang="scss" scoped></style>
