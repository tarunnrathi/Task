import React, { useState, useEffect } from 'react';
import empDetails from './EmployeeData';
import AddEmployeeDetails from './AddEmployeeDetails';

const EmployeeDetails = () => {
    const [empList, setEmpList] = useState([]);
    const [deleteId, setDeletedID] = useState(null);
    const [newRecoed, setNewRecord] = useState(null);
    const [toggle,setToggle] = useState(false);

    useEffect(() => {
        debugger
        if (deleteId === null && newRecoed===null) {
            setEmpList(empDetails);
        } else {
            if (newRecoed === null) {
                setEmpList(empList);
            } else {
                empList.push(newRecoed);
                setNewRecord(null);
                setEmpList(empList);
            }
        }
    }, [empList,newRecoed,deleteId,toggle]);

    const recordSet = (value) => {
        debugger
        let len = empList.length;       
      
        let obj = {
            id: len+1,
            FirstName: value.fname,
            LastName: value.lname,
            DOB:value.dob,
            Designation: value.des,
            PhotoLink: value.link,
            Experience: value.exp,
        }
        setNewRecord(obj);
    }


    const deleteHandler = (e, id) => {
        debugger
        e.preventDefault();
        let f = empList.splice(id - 1, 1);
        let g = empList;
        setEmpList(g);
        setDeletedID(id - 1);
    }

    return (
        <div>
            <button onClick={()=>setToggle(!toggle)} >{toggle?"Add Record":"Add"}</button>
            <table>
                <th>First name </th>
                <th>Last name </th>
                <th>DOB</th>
                <th>Designation</th>
                <th>Profile Photo</th>
                <th>Experience</th>
                <tbody>
                    {empList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.FirstName}</td>
                                <td>{item.LastName}</td>
                                <td>{item.DOB}</td>
                                <td>{item.Designation}</td>
                                <td>{item.PhotoLink}</td>
                                <td>{item.Experience}</td>
                                <td>
                                    <button>Edit</button>
                                </td>
                                <td>
                                    <button onClick={(e) => deleteHandler(e, item.id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {toggle && <AddEmployeeDetails setNewRecord={recordSet} /> }
            
        </div>
    )
}
export default EmployeeDetails;