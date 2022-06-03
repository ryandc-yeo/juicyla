import React from 'react';
import { getDatabase, ref, onValue, set } from "firebase/database";
import { PropTypes } from 'prop-types';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import "./StarRating.css"
// import { NoteTwoTone } from '@material-ui/icons';

function StarRating({ hallName, isMealPeriod }) {
    const [rating, setRating] = React.useState(0);

    const db = getDatabase();
    const dbRef = ref(db, 'ratings' + '/' + hallName);

    let num, count;

    onValue(dbRef, (snapshot) => {
        num = snapshot.val().rating;
        count = snapshot.val().count;
        // console.log("IM CHANGING"+ hallName)

    });

    const updateRating = () => {
        if (!isMealPeriod) {
            console.log('not a meal period')
            return
        } else {
            num = ((num * count) + rating);
            count += 1;
            count > 0 ? num /= count : 0;
        }
        set(dbRef, {
            rating: num,
            count: count,
        });

    }

    function handleClick() {
        updateRating();
    }

    return (
        isMealPeriod &&
        <div id="holder">
            <p>Rate your meal for this dining period:</p>

            <div>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, ratingValue) => {
                        setRating(ratingValue);
                    }}
                />
                <Button
                    sx={{
                        color: 'white',
                        width: 50,
                    }}
                    variant="outlined"
                    onClick={() => handleClick()}
                >
                    Vote
                </Button>
            </div>
        </div>
    );
}

StarRating.propTypes = {
    hallName: PropTypes.string.isRequired,
    isMealPeriod: PropTypes.bool.isRequired
};

export default StarRating;