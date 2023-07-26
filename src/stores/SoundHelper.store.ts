import { defineStore } from 'pinia';

import bgMusic from '../assets/sounds/bgMusic.mp3';
import success from '../assets/sounds/tasks/success.mp3';
import fail from '../assets/sounds/tasks/fail.mp3';

export const useSoundHelperStore = defineStore('soundHelper', {
    state: () => ({
        audioIsPlaying: false,
        isPlayedOnce: false,
        audioDuration: 0,
        currentTime: 0,
        shouldBgMusicPlay: false,
        bgIsPlaying: false,
        audio: new Audio(bgMusic),
        successAudio: new Audio(success),
        failAudio: new Audio(fail),
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
        playSound(src: any) {
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
                    this.isPlayedOnce = true;
                });

                audio.play().then();
            }
        },

        playSuccess(volume?: number) {
            if (volume) this.successAudio.volume = volume;
            this.successAudio.play().then();
        },

        playFail(volume?: number) {
            if (volume) this.successAudio.volume = volume;
            this.failAudio.play().then();
        },

        onMountedBgMusic() {
            if (!this.bgIsPlaying && this.shouldBgMusicPlay) {
                this.bgIsPlaying = true;
                this.audio.volume = 0.1;
                this.audio.play().then(() => {
                    this.audio.loop = true;
                });

                this.bgIsPlaying = false;
            } else {
                this.audio.pause();
                this.audio.currentTime = 0;
                this.bgIsPlaying = false;
            }
        },
    },
});
