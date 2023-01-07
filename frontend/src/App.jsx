import { useEffect } from 'react';
import { useState } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState([]);
  const [button, setButton] = useState(0);
  const checkIn = e => {
    e.preventDefault();
    
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    if ( hours < 10 ){
      hours = "0" + hours;
    }
    
    if (minutes < 10){
      minutes = "0" + minutes;
    }
      try {
        data.map((student) => {
          if (e.target[1].value === student.st_roll) {
            throw Error("Students cannot have same roll number!");
          }
        })      
      } catch (error) {
        console.log(error.message);
        alert("Please enter a valid roll number!");
        return;
      }
      setData([...data , {
        st_name: e.target[0].value , 
        st_roll: e.target[1].value , 
        checkInTime: hours + ":" + minutes,
        checkOutTime: ''
      }]);

  }
  const checkOut = e => {
    e.preventDefault();
    
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    
    if ( hours < 10 ){
      hours = "0" + hours;
    }
    
    if (minutes < 10){
      minutes = "0" + minutes;
    }
    data.map(student => {
      if (student.st_roll === e.target[0].value && student.checkOutTime === ""){
        console.log(student);
        student.checkOutTime = hours + ":" + minutes;
        setData([...data])
        
      }
      else if(student.st_roll === e.target[0].value && student.checkOutTime !== ""){
        alert("Student has already left!");
      }
    });
  }
  useEffect(() => {

  }, [data])
  
  return (
    <div className="App">
    
    <div className='input'>
      <h1>Check In</h1>

      <form className='form' onSubmit={checkIn} >
        <label>Name:</label>
        <input type = "text" placeholder = "Name" />
        <label>Roll-Number:</label>
        <input type="number" placeholder='Roll-Number' />

        <div className='btns'>

        <button type='submit'>Check In</button>
        </div>

      </form>

      <h1>Check Out</h1>
      <form className='form' onSubmit={checkOut} >
        <label>Roll-Number:</label>
        <input type="number" placeholder='Roll-Number' />

        <div className='btns'>

        <button type='submit'>Check Out</button>
        </div>

      </form>
    
    </div>
    
    <div className='output'>
      <table className='table'>
        <tbody>
          <tr>
            <th>Serial Number</th>
            <th>Student Name</th>
            <th>Student Roll Number</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
          </tr>
          { data.map( (student , index) => (
            <tr>
              <td>{index+1}</td>
              <td>{student.st_name}</td>
              <td>{student.st_roll}</td>
              <td>{student.checkInTime}</td>
              <td>{student.checkOutTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>


    </div>

  )
}

export default App
