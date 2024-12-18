import { useEffect, useState, useRef } from "react";
import "./style.css";
import TrashBin from "../../assets/img/recycle-bin.svg";
import api from "../../services/api";

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef()
  const inputEmail = useRef()
  const inputAge = useRef()
 
  async function getUsers() {
    const usersFromAPI = await api.get('/users')
    setUsers(usersFromAPI.data)   
  }
  async function createUsers() {
    await api.post('/users',{
      name: inputName.current.value,
      email: inputEmail.current.value,
      age: inputAge.current.value
    })
    getUsers();  
  }
  async function deleteUsers(id) {
    await api.delete(`/users/${id}`)
    getUsers();
       
  }
  

  useEffect(() => {    
    getUsers();
  }, [])
  
  
  return (
    <>
      <div className="s-forms">
        <div className="container">
          <form action="">
            <h1>User Registration</h1>
            <input              
              id="name"
              type="text"
              placeholder="Enter your name"
              name="name"
              ref={inputName}                           
            />
            <input              
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              ref={inputEmail}          
              
            />
            <input              
              id="age"
              type="number"
              placeholder="Enter your age"
              name="age"
              ref={inputAge}             
              
            />
            <button onClick={createUsers} type="submit">Register</button>
          </form>
          <div className="user-cards">
          {users.map((user) => (
          <div className="card" key={user.id}>
            <div className="user-info">
              <h3>Name: <span>{user.name}</span></h3>
              <h3>Age: <span>{user.age}</span></h3>
              <h3>Email: <span>{user.email}</span></h3>
            </div>
            <button onClick={() => deleteUsers(user.id)}>
              <img src={TrashBin} alt="" />
            </button>
          </div>
        ))}
          </div>

        </div>
      </div>      
    </>
  );
}

export default Home;
