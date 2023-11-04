import { createAction } from "../../../utils";
import { ACTION_TYPE } from "../../../constants";

export const setUserAction = user => createAction(ACTION_TYPE.SET_USER, user);
