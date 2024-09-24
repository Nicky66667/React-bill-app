import dayjs from 'dayjs'

export const billListData = {
  pay: [
    {
      type: 'foods',
      name: 'Food and Drinks',
      list: [
        { type: 'restaurant', name: 'Restaurant' },
        { type: 'food', name: 'Food' },
        { type: 'drinks', name: 'Drinks' },
      ],
    },
    {
      type: 'transportation',
      name: 'Transportation',
      list: [
        { type: 'rent', name: 'Renting Car' },
        { type: 'Bus', name: 'Bus' },
      ],
    },
    {
      type: 'recreation',
      name: 'Recreation',
      list: [
        { type: 'sports', name: 'Sports' },
        { type: 'game', name: 'Gaming' },
        { type: 'travel', name: 'Traveling' },
      ],
    },
    {
      type: 'daily',
      name: 'Grocery',
      list: [
        { type: 'clothes', name: 'Clothes' },
        { type: 'book', name: 'Books' },
        { type: 'furniture', name: 'Furniture' },
      ],
    },
    {
      type: 'other',
      name: 'Other',
      list: [{ type: 'community', name: 'Taxs' },
      { type: 'education', name: 'Tutions' }
      ],
    },
  ],
  income: [
    {
      type: 'professional',
      name: 'Job',
      list: [
        { type: 'salary', name: 'Salary' },
        { type: 'bonus', name: 'Bonus' },
      ],
    },
    {
      type: 'other',
      name: 'Other',
      list: [
        { type: 'financial', name: 'Saving' },
        { type: 'stock', name: 'Stock' },
      ],
    },
  ],
}

export const billTypeToName = Object.keys(billListData).reduce((prev, key) => {
  billListData[key].forEach(bill => {
    bill.list.forEach(item => {
      prev[item.type] = item.name
    })
  })
  return prev
}, {})

export const getOverview = (data = []) => {
  return data.reduce(
    (prev, item) => {
      return {
        ...prev,
        date: item.date,
        [item.type]: prev[item.type] + +item.money,
      }
    },
    { pay: 0, income: 0, date: null }
  )
}

export const getMonthOverview = (data, month) => {
  // 某个月的账单可能有多个
  const bill = data.filter(item => {
    return month === dayjs(item.date).get('month')
  })
  return getOverview(bill)
}
