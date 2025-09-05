import { configureStore } from '@reduxjs/toolkit';

const appStore = configureStore({
    reducer: {
    },	
})

export type RootState = ReturnType<typeof appStore.getState>; 
export type AppDispatch = typeof appStore.dispatch;

export default appStore;