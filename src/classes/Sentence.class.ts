export default class Sentence {
    id: number;
    text: string;
    placed: boolean;

    constructor(params: Partial<Sentence>) {
        Object.assign(this, params);
    }
}
