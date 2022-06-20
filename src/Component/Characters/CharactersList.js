import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import MovieDetails from './MovieDetails';

const CharactersList = () => {
    const [list, setList] = useState([]);
    const [next, setNext] = useState("");
    const [count, setCount] = useState(1);
    const [isDetailsActyive, setIsDetailsActyive] = useState(false);
    const [open, setOpen] = useState(false);
    const [movieList, setMovieList] = useState([]);
    const [charactersName, setCharactersName] = useState("");

    const getData = (value) => {
        debugger
        setCount(value + 2);
        let URL;
        URL = `https://swapi.dev/api/people/?page=${value + 1}`;
        axios.get(URL)
            .then(response => {
                debugger
                if (response.status === 200) {
                    setList(response?.data?.results);
                    setNext(response?.data?.next);
                }
            }).catch(error => {
                debugger
            });
    }

    useEffect(() => {
        getData(0);
    }, []);

    const onPaginationChange = (e) => {
        debugger
        getData(e?.selected);
        setIsDetailsActyive(false);
    }
    const displayDetails =(e,filmLlist,name)=>{
        debugger
        e.preventDefault();
        setIsDetailsActyive(true);
        setMovieList(filmLlist);
        setCharactersName(name);
        setOpen(!open);
    }

    return (
        <>
            <div className='row listTable'>
                <div className='dashTransaction tradeTable '>
                    <div className='cardHead cardPadd20'>
                        <h4>List</h4>
                    </div>
                    <div className='table-responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th className="textLeft">Name</th>
                                    <th className="textLeft">Birth Year</th>
                                    <th className="textLeft">Gender</th>
                                    <th className="textLeft">Height</th>
                                    <th className="textLeft">Skin Color</th>
                                    <th className="textLeft">Eye Color</th>
                                    <th className="textLeft">Hair Color</th>
                                    <th className="textLeft">Created</th>
                                    <th className="textLeft">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.length > 0 &&
                                    list.map((item, index) => {                                        
                                        return (
                                            <tr key={index}>
                                                <td className="textLeft">{item.name}</td>
                                                <td className="textLeft">{item.birth_year}</td>
                                                <td className="textLeft">{item.gender}</td>
                                                <td className="textLeft">{item.height}</td>
                                                <td className="textLeft">{item.skin_color}</td>
                                                <td className="textLeft">{item.eye_color}</td>
                                                <td className="textLeft">{item.hair_color}</td>
                                                <td className="textLeft">{item.created}</td>
                                                <td className="textRight"><a href='#/' onClick={(e)=>displayDetails(e,item.films,item.name)} >Details</a></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="paginate">
                    <div className="textShow">
                        {/* <p>Heklo</p> */}
                    </div>
                    <div className="paginationNav">
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel=">"
                            onPageChange={(e) => onPaginationChange(e)}
                            pageCount={list.length > 0 ? count : 1}
                            previousLabel="<"
                            enderOnZeroPageCount={null}
                            containerClassName={"paginationBttns"}
                            previousLinkClassName={"previousBttn"}
                            nextLinkClassName={"nextBttn"}
                            activeClassName={"paginationActive"}
                        />
                    </div>
                </div>
            </div>
            {isDetailsActyive &&
                <MovieDetails movieList={movieList} charactersName={charactersName}/>
            }
        </>

    )
}

export default CharactersList