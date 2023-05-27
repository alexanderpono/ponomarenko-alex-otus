import axios from 'axios';
import { Check, Checker200Data, CheckResult } from './checker.types';

export class Checker200 implements Check {
    async checkSite(info: Checker200Data): Promise<CheckResult> {
        try {
            const data = await axios(info.url);
            return {
                success: data.status === 200
            };
        } catch (e) {
            return {
                success: false,
                data: e
            };
        }
    }
}
