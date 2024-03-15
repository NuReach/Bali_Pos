import { configureStore } from '@reduxjs/toolkit'
import functionSlice from './functionSlice'

export default configureStore({
  reducer: {
    function:functionSlice,
  }
})