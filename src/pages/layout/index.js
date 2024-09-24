import { TabBar } from 'antd-mobile'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from 'antd-mobile-icons'
import './index.scss'

// Define tab configuration for the TabBar
const tabs = [
  {
    key: '/',
    title: 'Month Bill',
    icon: <BillOutline />,
  },
  {
    key: '/new',
    title: 'Add',
    icon: <AddCircleOutline />,
  },
  {
    key: '/year',
    title: 'Annual Bill',
    icon: <CalculatorOutline />,
  },
]

const Layout = () => {
  const location = useLocation() // Get the current route location
  const navigate = useNavigate()

  return (
    <div className="Layout">
      <div className="page">
        {/* children router*/}
        <Outlet />
      </div>

      {/* TabBar for navigation between pages */}
      <TabBar
        className="tabbar"
        activeKey={location.pathname} // Set the active tab based on the current route
        onChange={key => navigate(key)} // Handle tab changes by navigating to the respective route
      >
        {tabs.map(item => (
          <TabBar.Item key={item.key} title={item.title} />
        ))}
      </TabBar>

    </div>
  )
}

export default Layout
