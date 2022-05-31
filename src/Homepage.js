import React from 'react';
import {useEffect,} from 'react';
import { useNavigate } from "react-router-dom";
import './Homepage.css';
import PodiumBox from './PodiumBox';
import { getDatabase, ref, onValue } from "firebase/database";

function getActivity(diningId) {

    const db = getDatabase();
    const reference = ref(db, 'activity' + '/' + diningId);

    let activity;
    onValue(reference, (snapshot) => {
        activity = snapshot.val();
    });
    return (activity);

}

function getRating(diningId){
    const db = getDatabase();
    const reference = ref(db, 'written reviews' + '/' + diningId);

    let rating;
    onValue(reference, (snapshot) => {
        rating = snapshot.val();
        });
    return (rating);
}

function getMenu(diningId){
    const db = getDatabase();
    const reference = ref(db, 'menu' + '/' + diningId);

    let menu;
    onValue(reference, (snapshot) => {
        menu = snapshot.val();
        });
    return (menu);

}

function diningHall(name, rating, menu, activity){
    this.name = name;
    this.rating = rating;
    this.menu = menu;
    this.activity = activity;
}
const Homepage = () => {
    let navigate = useNavigate();
    const places = ['Epicuria', 'BruinPlate', 'DeNeve'];
    let len = places.length;
    const restaurants = [];
    for (let i = 0; i < len; i++){
        const name = places[i];
        const item = new diningHall(name, getRating(name), getMenu(name), getActivity(name));
        restaurants.push(item);
    }

    console.log(restaurants);

    useEffect(()=>{

    })


    // const [name, setName] = useState('Name');
    return (
        <div className='background'>
            <div className='topDivider'>
                <div className='brand'>
                    JUICYLA
                </div>
                <div className='status'>
                    Current Rankings
                </div>
                <div className='podium'>


                    <div className='second'
                        id="podiumBoxes"
                        onClick={
                            () => { navigate('/RestaurantPage') }
                        }
                    >
                        <PodiumBox name = {restaurants[0].name} />
                    </div>
                    <div className='first'
                    id='podiumBoxes'
                    onClick={
                        () => { navigate('/RestaurantPage') }
                    }
                >
                    <PodiumBox name = {restaurants[1].name}/>
                </div>
                <div className='third'
                    id="podiumBoxes"
                    onClick={
                        () => { navigate('/RestaurantPage') }
                    }
                >
                    <PodiumBox name = {restaurants[2].name}/>
                </div>
                </div>
            </div>

            <div className='leaderBoard'>
                hsvgjbckjndssdcv
                <h1>fyghj</h1>
                <h1>fyghj</h1>
                <h1>fyghj</h1>
                <h1>fyghj</h1>
            </div>
        </div>
    );
}

export default Homepage;