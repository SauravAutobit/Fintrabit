import { configureStore } from '@reduxjs/toolkit';
import webSocketReducer from './slices/webSocketSlice';
import componentsReducer from './slices/componentsSlice'; // ✅ Import the new reducer


export const store = configureStore({
  reducer: {
    // Add reducers here
    websockets: webSocketReducer,
    components: componentsReducer, // ✅ Add it to the store

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;