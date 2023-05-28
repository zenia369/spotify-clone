import { store } from '../redux/store'

type StoreType = ReturnType<typeof store>
export type RootState = ReturnType<StoreType['getState']>
export type AppDispatch = StoreType['dispatch']
