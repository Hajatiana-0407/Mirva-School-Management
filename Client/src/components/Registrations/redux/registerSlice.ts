import { createSlice } from '@reduxjs/toolkit';
import { RootStateType } from '../../../Redux/store';
import { RegistrationType } from '../../../Utils/Types';



interface RegistrationState {
  datas: RegistrationType[];
  action: {
    isLoading: boolean;
    error: string | null;
  };
}

const initialState: RegistrationState = {
  datas: [],
  action: {
    isLoading: false,
    error: null,
  },
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: () => {}
});

export default registrationSlice.reducer;
export const getRegistrationState = (state: RootStateType) => state.registration;
