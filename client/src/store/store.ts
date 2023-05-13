import { configureStore,combineReducers } from '@reduxjs/toolkit';
import {userReducer, bagReducer} from "./index"
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "persist-key",
  version: 1,
  storage,
};
const reducer = combineReducers({
  bag: bagReducer,
  user:userReducer
});

const persistReduce = persistReducer(persistConfig, reducer);
export const store = configureStore({
  reducer: persistReduce,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
