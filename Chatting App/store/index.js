import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import allreducer from "./reducers/index";

export default store = createStore(
    allreducer,
    {},
    applyMiddleware(thunk),
);
