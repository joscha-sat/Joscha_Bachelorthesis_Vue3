<!-- TS ------------------------------------------------------------//-->
<script lang='ts' setup>
import ColorThemePicker from '@/components/settings/Color-Theme-Picker.vue';
import BackgroundMusicSettings from '@/components/settings/Background-Music-Settings.vue';
import FontSizeSettings from '@/components/settings/Font-Size-Settings.vue';
import FontFamilySettings from '@/components/settings/Font-Family-Settings.vue';
import SaveCancelButtons from '@/components/shared/Save-Cancel-Buttons.vue';
</script>

<!-- HTML ----------------------------------------------------------//-->
<template>
    <v-container class='container'>
        <v-card class='card' color='bg'>
            <!-- TITLE -->
            <v-card-title>
                Settings
            </v-card-title>

            <!-- CONTENT -->
            <v-card-text class='cardText'>
                <!-- PRIMARY COLOR PICKER -->
                <div class='block'>
                    <ColorThemePicker />
                </div>

                <!-- BACKGROUND MUSIC CHECKBOX -->
                <div class='block'>
                    <BackgroundMusicSettings />
                </div>

                <!-- FONT SIZE SETTER -->
                <div class='block'>
                    <FontSizeSettings />
                </div>

                <!-- FONT FAMILY SELECTOR -->
                <div class='block'>
                    <FontFamilySettings />
                </div>
            </v-card-text>

            <SaveCancelButtons style='padding: 1rem' />
        </v-card>
    </v-container>
</template>

<!-- SCSS ---------------------------------------------------------// -->
<style lang='scss' scoped>
.container {
    height: 75dvh;
    display: flex;
    align-items: center;
}

.card {
    margin: auto;
    width: min(35rem, 100%);
}

.cardText {
    padding-bottom: 0;
}

.maTop {
    margin-top: 1.5rem;
}
</style>
