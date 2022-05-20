import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import MenuData from './menu_data.js';
import { get, getDatabase, child, ref, set, onValue } from "firebase/database";
import NavBar from './NavBar';
import Homepage from './Homepage';
import Register from './Register';
import Login from './Login';
import RestaurantPage from './RestaurantPage';

function JuicyLa() {
    return (
        <div>
            <Router>            
                <NavBar/>
            <Routes>
                <Route path="/Register" element={<Register/>}/>
                <Route path="/Login" element={<Login/>}/>
                <Route path = "/RestaurantPage" element={<RestaurantPage/>}/>
                <Route path="/" element={<Homepage/>}/>
            </Routes>

            </Router>
        </div>
    );
}

class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menu: '',
        }
      }
      
    render() {
        const restaurant = this.props.restaurant;
        const menu_path = MenuData(restaurant);
        get(child(ref(getDatabase()), 'menu_table/' + menu_path)).then((snapshot) => {
            if(this.state.menu != snapshot.val().table) {
                this.setState({
                    menu: snapshot.val().table
                });
            }
        }).catch((error) => {
            console.error(error);
        });
        return (
            <div dangerouslySetInnerHTML={{ __html: this.state.menu }} />
        );
      }
    }

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<JuicyLa />);