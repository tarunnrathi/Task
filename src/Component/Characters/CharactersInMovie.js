import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';

const CharactersInMovie = (props) => {
    debugger
    const [list, setList] = useState([]);
    const count = useRef(0);
    useEffect(() => {
        count.current = count.current + 1;
        let promise = props.CharactersUrl.map(item => {
            return (
                axios.get(item)
            )
        });
        Promise.all(promise)
            .then(response => {
                debugger
                setList(response)
            }).catch(error => {
                debugger
            });

    }, [])
    return (
       <>
       <label>Characters =&gt;</label>
       {list.length>0 &&
       <ul style={{position: 'relative',display:'inline-flex'}} key={count.current}>
        {list.map((item,index)=>{
            debugger
            return(
              <li key={item?.data?.name}>
                {item?.data?.name}
              </li>  
            )
        })}
       </ul>
       
       }
       </>
    )
}

export default CharactersInMovie