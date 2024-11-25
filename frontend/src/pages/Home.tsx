import { Button, Container, Typography, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux'
import { RootState } from '../store/index'
import { authActions } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';
import Dashboard from '../components/Dashboard';
export default function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((state: RootState) => state.authenticator)
    console.log(userData)
    const handleLogout = () => {
        dispatch(authActions.logout())
        navigate('/')
    }


    return <>

        <Menu />
        <Dashboard />

    </>

};

