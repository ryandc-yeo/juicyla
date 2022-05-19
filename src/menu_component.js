import React from 'react';
import { render } from 'react-dom';
import MenuData from './menu_data.js';
import { get, getDatabase, child, ref, set, onValue } from "firebase/database";

export default class Menu extends React.Component {

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
