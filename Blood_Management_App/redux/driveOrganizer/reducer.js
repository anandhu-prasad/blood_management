/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';

import {
  UPDATE_FIELDS_ORGANIZER,
  BLUR_FIELDS_ORGANIZER,
  STATE_CLEANUP,
  ORGANIZE_REQ,
  ORGANIZE_SUCCESS,
  ORGANIZE_FAILURE,
} from './actionTypes';

const initialState = {
  inputValues: {
    startDate: new Date(),
    startTime: '00:00:00',
    endDate: new Date(),
    endTime: '00:00:00',
    bloodgroup: [],
    address: '',
    selectedState: '',
    selectedDistrict: '',
    pincode: '',
    message: '',
  },
  inputValidity: {
    startDate: true,
    endDate: true,
    startTime: true,
    endTime: true,
    bloodgroup: false,
    address: false,
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    message: true,
  },
  isTouched: {
    startDate: false,
    endDate: false,
    startTime: false,
    endTime: false,
    bloodgroup: false,
    address: false,
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    message: false,
  },
  finalFormState: false,
  loading: false,
  driveId: '',
  error: '',
};

const driveOrganizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_ORGANIZER: {
      const newInputValue = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };

      const newInputValidity = {
        ...state.inputValidity,
        [action.fieldId]: action.isValid,
      };

      let newFinalFormState = true;
      for (const key in newInputValidity) {
        newFinalFormState = newFinalFormState && newInputValidity[key];
      }

      return {
        ...state,
        inputValues: newInputValue,
        inputValidity: newInputValidity,
        finalFormState: newFinalFormState,
      };
    }

    case BLUR_FIELDS_ORGANIZER: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }

    case STATE_CLEANUP: {
      console.log('Cleaning state');
      return initialState;
    }

    case ORGANIZE_REQ: {
      return {...state, loading: true};
    }
    case ORGANIZE_SUCCESS: {
      Alert.alert('Success', 'Drive organized successfully');
      return {...state, loading: false, driveId: action.driveId, error: ''};
    }
    case ORGANIZE_FAILURE: {
      Alert.alert('Error', action.error);
      return {...state, loading: false, error: action.error, driveId: ''};
    }

    default:
      return state;
  }
};

export default driveOrganizerReducer;
