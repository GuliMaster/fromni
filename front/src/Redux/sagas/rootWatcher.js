import { all } from 'redux-saga/effects';
import { getChannelsWatcher, getChannelParamsWatcher, addButtonWatcher, deleteButtonWatcher, saveChannelsWatcher } from './channelsSaga';

export default function* rootWatcher() {
    yield all([getChannelsWatcher(), getChannelParamsWatcher(), addButtonWatcher(), deleteButtonWatcher(), saveChannelsWatcher()]); 
}