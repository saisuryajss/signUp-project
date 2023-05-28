import { all, call, put, takeLatest } from 'redux-saga/effects';
import userActionTypes from './userActionTypes';
import { registerUser,fetchCurrentUser } from '../httpRequests';
import { toast } from 'react-hot-toast';

function* signUp({ payload }) {
    const response = yield registerUser(payload);
    console.log(response);
    if (response.status === 'ok') {
        yield put({ type: userActionTypes.SIGN_UP_SUCCESS, payload: response.data });
        toast.success('registration successful');
    }
    else {
        toast.error(response.message);
        yield put({ type: userActionTypes.FAILURE });
    }
}

function* fetchUser({payload}){
    const response = yield fetchCurrentUser(payload.token);
    if (response.status === 'ok') {
        yield put({ type: userActionTypes.EDIT_DETAILS_SUCCESS, payload: response.data });
    }
    else {
        yield put({ type: userActionTypes.EDIT_DETAILS_FAILURE });
    }
}


export function* signUpWithEmail() {
    yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}


export function* getUser(){
    yield takeLatest(userActionTypes.FETCH_USER,fetchUser)
}

export default function* userSaga() {
    yield all([
        call(signUpWithEmail),
        call(getUser)
    ]);
}