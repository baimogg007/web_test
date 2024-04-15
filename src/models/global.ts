import { map, findIndex, isArray, isString } from 'lodash';
import type { FieldData, NamePath } from 'rc-field-form/es/interface';
import { addPrefixToEumValue } from '@/shared/utils';

const namespace = 'global';

export interface GlobalModelState {
  serverMessageMap: Record<string, FieldData[]>;
  serverMessageList: FieldData[];
  serverMessage: string;
}

enum types {
  UPDATE_SERVER_ERROR_MAP = 'updateServerErrorMap',
  SAVE_SERVER_ERROR = 'saveServerError',
  GET_INDEX_COUNT_USING = 'getIndexCountUsing',
}

export const globalTypes = addPrefixToEumValue(types, namespace);

export interface IndexModelType {
  namespace: 'global';
  state: GlobalModelState;
  effects: {};
  reducers: {
    updateServerErrorMap: any;
    saveServerError: any;
  };
}

const IndexModel: IndexModelType = {
  namespace,
  state: {
    serverMessageMap: {},
    serverMessageList: [],
    serverMessage: '',
  },

  effects: {},

  reducers: {
    [types.UPDATE_SERVER_ERROR_MAP](draftState, { payload: keys }) {
      if (draftState.serverMessageList.length === 0) {
        return;
      }

      const resultKeys: NamePath = keys;
      if (isArray(resultKeys)) {
        resultKeys.forEach((key: string | number) => {
          const errorIndex = findIndex(draftState.serverMessageList, {
            name: key,
          });
          if (errorIndex !== -1) {
            draftState.serverMessageList[errorIndex].errors = [];
          }
        });
      }
    },

    [types.SAVE_SERVER_ERROR](draftState, { payload: error }) {
      const { message, messageDetails, errorNameSpace } = error;
      if (message) {
        draftState.serverMessage = message;
      }
      if (messageDetails) {
        const errorList = map(messageDetails, (value, key) => ({
          name: key,
          errors: value ? [value] : [],
        }));
        if (errorNameSpace) {
          draftState.serverMessageMap[errorNameSpace] = errorList;
        } else {
          draftState.serverMessageList = errorList;
        }
      }
    },
  },
};

export default IndexModel;
