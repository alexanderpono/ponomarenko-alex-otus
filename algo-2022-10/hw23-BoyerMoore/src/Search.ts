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

    searchReverseScan(text: string, mask: string): number {
        let t: number = 0;
        while (t <= text.length - mask.length) {
            let m = mask.length - 1;
            const ttm = text[t + m];
            const mm = mask[m];
            while (m >= 0 && text[t + m] === mask[m]) {
                m--;
                const ttm = text[t + m];
                const mm = mask[m];
            }
            if (m < 0) {
                return t;
            }
            t++;
        }
        return -1;
    }

    searchBMH = (text: string, mask: string) => this.searchBoyerMooreHorsepool(text, mask);

    searchBoyerMooreHorsepool(text: string, mask: string) {
        const shift: number[] = this.createMBHShift(mask);
        // console.log('searchBMH() shift=', shift);
        let t: number = 0;
        while (t <= text.length - mask.length) {
            let m = mask.length - 1;
            // const b1 = m >= 0;
            const ttm = text[t + m];
            const mm = mask[m];
            while (m >= 0 && text[t + m] === mask[m]) {
                // const b1 = m >= 0;
                const ttm = text[t + m];
                const mm = mask[m];
                // console.log('b1=', b1);
                // console.log('ttm=', ttm);
                // console.log('mm=', mm);
                m--;
            }
            if (m < 0) {
                return t;
            }
            const a = t + mask.length - 1;
            const b = text[a].charCodeAt(0);
            const c = shift[b];
            t += shift[text[t + mask.length - 1].charCodeAt(0)];
        }
        if (text[t] === mask[0]) {
            return t;
        }
        return -1;
    }

    private createMBHShift(mask: string): number[] {
        const shift: number[] = new Array(128); //new int[128]
        for (let j = 0; j < shift.length; j++) {
            shift[j] = mask.length;
        }
        for (let m = 0; m < mask.length - 1; m++) {
            shift[mask[m]] = mask.length - m - 1;
        }
        return shift;
    }

    static create(): Search {
        return new Search();
    }
}
