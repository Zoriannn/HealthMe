import { createSlice } from '@reduxjs/toolkit';


export const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    loading: false,
    alert: [],
    selected: null,
    isChatbotOpen: false,
    userInputLatest: '',
    fromForum: '',
  },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    setSelected: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
    setIsChatbotOpen: (state, action) => ({
      ...state,
      isChatbotOpen: action.payload,
    }),
    setUserInputLatest: (state, action) => ({
      ...state,
      userInputLatest: action.payload,
    }),
    setFromForum: (state, action) => ({
      ...state,
      fromForum: action.payload,
    }),
  },
});

// Action creators are generated for each case reducer function
const { reducer: setting, actions } = settingSlice;
export const { setLoading,setSelected, setIsChatbotOpen, setSelectedConfig } = settingSlice.actions;
export const SettingActions = actions;
export default setting;
