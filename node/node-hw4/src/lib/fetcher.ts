import { City, emptyCity } from '../types/city';
import { Person } from '../types/person';

export class Fetcher {
    fetchCities(): City[] {
        return [
            {
                id: 1,
                title: 'Moscow'
            },
            {
                id: 2,
                title: 'Moscow'
            }
        ];
    }

    fetchCityById(id: number): City {
        const city: City | undefined = this.fetchCities().find((e) => e.id === id);
        if (typeof city === 'undefined') {
            return emptyCity;
        }
        return city;
    }

    fetchPeople(): Person[] {
        return [
            {
                id: 1,
                name: 'Anton',
                city_id: 2
            },
            {
                id: 2,
                name: 'Ivan',
                city_id: 2
            },
            {
                id: 3,
                name: 'David',
                city_id: 1
            }
        ];
    }
}
