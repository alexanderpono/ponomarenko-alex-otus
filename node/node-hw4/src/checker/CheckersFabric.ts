import { Check } from './checker.types';
import { Checker200 } from './Checker200';

export const Check200 = '200check';

export class CheckersFabric {
    private checkersMap = {
        '200check': Checker200
    };

    public getChecker(type: string): Check | null {
        if (!this.checkersMap[type]) {
            return null;
        }
        console.log({ type });
        return new this.checkersMap[type]();
    }
}
