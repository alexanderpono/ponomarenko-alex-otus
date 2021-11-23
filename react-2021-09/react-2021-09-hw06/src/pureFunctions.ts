// Задание 1. Лучшая команда (наибольшее кол-во очков), выводим имя
export type Team = { name: string; score: number };

export const getTopName = (teams: Team[]): string => {
    const best = teams.reduce((prev: Team, cur: Team) => (prev.score > cur.score ? prev : cur));
    return best.name;
};

// Задание 2. Querystring из объекта
export type QsObj = Record<string, string | number | boolean | object>;

export const createQs = (qsObj: QsObj): string => {
    const qs = Object.keys(qsObj)
        .map((key: string) => `${key}=${qsObj[key]}`)
        .join('&');
    return qs ? '?' + qs : '';
};

// Задание 3. Объект из querystring
export const parseQs = (qs: string): QsObj => {
    const qsWithoutQuestion = qs.substring(1);
    const equationObjectsAr: QsObj[] = qsWithoutQuestion.split('&').map((equation: string) => {
        const [key, value] = equation.split('=');
        return { [key]: value };
    });
    return Object.assign({}, ...equationObjectsAr);
};
