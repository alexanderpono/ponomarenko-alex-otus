import { HashTable } from './HashTable';

console.log('app!');

const table = new HashTable();
table.print();

table.set('abc', 12);
table.set('kit', 323);
table.set('cat', 324);
table.set('dot', 5);
table.print();

table.set('dec', 125);
table.print();
