import { configureStore } from '@reduxjs/toolkit';
import { usuarioApi } from './services/usuarioApi';
import { productosApi } from './services/productosApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import { imagenesApi } from './services/imagenesApi';
import { categoriasApi } from './services/categoriasApi';
import { orderApi } from './services/orderApi';
import { adminApi } from './services/adminApi';

export const store = configureStore({
  reducer: {
    [usuarioApi.reducerPath]: usuarioApi.reducer,
    [productosApi.reducerPath]: productosApi.reducer,
    [imagenesApi.reducerPath]: imagenesApi.reducer,
    [categoriasApi.reducerPath]: categoriasApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usuarioApi.middleware,
      productosApi.middleware,
      imagenesApi.middleware,
      categoriasApi.middleware,
      orderApi.middleware,
      adminApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
