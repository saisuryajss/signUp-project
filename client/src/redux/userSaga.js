import { all, call, put, takeLatest } from 'redux-saga/effects';
import userActionTypes from './userActionTypes';
import { registerUser } from '../httpRequests';
import { toast } from 'react-hot-toast';

function* signUp({ payload }) {
    const response = yield registerUser(payload);
    // console.log(response);
    if (response.status === 'ok') {
        yield put({ type: userActionTypes.SIGN_UP_SUCCESS, payload: response.data });
        toast.success('registration successful');
    }
    else {
        toast.error(response.message);
        yield put({ type: userActionTypes.FAILURE });
    }
    yield put({type:"STOP"});
}


export function* signUpWithEmail() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export default function* userSaga() {
    yield all([
        call(signUpWithEmail),
    ]);
}