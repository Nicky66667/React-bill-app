import { Outlet } from "react-router-dom"
import { Button } from "antd-mobile"
import { useEffect } from "react"
import { UseDispatch, useDispatch } from "react-redux"
import { getBillList } from "../../store/modules/billStore"

const Layout = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])
    return (
        <div>
            <Outlet />
            layout
            <Button color="primary">test</Button>

        </div>
    )
}

export default Layout