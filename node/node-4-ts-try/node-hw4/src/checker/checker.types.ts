export type CheckResult = {
    success: boolean;
    data?: Record<string, unknown>;
};

export interface CheckerData {}

export interface Check {
    checkSite(info: CheckerData): Promise<CheckResult>;
}

export interface Checker200Data extends CheckerData {
    url: string;
}
