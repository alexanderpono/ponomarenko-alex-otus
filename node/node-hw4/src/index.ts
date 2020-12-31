import { Handler } from './somelib';
import { DeepDependency } from './test/deep/Dependency';
import lib from './lib';
import libold from './libold';
import { Fetcher } from './lib/fetcher';

import { CheckersFabric, Checker200Data, Check200 } from './checker';

const handler = new Handler();
handler.sayMyName();
console.log({ lib, libold });

const depDep = new DeepDependency('NameDep');
depDep.sayYourName();

const fetcher = new Fetcher();
console.log('Script started');
const people = fetcher.fetchPeople();
people.forEach((el) => {
    console.log('name is ', el.name);
    console.log('city is ', fetcher.fetchCityById(el.city_id).title);
});

const fabric = new CheckersFabric();
const checker200 = fabric.getChecker(Check200);
const checkInfo: Checker200Data = {
    url: 'https://ya.ru'
};
if (checker200 !== null && typeof checker200.checkSite === 'function') {
    checker200.checkSite(checkInfo).then((result) => {
        console.log(checkInfo.url, result);
    });
}
