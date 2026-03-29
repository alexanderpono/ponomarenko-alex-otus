import { call, put, takeEvery } from 'redux-saga/effects';
import { app, AppEvent, RegisterAction } from './appReducer';
import { ApiErrorAnswer, AuthResult } from 'src/features/services/AuthAPI/AuthAPI.types';
import { COMMAND_ID, getApiUrl } from 'src/constants/config';
import { CONTENT_JSON, HTTP_OK } from 'src/constants/API';

// eslint-disable-next-line require-yield
export function* helloSaga() {
    console.log('Hello Sagas!');
}

export function* watchRegister() {
    yield takeEvery(AppEvent.REGISTER, registerSaga);
}

export function* registerSaga(action: RegisterAction) {
    try {
        const result: Response = yield call(fetch, getApiUrl() + '/signup', {
            method: 'POST',
            headers: {
                'Content-type': CONTENT_JSON
            },
            body: JSON.stringify({
                email: action.payload.registerParams.login,
                password: action.payload.registerParams.password,
                commandId: COMMAND_ID
            })
        });
        const answer: AuthResult | ApiErrorAnswer = yield call([result, 'json']);
        if (result.status !== HTTP_OK) {
            if (Array.isArray((answer as ApiErrorAnswer)?.errors) && (answer as ApiErrorAnswer)?.errors?.length > 0) {
                const errorInfo = (answer as ApiErrorAnswer).errors[0];
                yield put(app.apiErrorMessage(errorInfo.message));
            }
            return;
        } else {
            yield put(app.apiErrorMessage('Успешная регистрация ' + (answer as AuthResult)?.profile?.email));
        }
    } catch (e) {
        yield put(app.apiErrorMessage(e?.message));
    }
}
