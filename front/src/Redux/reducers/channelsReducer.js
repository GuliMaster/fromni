const SET_CHANNELS = 'SET_CHANNELS';
const SWITCH_CHANNEL = 'SWITCH_CHANNEL';
const SET_SELECTED_CHANNEL = 'SET_SELECTED_CHANNEL';
const SET_CHANNEL_PARAMS = 'SET_CHANNEL_PARAMS';
const SET_SETTINGS = 'SET_SETTINGS';
const SET_BUTTONS = 'SET_BUTTONS';
const SET_ERROR = 'SET_ERROR';

export const FETCH_CHANNELS = 'FETCH_CHANNELS';
export const FETCH_CHANNEL_PARAMS = 'FETCH_CHANNEL_PARAMS';
export const ADD_BUTTON = 'ADD_BUTTON';
export const DELETE_BUTTON = 'DELETE_BUTTON';
export const SAVE_CHANNELS = 'SAVE_CHANNELS';

const initState = [{
    channels: [],
    selectedChannel: null,
    channelParams: null,
    error: null
}];

const channelsReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_CHANNELS:
            return {
                ...state,
                channels: action.channels
            }
        case SWITCH_CHANNEL:
            let maxOrder, 
                channel = action.channel,
                checked = action.checked;
            if (action.checked) maxOrder = Math.max(...state.channels.map(el => el.order));
            return {
                ...state,
                channels: state.channels.map(el => {
                    if (el.id === channel.id && checked) {
                        return {...el, order: maxOrder+1}
                    }
                    if (el.id === channel.id && !checked) {
                        return {...el, order: null}
                    }
                    if (el.id !== channel.id && !checked) {
                        return {...el, order: el.order > channel.order ? el.order - 1 : el.order}
                    }
                    return el;
                })
            }
        case SET_SELECTED_CHANNEL:
            return {
                ...state,
                selectedChannel: action.selectedChannel
            }
        case SET_CHANNEL_PARAMS:
            return {
                ...state,
                channelParams: action.params
            }
        case SET_SETTINGS:
            return {
                ...state,
                channels: state.channels.map(el => {
                    if (el.id === action.id) {
                        return {...el, [action.field]: action.value}
                    }
                    return el;
                })
            }
        case SET_BUTTONS:
            return {
                ...state,
                channels: state.channels.map(el => {
                    if (el.id === action.id) {
                        return {...el, buttons: action.buttons}
                    }
                    return el;
                })
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}

export const setChannels = (channels) => ({type: SET_CHANNELS, channels});
export const switchChannel = (channel, checked) => ({type: SWITCH_CHANNEL, channel, checked});
export const setSelectedChannel = (selectedChannel) => ({type: SET_SELECTED_CHANNEL, selectedChannel}); 
export const setChannelParams = (params) => ({type: SET_CHANNEL_PARAMS, params});
export const setSettings = (id, field, value) => ({type: SET_SETTINGS, id, field, value});
export const setButtons = (id, buttons) => ({type: SET_BUTTONS, id, buttons});
export const setError = (error) => ({type: SET_ERROR, error});

export const fetchChannels = () => ({type: FETCH_CHANNELS});
export const fetchChannelParams = (id) => ({type: FETCH_CHANNEL_PARAMS, id});
export const addButton = (button) => ({type: ADD_BUTTON, button});
export const deleteButton = (id, idChannel) => ({type: DELETE_BUTTON, id, idChannel});
export const saveChannels = (channels) => ({type: SAVE_CHANNELS, channels});

export default channelsReducer;