import {
  IR_STATE,
  IR_SET_CLIENT,
  IR_SET_CLIENTS,
} from '../actionsConstants';
import update from 'immutability-helper';

export const initialState = {
  app_state: {},
  clients: [],
  client: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case IR_STATE: {
      return update(state, {
        app_state: (app_state) => update(app_state || {}, {
          $merge: action.payload,
        }),
      });
    }
    case IR_SET_CLIENT: {
      return update(state, {
        client: {
          $set: action.payload,
        },
      });
    }
    case IR_SET_CLIENTS: {
      return update(state, {
        clients: {
          $set: action.payload,
        },
      });
    }
    default: {
      return state;
    }
  }
};
