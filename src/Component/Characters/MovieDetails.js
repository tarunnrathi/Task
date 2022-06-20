import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CharactersInMovie from './CharactersInMovie';

let movieDetails = [];

const MovieDetails = (props) => {
    debugger
    const [charactersList, setCharactersList] = useState([]);
    const count = useRef(0);

    useEffect(() => {
        let promise = props.movieList.map(item => {
            return (
                axios.get(item)
            )
        });
        Promise.all(promise)
            .then(response => {
                if (count.current === 0) {
                    count.current = count.current + 1;
                    setCharactersList(response);
                    response.map((item1, index1) => {
                        let obj = {
                            movieName: item1?.data?.title,
                            CharactersUrl: item1?.data?.characters
                        }
                        movieDetails.push(obj);
                    });
                }
            }).catch(error => {
                debugger
            })
    }, []);

    return (
        <>
            <div className='rewardsCampaign'>
                <ul>
                    {movieDetails.length > 0 &&
                        movieDetails.map((item, index) => {
                            debugger
                            return (
                                <div key={item.movieName + index} style={{border:'1px solid'}} >
                                    <li style={{ width: '30%', display: "flex" }}>
                                        Movie:<label>{item.movieName}</label>
                                    </li>
                                    <li style={{position:'relative',display:'contents'}} >
                                        <div>
                                            <CharactersInMovie CharactersUrl={item?.CharactersUrl} />
                                        </div>

                                    </li>
                                </div>
                            )
                        })
                    }
                </ul>
            </div>
        </>

    )
}

export default MovieDetails