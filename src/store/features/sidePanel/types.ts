/* eslint-disable @typescript-eslint/no-explicit-any */
export type UnknownObject = {
  [key: string]: any;
};

export type SidePanelWithDataPayload = {
  key: string;
  data: UnknownObject;
};

export type SidePanelState = {
  isOpen: boolean;
  isLoading: boolean;
  data: UnknownObject;
  isNestedOpen: boolean;
  nestedData: UnknownObject;
  sidePanelKey: string;
  openSidePanel: () => void;
  openSidePanelWithData: (payload: SidePanelWithDataPayload) => void;
  openNestedSidePanel: () => void;
  closeSidePanel: () => void;
  closeNestedSidePanel: () => void;
  setSidePanelData: (payload: UnknownObject) => void;
  setNestedSidePanelData: (payload: UnknownObject) => void;
  setSidePanelKey: (payload: string) => void;
  setLoading: (payload: boolean) => void;
};

export interface DataObject {
  [key: string]: any;
}
