import { call, put, takeEvery } from "redux-saga/effects";
import { addButton, deleteButton, getButtons, getChannelParams, getChannels, saveChannels } from "../../API/api";
import { ADD_BUTTON, DELETE_BUTTON, FETCH_CHANNELS, FETCH_CHANNEL_PARAMS, SAVE_CHANNELS, setButtons, setChannelParams, setChannels, setError } from "../reducers/channelsReducer";

function* getChannelsWorker() {
    try {
        const data = yield call(() => getChannels().then(res => res.data));
        yield put(setChannels(data));
    }
    catch (e) {
        yield put(setError(`Ошибка: ${e.response.data.code} - ${e.response.data.message}`));
    }
}

export function* getChannelsWatcher() {
    yield takeEvery(FETCH_CHANNELS, getChannelsWorker);
}


function* getChannelParamsWorker(action) {
    try {
        const data = yield call(() => getChannelParams(action.id).then(res => res.data));
        yield put(setChannelParams(data));
    }
    catch (e) {
        yield put(setError(`Ошибка: ${e.response.status} - ${e.response.statusText}`));
    }
}

export function* getChannelParamsWatcher() {
    yield takeEvery(FETCH_CHANNEL_PARAMS, getChannelParamsWorker);
}

function* addButtonWorker(action) {
    try {
        yield call(() => addButton(action.button));
        const data = yield call(() => getButtons(action.button.idChannel).then(res => res.data));
        yield put(setButtons(action.button.idChannel, data));
    }
    catch (e) {
        yield put(setError(`Ошибка: ${e.response.status} - ${e.response.statusText}`));
    }
}

export function* addButtonWatcher() {
    yield takeEvery(ADD_BUTTON, addButtonWorker);
}

function* deleteButtonWorker(action) {
    try {
        yield call(() => deleteButton(action.id));
        const data = yield call(() => getButtons(action.idChannel).then(res => res.data));
        yield put(setButtons(action.idChannel, data));
    }
    catch (e) {
        yield put(setError(`Ошибка: ${e.response.status} - ${e.response.statusText}`));
    }
}

export function* deleteButtonWatcher() {
    yield takeEvery(DELETE_BUTTON, deleteButtonWorker);
}

function* saveChannelsWorker(action) {
    try {
        yield call(() => saveChannels(action.channels));
    }
    catch (e) {
        yield put(setError(`Ошибка: ${e.response.status} - ${e.response.statusText}`));
    }
}

export function*saveChannelsWatcher() {
    yield takeEvery(SAVE_CHANNELS, saveChannelsWorker);
}