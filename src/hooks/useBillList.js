import { useEffect, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'

import { getBills } from '@/store/slices/billStore'

export const useBillList = () => {
  const dispatch = useDispatch()
  const { billList } = useSelector(state => state.ka)

  //retrieve the list of bills
  useEffect(() => {
    dispatch(getBills())
  }, [dispatch]) //run effect when dispatch changes

  return { billList }
}

//filter bills by a selected year
export const useYearBillList = selectedYear => {
  const { billList } = useBillList()
  const yearBills = useMemo(
    () =>
      billList.filter(item => selectedYear === dayjs(item.date).get('year')),
    [billList, selectedYear]
  )

  return yearBills
}

//filter bills by a selected month and year
export const useMonthBillList = (selectedYear, selectedMonth) => {
  const selectedYearBills = useYearBillList(selectedYear)
  const currentBillList = useMemo(
    () =>
      selectedYearBills.filter(item => {
        return selectedMonth === dayjs(item.date).get('month')
      }),
    [selectedYearBills, selectedMonth]
  )

  return currentBillList
}
