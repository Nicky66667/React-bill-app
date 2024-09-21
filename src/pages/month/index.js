import { DatePicker, NavBar } from 'antd-mobile'
import './index.scss'
import { useState } from 'react'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import _ from 'lodash'

const Month = () => {
    //Group data by month
    const billList = useSelector(state => state.bill.billList)

    // 1. get data from Redux 
    // 2. process data by using useMemo
    // 3. group data by month by ysing

    // cache the result of a calculation between re-renders.  
    const monthGroup = useMemo(() => {
        //return the result grouped by month and date
        return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
    }, [billList])

    console.log(monthGroup)

    //control the modal opening and closing
    const [dateVisible, setDateVisivle] = useState(false)

    //control the display of current date
    const [currentDate, setCurrentDate] = useState(() => {
        //format date
        return dayjs(new Date()).format('YYYY-MMM')
    })

    const [currentMonthList, setCurrentMonthList] = useState([])

    //calculate income, spend and balance
    const monthResult = useMemo(() => {
        //reduce function adds the money value of each filtered item (c.money) to the accumulator (a), starting from an initial value of 0.
        const pay = currentMonthList.filter(item => item.type === 'pay').reduce((a, c) => a + c.money, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.money, 0)

        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthList])

    const onConfirm = (date) => {
        setDateVisivle(false)
        console.log(date)
        const formatDate = dayjs(date).format('YYYY-MMM')
        setCurrentDate(formatDate)
        setCurrentMonthList(monthGroup[formatDate])
        setCurrentDate(formatDate)
    }

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                Monthly Bill
            </NavBar>

            <div className="content">
                <div className="header">
                    <div className="date" onClick={() => setDateVisivle(true)}>
                        <span className="text">
                            {currentDate + ''} Bill
                        </span>
                        {/*check if expend className exists with state of modal*/}
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>

                    </div>
                    <div className='TwoLineOverview'>
                        <div className='item'>
                            <span className='money'>{monthResult.pay.toFixed(2)}</span>
                            <span className='type'>Spend</span>
                        </div>
                        <div className='item'>
                            <span className='money'>{monthResult.income.toFixed(2)}</span>
                            <span className='type'>Income</span>
                        </div>
                        <div className='item'>
                            <span className='money'>{monthResult.total.toFixed(2)}</span>
                            <span className='type'>Balance</span>
                        </div>
                    </div>
                    {/*date picker */}
                    <DatePicker
                        className="kaDate"
                        title="Date"
                        precision="month"
                        visible={dateVisible}
                        onCancel={() => setDateVisivle(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisivle(false)}
                        max={new Date()}
                    />
                </div>

            </div>
        </div>
    )
}

export default Month
