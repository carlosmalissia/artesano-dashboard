import { configureStore } from '@reduxjs/toolkit';
import { usuarioApi } from './services/usuarioApi';
import { productosApi } from './services/productosApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
    reducer: {
        [usuarioApi.reducerPath]: usuarioApi.reducer,
        [productosApi.reducerPath]: productosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            usuarioApi.middleware,
            productosApi.middleware
        ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;