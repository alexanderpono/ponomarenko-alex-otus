import { Param, Body, Get, Post, Put, Delete, JsonController, Res } from 'routing-controllers';
import Validator from 'schema-validator';
import { User } from 'src/models/User';
import { getUserRepository } from '../repositories/UserRepository';

interface Response {
    status: (n: number) => void;
    json: (n: Record<string, unknown>) => void;
}

@JsonController('/api/users')
export class ApiUserController {
    @Get('/')
    async getAll(@Res() res: Response) {
        let users: User[] = [];
        try {
            users = await getUsers();
        } catch (err) {
            res.status(500);
            res.json(err);
            return res;
        }

        return { users };
    }

    @Get('/:id')
    async getOne(@Param('id') id: number, @Res() res: Response) {
        let user: User | null = null;
        try {
            user = await findUser(id);
        } catch (err) {
            res.status(400);
            res.json(err);
            return res;
        }
        return user;
    }

    @Post('/')
    async post(@Body() input: User, @Res() res: Response) {
        try {
            await validateUser(input);
        } catch (err) {
            res.status(400);
            res.json(err);
            return res;
        }

        try {
            await insertUser(input);
        } catch (err) {
            res.status(500);
            res.json(err);
            return res;
        }

        res.status(201);
        return { success: true };
    }

    @Put('/:id')
    async put(@Param('id') id: number, @Body() input, @Res() res: Response) {
        try {
            await validateUser(input);
        } catch (err) {
            res.status(400);
            res.json(err);
            return res;
        }

        let dbUser: User | null = null;
        try {
            dbUser = await findUser(id);
        } catch (err) {
            res.status(400);
            res.json(err);
            return res;
        }
        if (dbUser.id !== input['id']) {
            res.status(400);
            res.json({
                result: false,
                data: { id: dbUser.id, message: 'CANNOT CHANGE KEY FIELD', newId: input['id'] }
            });
            return res;
        }

        dbUser = Object.assign(dbUser, input);
        return { success: true };
    }

    @Delete('/:id')
    async remove(@Param('id') id: number, @Res() res: Response) {
        try {
            await findUser(id);
        } catch (err) {
            res.status(400);
            res.json(err);
            return res;
        }

        try {
            await deleteUser(id);
        } catch (err) {
            res.status(400);
            res.json(err);
            return res;
        }

        return { success: true };
    }
}

function validateUser(input: User) {
    return new Promise((resolve, reject) => {
        const rootSchema = {
            name: {
                type: String,
                required: true
            }
        };
        const validator = new Validator(rootSchema);
        const check = validator.check(input);

        if (check._error === true) {
            const errors = Object.entries(check).filter((entry) => {
                return entry[0] !== '_error';
            });
            reject({ success: false, errors });
        } else {
            resolve(input);
        }
    });
}

async function insertUser(user: User): Promise<void> {
    const repo = await getUserRepository();
    const newUser: User = JSON.parse(JSON.stringify(user));
    newUser.id = await repo.getNewId();
    return repo.add(newUser);
}

async function getUsers(): Promise<User[]> {
    const repo = await getUserRepository();
    return repo.entities;
}

async function findUser(id: number): Promise<User> {
    const repo = await getUserRepository();
    const record = await repo.find('id', id);
    if (typeof record === 'undefined') {
        return Promise.reject({ result: false, data: { id, message: 'NOT FOUND' } });
    }
    return Promise.resolve(record);
}

async function deleteUser(id: number): Promise<void> {
    const repo = await getUserRepository();
    try {
        await repo.delete('id', id);
    } catch (e) {
        return Promise.reject({ result: false, data: { id, message: 'NOT FOUND' } });
    }
    return Promise.resolve();
}
