import { DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import dayjs from 'dayjs'
import './index.scss'
import { useDate } from '@/hooks/useDate'
import { useYearBillList } from '@/hooks/useBillList'
import { getMonthOverview, getOverview } from '@/contant/billList'
import TwoLineOverview from '@/components/TwoLineOverview'
import OneLineOverview from '@/components/OneLineOverview'

const BillAll = () => {

  const { date, visible, onDateChange, onShowDate, onHideDate } = useDate()

  // Get the selected year from the date
  const selectedYear = date.get('year')

  // Fetch the list of bills for the selected year
  const selectedYearBills = useYearBillList(selectedYear)

  // Get the total income and expenses overview for the selected year
  const overview = getOverview(selectedYearBills)

  // Get the current year
  const thisYear = dayjs().get('year')

  // Calculate the maximum number of months to display 
  const maxMonth = thisYear === selectedYear ? dayjs().get('month') + 1 : 12

  // Create a list of monthly overviews by mapping over the months
  const monthBillList = new Array(maxMonth)
    .fill('') // Create an array of length maxMonth
    .map((_, month) => {
      return getMonthOverview(selectedYearBills, month)
    })
    .reverse() // Reverse to show the latest month first

  //convert a month index to a month name
  const switchMonth = (index) => {

    const month = maxMonth - index - 1

    if (month == 0) {
      return "January"
    }
    if (month == 1) {
      return "February"
    }
    if (month == 2) {
      return "March"
    }
    if (month == 3) {
      return "April"
    }
    if (month == 4) {
      return "May"
    }
    if (month == 5) {
      return "June"
    }
    if (month == 6) {
      return "July"
    }
    if (month == 7) {
      return "August"
    }
    if (month == 8) {
      return "September"
    }
    if (month == 9) {
      return "October"
    }
    if (month == 10) {
      return "November"
    }
    if (month == 11) {
      return "December"
    }

  }

  return (
    <div className="billDetail">
      <NavBar className="nav" backArrow={false}>
        <div className="nav-title" onClick={onShowDate}>
          {selectedYear}
          <span className={classNames('arrow', visible && 'expand')}></span>
        </div>
      </NavBar>
      <DatePicker
        className="kaDate"
        title="Date"
        precision="year"
        visible={visible}
        onClose={onHideDate}
        max={new Date()}
        onConfirm={onDateChange}
        left="Cancel"
        right="Confirm"
      />

      <div className="content">
        <div className='overview'>
          <TwoLineOverview
            pay={overview.pay}
            income={overview.income}
            className="overview"
          />
        </div>
        {monthBillList.map((item, index) => {
          return (
            <div
              className="monthBill"
              key={index}
            >
              <div className="date">{switchMonth(index)}</div>
              <OneLineOverview pay={item.pay} income={item.income} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BillAll
