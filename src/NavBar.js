import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import './NavBar.css';
import { useNavigate, Link } from "react-router-dom";
import Button from '@mui/material/Button';



const NavBar = () => {
    let navigate = useNavigate();
    const [navbar, setNavbar] = useState(false);
    
    const changeBackground = () => {
        if(window.scrollY >= 100 ){
            setNavbar(true)
        } else{
            setNavbar(false);
        }
    }
    
    window.addEventListener('scroll', changeBackground);
    return (
        <div className={navbar ? 'nav active' : 'nav'}>
            <div className = 'topBar'>
                <div className = 'title'> 
                    <Link to='/' style={{textDecoration: 'none'}}>
                        JUICYLA

                    </Link>
                </div>
                <div className='ButtonGroup'> 
                    <Button className='register' variant = "contained"
                        onClick={
                            ()=> {navigate('/Register')}
                        }
                        sx={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: '#F2F2F0',
                            backgroundColor: "#EA4033",
                            '&:hover': {
                                backgroundColor: '#EA4033',}
                        }}
                        
                        >
                        register
                    </Button>

                    <Button
                        onClick={
                            ()=> {navigate('/Login')}
                        }
                        sx={{
                            fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serifs',
                            fontWeight: 'bold',
                            fontSize: 15,
                            color: '#F2F2F0',
                        }}
                    >
                        sign in 
                    </Button>
                </div>
                

            </div>
        </div>
            
   
        
       
    )
}

export default NavBar;