export class City {
    public id: number;
    public title: string;

    constructor() {
        this.id = 0;
        this.title = '';
    }
}

export const emptyCity: City = {
    id: 0,
    title: ''
};
