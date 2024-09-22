import { createSlice } from '@reduxjs/toolkit'
import http from '../../utils/http'

// This Redux slice manages bills. 
// Provides actions to add a new bill and fetch all bills using async calls to an API.

const billSlice = createSlice({
  name: 'bill',
  initialState: {
    // 2021: [{ type, date, money, useFor }]
    //  type: 'pay' | 'income'
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload
    },
    // Add a new bill to the bill list
    addBill(state, action) {
      state.billList.push(action.payload)
    }
  }
})

// Destructure the actions
const { addBill } = billSlice.actions
const { setBillList } = billSlice.actions

// Create a new bill by sending a POST request
const createBill = (data) => {
  return async (dispatch) => {
    const res = await http.post('/backend', data) // Send data to API
    dispatch(addBill(res.data)) // Add the response data to the state
  }
}

// Fetch all bills by sending a GET request
const getBills = () => {
  return async (dispatch) => {
    const res = await http.get('/backend')
    dispatch(setBillList(res.data))
  }
}

//export the reducer and functions
export default billSlice.reducer

export {
  createBill,
  getBills
}
