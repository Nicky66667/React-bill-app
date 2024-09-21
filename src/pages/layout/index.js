import { TabBar } from 'antd-mobile'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
    BillOutline,
    CalculatorOutline,
    AddCircleOutline
} from 'antd-mobile-icons'
import './index.scss'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getBillList } from '../../store/modules/billStore'

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
        title: 'Year Bill',
        icon: <CalculatorOutline />,
    },
]

const Layout = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    const navigate = useNavigate()

    //switch the page when trigger the TabBar
    const switchRoute = (path) => {
        console.log(path)
        navigate(path)
    }

    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>

            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default Layout
