import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './index.scss'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { createBill } from '@/store/slices/billStore'
import { billListData } from '@/contant/billList'
import { useDate } from '@/hooks/useDate'

const KeepAccounts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [money, setMoney] = useState('') // State for the amount of money
  const [billType, setBillType] = useState('pay') // State for the type of bill (income or expense)
  const [selectedBillType, setSelectedBillType] = useState('') // State for the selected bill type

  // Use custom date hook to manage date visibility and text
  const { visible, dateText, onShowDate, onHideDate, onDateChange } = useDate()

  // Function to save the bill data
  const saveBill = async () => {
    const data = {
      type: billType, // Set bill type (pay or income)
      money: billType === 'pay' ? 0 - money : +money, // Set money as negative for expenses
      date:
        dateText === 'Today'
          ? dayjs() // Use current date if 'Today' is selected
          : dayjs(`${dateText} ${dayjs().format('HH:mm:ss')}`),  // Combine selected date with current time
      useFor: selectedBillType  // Set the purpose of the bill
    }
    await dispatch(createBill(data)) // create a bill with the data
    navigate('/')  // Navigate back to the home page
  }

  return (
    <div className="keepAccounts"> {/* Main container for the component */}
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Add new bill
      </NavBar>

      <div className="header">
        <div className="Type">  {/* Bill type selection */}
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')} // Set bill type to 'pay'
          >
            Expenses
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBillType('income')} // Set bill type to 'income'
          >
            Income
          </Button>
        </div>

        <div className="FormWrapper"> {/* Wrapper for the form elements */}
          <div className="Form"> {/* Form container */}
            <div className="date" onClick={onShowDate}> {/* Date selection section */}
              <span className="text">Calendar</span> {/* Calendar text */}
              <DatePicker
                className="Date"
                title="select date"
                visible={visible}
                onClose={onHideDate}
                max={new Date()}
                onConfirm={onDateChange}
              />
            </div>
            <div className="Input"> {/* Input section for money entry */}
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={setMoney}
              />
              <span className="currency">£</span>
            </div>
          </div>
        </div>
      </div>

      <div className="TypeList">  {/* List of bill types for selection */}
        {billListData[billType].map(item => {
          return (
            <div className="Type" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        selectedBillType === item.type ? 'selected' : ''
                      )}
                      key={item.type}
                      onClick={() => setSelectedBillType(item.type)}
                    >

                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={() => saveBill()}>
          save
        </Button>
        <Button className="btn save" onClick={() => navigate(-1)}>
          cancal
        </Button>
      </div>
    </div>
  )
}

export default KeepAccounts
