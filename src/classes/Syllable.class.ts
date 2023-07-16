export default class Syllable {
    id: number;
    syllables: number;
    word: string;
    src: any;

    constructor(params: Partial<Syllable>) {
        Object.assign(this, params);
    }
}
