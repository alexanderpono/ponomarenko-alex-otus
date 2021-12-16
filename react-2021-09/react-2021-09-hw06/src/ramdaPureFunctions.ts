import * as R from 'ramda';

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
    const res4 = R.compose(getName, myReduce)(teams);

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

    return res4;
};

// Задание 3. Объект из querystring
export const parseQs = (qs: string): QsObj => {
    //step0 - solution from pureFunctions.ts
    const qsWithoutQuestion = qs.substring(1);
    const equationsAr = qsWithoutQuestion.split('&').map((equation: string) => equation.split('='));
    const res0 = Object.fromEntries(equationsAr);

    //step1
    const qsWithoutQuestion1 = qs.substring(1);
    const mapCallback = (equation: string) => R.split('=')(equation);
    const equationsAr1 = R.split('&')(qsWithoutQuestion1).map(mapCallback);
    const res1 = Object.fromEntries(equationsAr1);

    //step2
    const skipQuest = (s: string): string => R.replace('?', '')(s);
    const qsWithoutQuestion2 = skipQuest(qs);
    const ar2 = R.split('&')(qsWithoutQuestion2);
    const equationsAr2 = ar2.map(mapCallback);
    const buildObj = (ar: string[][]) => Object.fromEntries(ar);
    const res2 = buildObj(equationsAr2);

    //step3
    const qsWithoutQuestion3 = skipQuest(qs);
    const ar3 = R.split('&', qsWithoutQuestion2);
    const equationsAr3 = R.map(mapCallback)(ar3);
    const res3 = buildObj(equationsAr3);

    //step4
    const res4 = buildObj(R.map(mapCallback)(R.split('&')(skipQuest(qs))));

    //step5
    const res5 = R.compose(buildObj, R.map(mapCallback), R.split('&'), R.replace('?', ''))(qs);

    //step6
    const res6 = R.compose(
        (ar: string[][]) => Object.fromEntries(ar),
        R.map((equation: string) => R.split('=')(equation)),
        R.split('&'),
        R.replace('?', '')
    )(qs);

    return res6;
};
