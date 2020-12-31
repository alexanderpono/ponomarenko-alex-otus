import { Handler } from './somelib';
import { DeepDependency } from './test/deep/Dependency';
import lib from './lib';
import libold from './libold';
import { Fetcher } from './lib/fetcher';

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
