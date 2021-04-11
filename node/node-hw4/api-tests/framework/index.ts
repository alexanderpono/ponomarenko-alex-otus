import { CoursesUsers } from './services/index';

export const coursesApiProvider = () => ({
    users: () => new CoursesUsers()
});
