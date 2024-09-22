import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '@/components/Icon'
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
  const [money, setMoney] = useState('')
  const [billType, setBillType] = useState('pay')
  const [selectedBillType, setSelectedBillType] = useState('')

  const { visible, dateText, onShowDate, onHideDate, onDateChange } = useDate()

  const saveBill = async () => {
    const data = {
      type: billType,
      money: billType === 'pay' ? 0 - money : +money,
      date:
        dateText === 'Today'
          ? dayjs()
          : dayjs(`${dateText} ${dayjs().format('HH:mm:ss')}`),
      useFor: selectedBillType,
    }
    await dispatch(createBill(data))
    navigate('/')
  }

  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        Add new transaction
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay' ? 'selected' : '')}
            onClick={() => setBillType('pay')}
          >
            Expenses
          </Button>
          <Button
            className={classNames(billType === 'income' ? 'selected' : '')}
            shape="rounded"
            onClick={() => setBillType('income')}
          >
            Income
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date" onClick={onShowDate}>
              <Icon type="calendar" className="icon" />
              <span className="text">{dateText}</span>
              <DatePicker
                className="kaDate"
                title="select date"
                visible={visible}
                onClose={onHideDate}
                max={new Date()}
                onConfirm={onDateChange}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={setMoney}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
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
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
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
      </div>
    </div>
  )
}

export default KeepAccounts
