// Задание 1. Получить из A -> B не мутируя оригинальный объект. Поменять объект
export type OriginalTeam = {
    size: number;
    name: string;
    league: string;
};

export type ExpectedTeam = {
    name: string;
    league: string;
    roster: number;
};

export const originalTeamToExpectedTeam = (originalTeam: OriginalTeam): ExpectedTeam => {
    const { size, ...originalWithoutSize } = originalTeam;
    return { ...originalWithoutSize, name: 'New York Badgers', roster: 25 };
};

// Задание 2. Получить из A -> B не мутируя оригинальный объект. Поменять массив
export type SomeArray = Array<number | string>;

export const originalArrayToExpectedArray = (originalArray: SomeArray): SomeArray => {
    return ([] as SomeArray).concat(['two'], originalArray.slice(2, originalArray.length), [5]);
};

// Задание 3. Получить из A -> B не мутируя оригинальный объект. Поменять глубокий объект
export type Team = {
    name: string;
    captain: {
        name: string;
        age: number;
    };
};

export const originalTeamToExpectedTeam2 = (originalTeam: Team): Team => {
    return { ...originalTeam, captain: { ...originalTeam.captain, age: 28 } };
};
