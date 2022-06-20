import React, { useState } from 'react'

const AddEmployeeDetails = (props) => {
    const [inputValues,setInputValues] = useState({fname:'',lname:'',dob:'',des:'',link:'',exp:''});
    const onChangeHandler =(e)=>{
        const{name,value} = e.target;
        setInputValues({...inputValues,[name]:value});
    }

    const submitHandler =(e)=>{
        debugger
        e.preventDefault();
        let f = inputValues;
        props.setNewRecord(inputValues);
    }
    return (
        <div style={{ border: "1px solid", width: 289, top: 20 }}>
            <form>
                First Name:<input name='fname' onChange={onChangeHandler} />
                Last Name:<input name='lname' onChange={onChangeHandler} />
                DOB:<input name='dob' onChange={onChangeHandler} />
                Designation:<input name='des' onChange={onChangeHandler} />
                PhotoLink:<input name='link' onChange={onChangeHandler} />
                Experience:<input name='exp' onChange={onChangeHandler} />
                <button onClick={submitHandler}>Add New Record</button>
            </form>
        </div>
    )
}

export default AddEmployeeDetails