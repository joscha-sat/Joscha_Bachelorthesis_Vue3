import { defineStore } from 'pinia';

import bgMusic from '../assets/sounds/bgMusic.mp3';

export const useSoundHelperStore = defineStore('soundHelper', {
    state: () => ({
        audioIsPlaying: false,
        isPlayedOnce: false,
        audioDuration: 0,
        currentTime: 0,
        shouldBgMusicPlay: false,
        bgIsPlaying: false,
        audio: new Audio(bgMusic),
    }),

    // GETTER -------------------------------------------------------------------- //>
    getters: {},

    // ACTIONS ------------------------------------------------------------------- //>
    actions: {
        formatDuration() {
            const remainingTime = this.audioDuration - this.currentTime;
            const minutes = Math.floor(remainingTime / 60);
            const seconds = Math.floor(remainingTime % 60);
            return `${minutes}:${seconds.toString().padStart(2, '0')}`;
        },
        playSound(src) {
            // Avoid playing sound multiple times at once
            if (!this.audioIsPlaying) {
                this.audioIsPlaying = true;

                const audio = new Audio(src);

                audio.addEventListener('loadedmetadata', () => {
                    this.audioDuration = audio.duration;
                });

                audio.addEventListener('timeupdate', () => {
                    this.currentTime = audio.currentTime;
                });

                audio.addEventListener('ended', () => {
                    this.audioIsPlaying = false;
                });

                audio.play().then();
            }

            this.isPlayedOnce = true;
        },

        onMountedBgMusic() {
            if (!this.bgIsPlaying && this.shouldBgMusicPlay) {
                this.bgIsPlaying = true;
                this.audio.volume = 0.1;
                this.audio.play().then(() => {
                    this.audio.loop = true;
                });

                this.audio.bgIsPlaying = false;
            } else {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.bgIsPlaying = false;
            }
        },
    },
});
