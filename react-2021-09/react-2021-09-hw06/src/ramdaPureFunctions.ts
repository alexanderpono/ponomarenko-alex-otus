import * as R from 'ramda';
const { compose, join, map, keys } = R;

// Задание 1. Лучшая команда (наибольшее кол-во очков), выводим имя
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
    //step0 - solution from pureFunctions.ts
    const best = teams.reduce((prev: Team, cur: Team) => (prev.score > cur.score ? prev : cur));
    const res0 = best.name;

    //step1
    const reduceCallback = (prev: Team, cur: Team) => (prev.score > cur.score ? prev : cur);
    const getName = (t: Team) => t.name;
    const res1 = getName(teams.reduce(reduceCallback));

    //step2
    const skipFirst = (teams: Team[]) => {
        const [first, ...tail] = teams;
        return teams;
    };
    const res2 = getName(R.reduce(reduceCallback, teams[0], skipFirst(teams)));

    //step3
    const res3 = R.compose(getName, R.reduce(reduceCallback))(teams[0], skipFirst(teams));

    //step4
    const myReduce = (teams: Team[]): Team => {
        const [first, ...tail] = teams;
        return R.reduce(reduceCallback, first, tail);
    };
    const res4 = compose(getName, myReduce)(teams);

    return res4;
};

// Задание 2. Querystring из объекта
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
    //step0 - solution from pureFunctions.ts
    const qs0 = Object.keys(qsObj)
        .map((key: string) => `${key}=${qsObj[key]}`)
        .join('&');
    const res0 = '?' + qs0;

    //step1
    const mykeys1 = Object.keys(qsObj);
    const mapCallback = (key: string) => `${key}=${qsObj[key]}`;
    const m1 = mykeys1.map(mapCallback);
    const qs1 = m1.join('&');
    const makeQs = (qs: string): string => '?' + qs;
    const res1 = makeQs(qs1);

    //step2
    const mykeys2 = R.keys(qsObj);
    const m2 = R.map(mapCallback)(mykeys2);
    const qs2 = R.join('&')(m2);
    const res2 = makeQs(qs2);

    //step3
    const res3 = makeQs(R.join('&')(R.map(mapCallback)(R.keys(qsObj))));

    //step4
    const res4 = R.compose(makeQs, R.join('&'), R.map(mapCallback), R.keys)(qsObj);

    //step5
    const res5 = compose(makeQs, join('&'), map(mapCallback), keys)(qsObj);

    return res5;
};

// Задание 3. Объект из querystring
export const parseQs = (qs: string): QsObj => {
    //step0 - solution from pureFunctions.ts
    const qsWithoutQuestion = qs.substring(1);
    const equationObjectsAr: QsObj[] = qsWithoutQuestion.split('&').map((equation: string) => {
        const [key, value] = equation.split('=');
        return { [key]: value };
    });
    const res0 = Object.assign({}, ...equationObjectsAr);

    //step1
    const qsWithoutQuestion1 = qs.substring(1);
    const mapCallback = (equation: string) => {
        const [key, value] = equation.split('=');
        return { [key]: value };
    };
    const equationObjectsAr1: QsObj[] = qsWithoutQuestion1.split('&').map(mapCallback);
    const res1 = Object.assign({}, ...equationObjectsAr1);

    //step2
    const skipFirst = (s: string): string => s.substring(1);
    const qsWithoutQuestion2 = skipFirst(qs);
    const splitAmp = (s: string): string[] => s.split('&');
    const ar2 = splitAmp(qsWithoutQuestion2);
    const equationObjectsAr2: QsObj[] = ar2.map(mapCallback);
    const objAssign = (ar: QsObj[]): QsObj => Object.assign({}, ...ar);
    const res2 = objAssign(equationObjectsAr2);

    //step3
    const qsWithoutQuestion3 = skipFirst(qs);
    const ar3 = splitAmp(qsWithoutQuestion3);
    const equationObjectsAr3: QsObj[] = R.map(mapCallback)(ar3);
    const res3 = objAssign(equationObjectsAr3);

    //step4
    const res4 = objAssign(R.map(mapCallback)(splitAmp(skipFirst(qs))));

    //step5
    const res5 = R.compose(objAssign, R.map(mapCallback), splitAmp, skipFirst)(qs);

    //step6
    const res6 = compose(objAssign, map(mapCallback), splitAmp, skipFirst)(qs);

    return res6;
};
