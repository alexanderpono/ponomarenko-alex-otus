export class Search {
    searchFullScan(text: string, mask: string): number {
        let t: number = 0;
        while (t <= text.length - mask.length) {
            let m: number = 0;
            while (m < mask.length && text[t + m] === mask[m]) {
                m++;
            }
            if (m === mask.length) {
                return t;
            }
            t++;
        }
        return -1;
    }

    static create(): Search {
        return new Search();
    }
}
