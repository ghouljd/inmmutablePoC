import { fromJS, merge, get } from "immutable";
import { ActionType } from "./types";
import { 
  CHANGE_POKEMON_DATA,
  DECREMENT_INDEX,
  INCREMENT_INDEX
} from "./constants";

export const initialState = fromJS({
  index: 1,
  pokemon: {
    name: "",
    image: ""
  }
});

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case INCREMENT_INDEX:
      const index = state.getIn(['index']);
      if (index < 807)
        return state.setIn(['index'], index + 1);
      return state;
    case DECREMENT_INDEX:
      return state.updateIn(['index'], (index: number) => index > 1 ? index - 1 : index);
    case CHANGE_POKEMON_DATA:
      // return state.setIn(['pokemon'], action.payload);
      return state.setIn(
        ['pokemon'],
        merge(get(state, 'pokemon'), {
          name: action.payload?.name,
          image: action.payload?.image
        }),
      );
    default:
      return state;
  }
}

export default reducer;