import { Request, Response } from 'express';
import { MiddleWare } from './middleware.types';
import { call, put, runSaga } from '../lib/saga';
import { getAllSaga } from '../controllers/ApiUserController.saga';
import { User } from 'src/models/User';

interface GetUsersAnswer {
    success: boolean;
    users: User[];
}

const accessedRoutes = {
    user: [],
    admin: ['/api/users/', '/api/users/:id']
};
const GRANTED = true;
const DENIED = false;
const HTTP_UNAUTHORIZED = 401;
const HTTP_FORBIDDEN = 403;

function hasAccess(role: string, route: string): boolean {
    const accessArray = accessedRoutes[role];
    const UNKNOWN_ROLE = typeof accessArray === 'undefined';
    if (UNKNOWN_ROLE) {
        return DENIED;
    }
    const accessGranted = accessArray.indexOf(route) >= 0;
    return accessGranted;
}

export const auth: MiddleWare = (req: Request, resp: Response, next) => {
    function checkApiAuth() {
        if (req.header('Authorization') !== 'Basic dXNlcjpwYXNzd29yZA==') {
            console.log('auth middleware: Access Denied');
            resp.header('WWW-Authenticate', 'Basic');
            resp.sendStatus(HTTP_UNAUTHORIZED);
            return Promise.reject(HTTP_UNAUTHORIZED);
        }
        return Promise.resolve(GRANTED);
    }

    async function checkUserRole() {
        const userName = req.header('X-User-Name');
        if (!userName) {
            resp.sendStatus(HTTP_UNAUTHORIZED);
            return Promise.reject(HTTP_UNAUTHORIZED);
        }
        const result = (await runSaga(getAllSaga, resp, call, put)) as GetUsersAnswer;
        if (
            result === null ||
            typeof result !== 'object' ||
            typeof result['success'] === 'undefined' ||
            typeof result['users'] === 'undefined' ||
            !Array.isArray(result.users) ||
            result.success === false
        ) {
            resp.sendStatus(HTTP_UNAUTHORIZED);
            return Promise.reject(HTTP_UNAUTHORIZED);
        }

        let userInfo = result.users.find((value: User) => {
            return value.name === userName;
        });
        const USER_NOT_FOUND = typeof userInfo === 'undefined';
        if (USER_NOT_FOUND) {
            resp.sendStatus(HTTP_UNAUTHORIZED);
            return Promise.reject(HTTP_UNAUTHORIZED);
        }

        userInfo = userInfo as User;
        const userRole = typeof userInfo.role !== 'undefined' ? userInfo.role : 'user';

        console.log('auth userRole=', userRole);
        const accessGranted = hasAccess(userRole, req.route.path);
        if (accessGranted) {
            return Promise.resolve(GRANTED);
        }
        resp.sendStatus(HTTP_FORBIDDEN);
        return Promise.reject(HTTP_FORBIDDEN);
    }

    console.log('auth req.route.path=', req.route.path);

    checkApiAuth()
        .then(() => checkUserRole())
        .then(() => next())
        .catch((err) => {
            console.log('HTTP', err);
        });
};
