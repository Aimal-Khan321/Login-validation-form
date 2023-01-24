import './App.css';
import { useState } from 'react';
import { useForm } from 'react-hook-form'

function App() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [userInfo, setUserInfo] = useState()
  const onSubmit = (data) => {
    setUserInfo(data)
    console.log(data);
    reset();
  }
  console.log("====>", errors);

  return (
    <div className="container">
      <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label htmlFor="">Username</label>
            <input
              autoComplete='off'
              type="text"
              placeholder='username'
              {...register("username", { required: true })} />
          </div>
          <p>{errors.username && "Username is required"}</p>
          <div className="field">
            <label htmlFor="">Email</label>
            <input
              autoComplete='off'
              type="text"
              placeholder='Email'
              {...register("email", { required: true, pattern: { value: /^\S+@\S+$/i } })}
            />
          </div>
          <p>{errors.email?.type === 'required' && "Email is required"}</p>
          <p>{errors.email?.type === 'pattern' && "This is not valid email"}</p>
          <div className="field">
            <label htmlFor="">Password</label>
            <input
              autoComplete='off'
              type="text"
              placeholder='Password'
              {...register("password", { required: true, minLength: { value: 4 }, maxLength: { value: 10 } })} />
          </div>
          <p>{errors.password?.type === 'required' && "Password is required"}</p>
          <p>{errors.password?.type === 'minLength' && "Password must be more then 4 characters"}</p>
          <p>{errors.password?.type === 'maxLength' && "Password cannot exceed more then 10 characters"}</p>
          <button className='fluid ui button blue'>Submit</button>
        </div>
      </form>

    </div>
  );
}

export default App;
