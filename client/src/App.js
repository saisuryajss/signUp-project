import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import userActionTypes from './redux/userActionTypes';
import toast, { Toaster } from 'react-hot-toast';

function App() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const repasswordRef=useRef();
    const nameRef = useRef();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);

    function handleLogOut(event){
      dispatch({type:userActionTypes.SIGN_OUT});
    }


    function handleSubmit(event) {
      event.preventDefault();
      if(passwordRef.current.value!==repasswordRef.current.value){
        toast.error('Password mismatch');
        return
    }
      if(passwordRef.current.value.length<8){
        toast.error('Password length be between 8 to 16');
        return
      }
      dispatch({type:userActionTypes.SIGN_UP_START
        ,payload:{
          name:nameRef.current.value,
          email:emailRef.current.value,
          password:passwordRef.current.value,
          repassword:repasswordRef.current.value,
        }});
    }

  return (
    <div className="App">
      <Toaster />
      {
        user?
        <div className='userExists'>
          <div>
            signed in successfully
            </div>
        <button onClick={handleLogOut}>LogOut</button>
        </div>
        :
       <div style={{
        boxSizing: 'border-box',
        margin: '0px'
      }}>
        <div className='SignUpContainer'>
  
          <h2>Register</h2>
  
          <form onSubmit={handleSubmit}>
            <div className='SignUpForm'>
              
            <label>Username</label>
              <input placeholder='xyz' ref={nameRef} type='text' required />

              <label>Email</label>
              <input placeholder='xyz@gmail.com' ref={emailRef} type='email' required />
  
              <label>Password</label>
              <input placeholder='password' ref={passwordRef} type='password' required />
  
              <label>Re-Password</label>
              <input placeholder='password' type='password' ref={repasswordRef} required />
  
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      }
      </div>
  );
}

export default App;
