import { DatePicker, NavBar } from 'antd-mobile'
import { useEffect, useMemo } from 'react'
import groupBy from 'lodash/groupBy'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'

import { getOverview } from '@/contant/billList'
import { useLocation } from 'react-router-dom'
import { useMonthBillList } from '@/hooks/useBillList'
import { useDate } from '@/hooks/useDate'
import TwoLineOverview from '@/components/TwoLineOverview'
import DailyBill from './components/DailyBill'
import { orderBy } from 'lodash'

const MonthlyBill = () => {
  const { state } = useLocation()
  const { date, visible, onShowDate, onHideDate, onDateChange } = useDate()

  // Extract year and month from the selected date
  const selectedYear = date.get('year')
  const selectedMonth = date.get('month')

  // Get the list of bills for the selected month
  const currentBillList = useMonthBillList(selectedYear, selectedMonth)

  // Get an overview (income and expenses) for the current month
  const overview = getOverview(currentBillList)

  // Memoized calculation to group bills by date and sort them in descending order
  const monthBills = useMemo(() => {
    const billGroup = groupBy(currentBillList, item =>
      dayjs(item.date).format('YYYY-MM-DD')
    )
    const sortedKeys = orderBy(
      Object.keys(billGroup),
      // Convert date string to a number for comparison
      item => +new Date(item),
      'desc'
    )
    return {
      keys: sortedKeys,  // Return sorted dates
      billGroup, // Return grouped bills
    }
  }, [currentBillList])  // Recalculate whenever the bill list changes

  //set the date from navigation state if available
  useEffect(() => {
    if (state === null) return
    onDateChange(state.date) // Update date based on state
  }, [state, onDateChange]) // Re-run effect when state or onDateChange changes

  // Function to render the daily bills for the month
  const renderMonthBills = () => {
    const { keys, billGroup } = monthBills
    return keys.map(key => {
      const dateText = dayjs(key).format('MM-DD') // Format the date as MM-DD
      const overview = getOverview(billGroup[key]) // Get the overview for that day's bills

      return (
        <DailyBill
          key={key}
          overview={overview}  // Overview of income and expenses for the day
          dateText={dateText} // Display the date in MM-DD format
          billList={billGroup[key]} // List of bills for the day
        />
      )
    })
  }

  // convert month number to month name
  const switchMonth = () => {
    if (selectedMonth == 0) {
      return "January"
    }
    if (selectedMonth == 1) {
      return "February"
    }
    if (selectedMonth == 2) {
      return "March"
    }
    if (selectedMonth == 3) {
      return "April"
    }
    if (selectedMonth == 4) {
      return "May"
    }
    if (selectedMonth == 5) {
      return "June"
    }
    if (selectedMonth == 6) {
      return "July"
    }
    if (selectedMonth == 7) {
      return "August"
    }
    if (selectedMonth == 8) {
      return "September"
    }
    if (selectedMonth == 9) {
      return "October"
    }
    if (selectedMonth == 10) {
      return "November"
    }
    if (selectedMonth == 11) {
      return "December"
    }

  }

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        Monthly Bill
      </NavBar>

      <div className="content">
        <div className="header">
          <div className="date">
            <span className="text" onClick={onShowDate}>
              {selectedYear} | {switchMonth()}
            </span>
            <span className={classNames('arrow', visible && 'expand')}></span>
          </div>
          <DatePicker
            className="kaDate"
            title="Select Month"
            precision="month"
            visible={visible}
            onClose={onHideDate}
            max={new Date()}
            onConfirm={onDateChange}
          />

          <TwoLineOverview
            pay={overview.pay}
            income={overview.income}
            type="month"
          />
        </div>

        {renderMonthBills()}
      </div>
    </div>
  )
}

export default MonthlyBill
