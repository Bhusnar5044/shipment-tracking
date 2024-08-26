import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/store/store';

import type { SidePanelState, SidePanelWithDataPayload, UnknownObject } from './types';

const initialState = {
  isOpen: false,
  isNestedOpen: false,
  data: {},
  nestedData: {},
  sidePanelKey: '',
} as SidePanelState;

export const sidePanelSlice = createSlice({
  name: 'sidePanel',
  initialState,
  reducers: {
    openSidePanel: (state) => {
      state.isOpen = true;
    },
    openNestedSidePanel: (state) => {
      state.isNestedOpen = true;
    },
    openSidePanelWithData: (state, action: PayloadAction<SidePanelWithDataPayload>) => {
      state.isOpen = true;
      state.sidePanelKey = action.payload.key;
      state.data = action.payload.data;
    },
    closeSidePanel: (state) => {
      state.isOpen = false;
      state.data = {};
    },
    closeNestedSidePanel: (state) => {
      state.isNestedOpen = false;
      state.nestedData = {};
    },
    setSidePanelData: (state, action: PayloadAction<UnknownObject>) => {
      state.data = action.payload;
    },
    setNestedSidePanelData: (state, action: PayloadAction<UnknownObject>) => {
      state.nestedData = action.payload;
    },
    setSidePanelKey: (state, action: PayloadAction<string>) => {
      state.sidePanelKey = action.payload;
    },
  },
});

export const {
  openSidePanel,
  openSidePanelWithData,
  openNestedSidePanel,
  closeSidePanel,
  closeNestedSidePanel,
  setSidePanelData,
  setNestedSidePanelData,
  setSidePanelKey,
} = sidePanelSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCart = (state: RootState) => state.sidePanel;

export default sidePanelSlice.reducer;
