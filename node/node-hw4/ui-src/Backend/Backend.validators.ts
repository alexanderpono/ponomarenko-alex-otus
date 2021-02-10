import Validator from 'schema-validator';

interface User {
    name: string;
    id: number;
}

export interface GetUsersAnswer {
    success: boolean;
    users: User[];
}

export interface ValidateResult {
    errors: { field: string; message: string; received?: string; expected?: string }[];
}

export function getValidateErrors(
    errors: unknown[],
    validatorErrors,
    validatedValue,
    prefix: string
): unknown[] {
    let newErrors = errors;

    if (validatorErrors._error === true) {
        newErrors = errors.concat();
        for (const key in validatorErrors) {
            if (key === '_error') {
                continue;
            }
            const errorInfo = validatorErrors[key];
            if (typeof errorInfo.required !== 'undefined') {
                newErrors.push({ field: `${prefix}${key}`, message: 'Missing required field' });
            }
            if (typeof errorInfo.type !== 'undefined') {
                if (validatedValue[key] !== null) {
                    newErrors.push({
                        field: `${prefix}${key}`,
                        message: 'Invalid data type',
                        expected: errorInfo.type.message.split(':')[1].trim(),
                        received: typeof validatedValue[key]
                    });
                }
            }
        }
    }
    return newErrors;
}

export function validateGetUsersAnswer(input: GetUsersAnswer): ValidateResult {
    const rootSchema = {
        success: {
            type: Boolean,
            required: true
        },
        users: {
            type: Array,
            required: true,
            length: {
                max: 20
            }
        }
    };

    const validator = new Validator(rootSchema);
    const check = validator.check(input);

    let errors = getValidateErrors([], check, input, '');
    if (Array.isArray(input.users)) {
        input.users.forEach(function (user: User, index: number) {
            if (typeof user !== 'object') {
                errors.push({
                    field: `user[${index}]`,
                    message: 'invalid data type',
                    expected: 'Object',
                    received: typeof user
                });
                return;
            }

            const userSchema = {
                name: {
                    type: String,
                    required: true
                },
                id: {
                    type: Number,
                    required: true
                }
            };
            const validator = new Validator(userSchema);
            const check = validator.check(user);
            errors = getValidateErrors(errors, check, user, `users[${index}].`);
        });
    }

    return { errors } as ValidateResult;
}
