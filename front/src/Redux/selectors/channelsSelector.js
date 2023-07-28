import { createSelector } from "@reduxjs/toolkit";

export const selectChannels = (state) => state.channels.channels;

export const selectSelectedChannel = (state) => state.channels.selectedChannel;

export const selectSelectedChannelData = createSelector([selectChannels, selectSelectedChannel], 
    (channels, id) => (channels && id) && channels.find(el => el.id === id)
);

export const selectChannelParams = (state) => state.channels.channelParams;

export const selectTextLength = createSelector(selectChannelParams,
    (params) => params && (params[0].messageLength || 'не ограничено')
);

export const selectKeyboardParams = createSelector(selectChannelParams,
    (params) => params && params[1]
);

export const selectInlineParams = createSelector(selectKeyboardParams,
    (params) => params && params[0]
);

export const selectStandartParams = createSelector(selectKeyboardParams,
    (params) => params && params[1]
);

export const selectText = createSelector(selectSelectedChannelData,
    (selectedChannel) => selectedChannel && selectedChannel['text']
);

export const selectKeyboardType = createSelector(selectSelectedChannelData,
    (selectedChannel) => selectedChannel && selectedChannel['keyboardType']
);

export const selectButtons = createSelector(selectSelectedChannelData,
    (selectedChannel) => selectedChannel && selectedChannel['buttons']
);