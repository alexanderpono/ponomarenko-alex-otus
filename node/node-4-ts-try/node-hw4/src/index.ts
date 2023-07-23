import { Handler } from './somelib';
import { DeepDependency } from './test/deep/Dependency';
import lib from './lib';
import libold from './libold';
import { Fetcher } from './lib/fetcher';
import { CheckersFactory, Checker200Data, Check200 } from './checker';
import { App } from './app/App';
import { HomeController } from './controller/HomeController';
import { logger as loggerMiddleware } from './middleware/logger';
import * as bodyParser from 'body-parser';
import { Repository } from './lib/Repository';
import { Book } from './models/Book';

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

const fabric = new CheckersFactory();
const checker200 = fabric.getChecker(Check200);
const checkInfo: Checker200Data = {
    url: 'https://ya.ru'
};
if (checker200 !== null && typeof checker200.checkSite === 'function') {
    checker200.checkSite(checkInfo).then((result) => {
        console.log(checkInfo.url, result);
    });
}

const app = new App({
    port: 5000,
    routes: [new HomeController()],
    middleWares: [bodyParser.json(), bodyParser.urlencoded({ extended: true }), loggerMiddleware]
});

app.listen();

const index = new Repository<Book>();
index.add({
    author: 'Anton',
    title: 'Awesome typescript'
});
index.add({
    author: 'Ivan',
    title: 'Awesome php'
});
console.log('current entities', index.entities); //Добавили элемент в репозиторий
const book = index.find('author', 'Anton');
console.log('found', book);

index.delete('author', 'Ivan');
console.log('current entities after delete', index.entities); //Добавили элемент в репозиторий
