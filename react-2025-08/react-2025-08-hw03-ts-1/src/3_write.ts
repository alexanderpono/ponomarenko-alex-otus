import faker from 'faker';

export const num = () => faker.datatype.number();
export const str = () => faker.random.words();
export const bool = () => faker.datatype.boolean();

/**
 * Функции написанные здесь пригодятся на последующих уроках
 * С помощью этих функций мы будем добавлять элементы в список для проверки динамической загрузки
 * Поэтому в идеале чтобы функции возвращали случайные данные, но в то же время не абракадабру.
 * В целом сделайте так, как вам будет удобно.
 * */

/**
 * Нужно создать тип Category, он будет использоваться ниже.
 * Категория содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка, необязательно)
 *
 * Продукт (Product) содержит
 * - id (строка)
 * - name (строка)
 * - photo (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - oldPrice (число, необязательно)
 * - price (число)
 * - category (Категория)
 *
 * Операция (Operation) может быть либо тратой (Cost), либо доходом (Profit)
 *
 * Трата (Cost) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Cost')
 *
 * Доход (Profit) содержит
 * - id (строка)
 * - name (строка)
 * - desc (строка, необязательно)
 * - createdAt (строка)
 * - amount (число)
 * - category (Категория)
 * - type ('Profit')
 * */

interface Category {
  id: string;
  name: string;
  photo?: string;
}

interface Product {
  id: string;
  name: string;
  photo: string;
  desc?: string;
  createdAt: string;
  oldPrice?: number;
  price: number;
  category: Category;
}

interface CommonOperation {
  id: string;
  name: string;
  desc?: string;
  createdAt: string;
  amount: number;
  category: Category;
}

interface Cost extends CommonOperation {
  type: 'Cost';
}

interface Profit extends CommonOperation {
  type: 'Profit';
}

type Operation = Cost | Profit;

const rndCategory = () => ({
  id: str(),
  name: str(),
  photo: '',
});

/**
 * Создает случайный продукт (Product).
 * Принимает дату создания (строка)
 * */
export const createRandomProduct = (createdAt: string): Product => ({
  id: str(),
  name: str(),
  photo: str(),
  desc: str(),
  createdAt,
  oldPrice: num(),
  price: num(),
  category: {
    id: str(),
    name: str(),
    photo: str(),
  },
});

const createRandomCommonOperation = (createdAt: string): CommonOperation => ({
  id: str(),
  name: str(),
  desc: str(),
  createdAt,
  amount: num(),
  category: rndCategory(),
});

/**
 * Создает случайную операцию (Operation).
 * Принимает дату создания (строка)
 * */
export const createRandomOperation = (createdAt: string): Operation => {
  if (bool()) {
    return {
      ...createRandomCommonOperation(createdAt),
      type: 'Cost',
    };
  } else {
    return {
      ...createRandomCommonOperation(createdAt),
      type: 'Profit',
    };
  }
};
