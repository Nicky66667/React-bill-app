import { configureStore } from '@reduxjs/toolkit'

import ka from './slices/billStore'

const store = configureStore({
  reducer: {
    ka,
  },
})

export default store
