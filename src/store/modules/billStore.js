//this store is for bill list

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//1.initial store
const billStore = createSlice({
    name: 'bill',
    initialState: {
        billList: []
    },
    reducers: {
        //Sync modification
        setBillList(state, action) {
            state.billList = action.payload
        }
    }
})

//2.actionCreater
const { setBillList } = billStore.actions

//3. axios function and export
const getBillList = () => {
    return async (dispatch) => {
        //axios request
        const res = await axios.get('http://localhost:9999/backend')
        //call sync reducer
        dispatch(setBillList(res.data))

    }
}

export { getBillList }

//4.export reducer
export default billStore.reducer