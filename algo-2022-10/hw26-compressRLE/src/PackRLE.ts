export interface ArchiveRecord {
    char: number;
    count: number;
}
export class PackRLE {
    packRLE = (codesAr: number[]): ArchiveRecord[] => {
        if (codesAr.length === 0) {
            return [];
        }
        let currentChar = codesAr[0];
        let charsCounter = 1;

        const result: ArchiveRecord[] = [];
        for (let i = 1; i < codesAr.length; i++) {
            const char = codesAr[i];
            if (char === currentChar) {
                charsCounter++;
            } else {
                result.push({
                    char: currentChar,
                    count: charsCounter
                });
                currentChar = char;
                charsCounter = 1;
            }
        }
        result.push({
            char: currentChar,
            count: charsCounter
        });

        return result;
    };

    unpackRLE = (archiveData: ArchiveRecord[]): number[] => {
        const repeat = (code: number, count: number): number[] => Array(count).fill(code);

        const result1: number[][] = archiveData.map((record: ArchiveRecord) =>
            repeat(record.char, record.count)
        );
        const result2: number[] = result1.reduce(
            (prev: number[], cur: number[]) => [...prev, ...cur],
            []
        );
        return result2;
    };

    static archiveDataToString = (archiveData: ArchiveRecord[]): string =>
        archiveData
            .map((record: ArchiveRecord) => `${record.count}-${String.fromCharCode(record.char)}`)
            .join(',');

    static archiveDataToNumbers = (archiveData: ArchiveRecord[]): number[] =>
        archiveData.reduce((prev: number[], record: ArchiveRecord) => {
            return [...prev, record.count, record.char];
        }, []);

    static numbersToArchiveData = (data: number[]): ArchiveRecord[] => {
        const archiveData: ArchiveRecord[] = [];
        for (let i = 0; i < data.length; i += 2) {
            const count = data[i];
            const charCode = data[i + 1];
            archiveData.push({
                count,
                char: charCode
            });
        }
        return archiveData;
    };

    static stringToCodesArray = (text: string): number[] =>
        text.split('').map((char: string) => char.charCodeAt(0));

    static stringToArchiveData = (arhiveS: string): ArchiveRecord[] =>
        arhiveS.split(',').map((recordS: string): ArchiveRecord => {
            const recordAr = recordS.split('-');
            return {
                char: recordAr[1].charCodeAt(0),
                count: parseInt(recordAr[0])
            };
        });

    static codesArrayToString = (codes: number[]): string =>
        codes.map((code: number) => String.fromCharCode(code)).join('');

    static bufferToCodesArray = (buffer: Buffer): number[] =>
        buffer.reduce((prev: number[], code: number) => {
            return [...prev, code];
        }, []);

    static create(): PackRLE {
        return new PackRLE();
    }
}
