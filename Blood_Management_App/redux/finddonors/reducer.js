import {
  UPDATE_FIELDS_REG, STATE_CLEANUP, BLUR_FIELDS_REG,
  UPDATE_DONOR_ARRAY,
  UPDATE_SUCCESS,
  UPDATE_SELECTED
} from './actionTypes'

const initialState = {
  list: [],
  selectAll: false,
  display_results: false,

  inputValues: {
    selectedState: '',
    selectedDistrict: '',
    pincode: '',
    blood_group: '',


  },
  inputValidity: {
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    blood_group: false,
  },
  isTouched: {
    selectedState: false,
    selectedDistrict: false,
    pincode: false,
    blood_group: false,
  },


};

const finddonorReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_FIELDS_REG: {
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
    case BLUR_FIELDS_REG: {
      const newInputIsTouched = { ...state.isTouched, [action.fieldId]: true };
      return { ...state, isTouched: newInputIsTouched };
    }
    case STATE_CLEANUP: {
      console.log('Cleaning state');
      return initialState;
    }

    case UPDATE_DONOR_ARRAY: {
      console.log("updating")
      const newArray = action.array.map(e => {
        return {
          ...e,
          selected: false
        }
      })
      console.log("done")
      return {
        ...state,
        list: newArray,
        display_results: true
      }
    }
    case UPDATE_SUCCESS: {
      console.log("done")
    }
    case UPDATE_SELECTED: {
      const newState = { ...state, loading: false };

      newState.list.find(
        (val) => val.id === action.item.id,
      ).selected = !action.item.selected;

      return newState;
    }


    default:
      return state;
  }
}

export default finddonorReducer