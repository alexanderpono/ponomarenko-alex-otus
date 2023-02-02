import { PackRLE } from './PackRLE';

class Program {
    main() {
        const pack = PackRLE.create();
        const text = 'AAAABBCDDDD';
        console.log('packRLE() text=', text);
        const result = pack.packRLE(PackRLE.stringToCodesArray(text));
        console.log('packRLE() result=', PackRLE.archiveDataToString(result));

        const archiveStr = '4-A,2-B,1-C,4-D';
        console.log('unpackRLE() archiveStr=', archiveStr);
        const archData = PackRLE.stringToArchiveData(archiveStr);
        console.log('unpackRLE() archData=', archData);
        const result2 = pack.unpackRLE(archData);
        console.log('unpackRLE() result2=', PackRLE.codesArrayToString(result2));
    }

    static create(): Program {
        return new Program();
    }
}

Program.create().main();
