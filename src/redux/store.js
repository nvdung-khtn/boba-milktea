import { combineReducers, createStore } from "redux";
import appReducer from "./reducers/appReducer";

const rootReducer = combineReducers({
  app: appReducer,
});

const store = createStore(rootReducer);


export default store;
/* ==> Store */