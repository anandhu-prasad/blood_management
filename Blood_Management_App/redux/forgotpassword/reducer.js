/* eslint-disable prettier/prettier */
import {Alert} from 'react-native';

import {
  UPDATE_FIELDS_FORGOT,
  FORGOT_REQ,
  FORGOT_REQ_SUCCESS,
  FORGOT_REQ_FAILURE,
  BLUR_FIELDS_FORGOT,
  STATE_CLEANUP_FORGOT,
  RESET_DONE_STATE,
} from './actionTypes';

const initialState = {
  inputValues: {
    email: '',
    otp: '',
    password: '',
    cpassword: '',
  },
  inputValidity: {
    email: false,
    otp: false,
    password: false,
    cpassword: false,
  },
  isTouched: {
    email: false,
    otp: false,
    password: false,
    cpassword: false,
  },
  loading: false,
  error: '',
  emailSent: false,
  otpVerified: false,
  passwordReset: false,
};

const forgotReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_FORGOT: {
      const newInputValue = {
        ...state.inputValues,
        [action.fieldId]: action.val,
      };
      const newInputValidity = {
        ...state.inputValidity,
        [action.fieldId]: action.isValid,
      };
      return {
        ...state,
        inputValues: newInputValue,
        inputValidity: newInputValidity,
      };
    }
    case BLUR_FIELDS_FORGOT: {
      const newInputIsTouched = {...state.isTouched, [action.fieldId]: true};
      return {...state, isTouched: newInputIsTouched};
    }
    case STATE_CLEANUP_FORGOT: {
      return initialState;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    case FORGOT_REQ: {
      return {...state, loading: true};
    }
    case FORGOT_REQ_SUCCESS: {
      console.log('forgotpassword success!');
      return {...state, loading: false, error: '', [action.successReq]: true};
    }
    case FORGOT_REQ_FAILURE: {
      Alert.alert('Error', action.error);
      return {...state, loading: false, error: action.error};
    }

    case RESET_DONE_STATE: {
      return {...state, [action.resettable]: false};
    }

    default:
      return state;
  }
};

export default forgotReducer;