import { defineStore } from 'pinia';
import { useSpeechSynthesis } from '@vueuse/core';

interface SpeechStore {
    voice: SpeechSynthesisVoice | undefined;
    speech: ReturnType<typeof useSpeechSynthesis>;
    synth: SpeechSynthesis;
    voices: SpeechSynthesisVoice[];
    filteredVoices: SpeechSynthesisVoice[];
}

export const useTextToSpeechStore = defineStore('textToSpeech', {
    state: (): SpeechStore => ({
        voice: undefined as SpeechSynthesisVoice | undefined,
        speech: useSpeechSynthesis(''),
        synth: window.speechSynthesis,
        voices: [] as SpeechSynthesisVoice[],
        filteredVoices: [] as SpeechSynthesisVoice[],
    }),

    actions: {
        // load voices onMounted in component
        async onMounted() {
            await this.loadVoices();

            // only display german and english
            this.filteredVoices = this.voices.filter((voice) => voice.lang === 'en-GB');

            const microsoftEdge = this.voices.find(
                (voice) =>
                    voice.name === 'Microsoft Ryan Online (Natural) - English (United Kingdom)'
            );
            const chrome = this.voices.find((voice) => voice.name === 'Google UK English Male');

            const firefox = this.voices.find(
                (voice) => voice.name === 'Microsoft Zira Desktop - English (United States)'
            );

            // not all browser have the same amount of voices, set a decent one for each
            this.voice = chrome || microsoftEdge || firefox;
        },

        loadVoices() {
            return new Promise<void>((resolve) => {
                if (this.synth.getVoices().length > 0) {
                    this.voices = this.synth.getVoices();
                    resolve();
                } else {
                    this.synth.onvoiceschanged = () => {
                        this.voices = this.synth.getVoices();
                        resolve();
                    };
                }
            });
        },

        playVoice(txt: string) {
            this.speech = useSpeechSynthesis(txt, {
                voice: this.voice,
            });
            this.speech.speak();
        },
    },
});
