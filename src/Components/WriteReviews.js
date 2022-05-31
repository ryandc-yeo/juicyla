import React from 'react';
import PropType from "prop-types";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import './WriteReviews.css';
import app from "../firebase"
import { getDatabase, ref, set } from "firebase/database";

console.log(app);
function writeUserData(diningId, username, review, stars) {
    const db = getDatabase();
    const reference = ref(db, 'written reviews' + '/' + diningId + '/' + username);

    set(reference, {
        // could add an optional username in here, in case we index the reviews in firebase
        review: review,
        rating: stars,
    });
}

writeUserData("Bplate", "jack", "Bplate be bussin", 5);
writeUserData("Epicuria", "jen", "L coveL", 2);

function WriteReview({ hallName }) {
    const [value, setValue] = React.useState('');
    const [name, setName] = React.useState('');
    const [count, setCount] = React.useState(0);
    const [rating, setRating] = React.useState(0);

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleDelete = () => {
        setName('');
        setValue('');
        setRating(0);
    }

    const handleClick = () => {
        if (value !== '') {
            if (name === '') {
                const newName = 'Anonymous' + count;
                writeUserData(hallName, newName, value, rating);
                setCount(count + 1);
            }
            else {
                writeUserData(hallName, name, value, rating);
            }
        }
        setName('');
        setValue('');
        setRating(0);
    }

    return (
        <div>
            <div className='review-box'>
                <div>
                    <h2 className="review-header">Write Review</h2>
                </div>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            id="standard-helperText"
                            label="Name (Optional)"
                            variant="standard"
                            value={name}
                            onChange={handleName}
        
                        />
                    </Box>
                </div>
                <div>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '40vw' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="outlined-multiline-static"
                                label="Leave a Review"
                                multiline
                                rows={-3}
                                value={value}
                                onChange={handleChange}
                                className='review-field'
                            />
                        </div>
                    </Box>
                </div>
                <div className='bottom-row'>
                    <div>
                        <Rating
                            name="simple-controlled"
                            value={rating}
                            onChange={(event, ratingValue) => {
                                setRating(ratingValue);
                            }}
                        />
                    </div>
                    <div>
                        <div className='review-post-btn'>
                        <Button
                            variant="outlined"
                            sx={{
                                color: 'white',
                                width: 50,
                            }}
                            onClick={() => handleDelete()}
                        >
                            Delete
                        </Button>
                        <Button
                            sx={{
                                color: 'white',
                                width: 50,
                            }}
                            variant="outlined"
                            onClick={() => handleClick()}
                        >
                            Post</Button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

WriteReview.propTypes = {
    hallName: PropType.string.isRequired,
};

export default WriteReview;