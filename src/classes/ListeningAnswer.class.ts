export default class ListeningAnswer {
    id!: number;
    src: any;
    title!: string;
    correct!: boolean;
    clicked!: boolean;

    constructor(params: Partial<ListeningAnswer>) {
        Object.assign(this, params);
    }
}
