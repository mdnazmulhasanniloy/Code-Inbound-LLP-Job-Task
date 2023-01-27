import React, { useContext, useState } from 'react';
import { Form, FloatingLabel } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGithub, FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import './Login.css'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';




const Login = () => {

    const {googleLogin, githubLogin,  faceBookLogin, userLoginWidthUserPassword  } = useContext(AuthContext)
    const [passwordToggle, setPasswordToggle] = useState(false)
    const [loader, setLoader] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const Navigate = useNavigate();
    const Location = useLocation();
    const from = Location.state?.from?.pathname || '/';


    const HandelToGoogleLogin = () =>{
      setLoader(true)
        googleLogin()
        .then((result) => {
          toast.success('success fully Login')
          setLoader(false)
            Navigate(from, {replace: true})
          }).catch((error) => {
            const errorMessage = error.message;
            setLoader(false)
            toast.error(errorMessage)
          });
    }

    //github login
const handleGithubLogin = () => {
  setLoader(true)
        githubLogin()
        .then((result) => {
          toast.success('success fully Login')
          setLoader(false)
          Navigate(from, {replace: true})
        }).catch((error) => {
          const errorMessage = error.message;
          setLoader(false)
          toast.error(errorMessage)
        });
        
    }
    //facebook login
    const HandelToFacebookLogin = () =>{
      setLoader(true)
        faceBookLogin()
        .then((result) => {
          setLoader(false)
            toast.success('success fully Login')
            Navigate(from, {replace: true})
          }).catch((error) => {
            const errorMessage = error.message;
            setLoader(false)
            toast.error(errorMessage)
          });
        
    }


    const onSubmit = (data) => {

      // LOGIN user login
      setLoader(true)
      //Sign in user password
      userLoginWidthUserPassword(data.email, data.password)
          .then((result) => {
            toast.success('success fully Login')
            Navigate(from, {replace: true})
              setLoader(false)



          }).catch((error) => {

            const errorMessage = error.message;
            toast.error(errorMessage)
              setLoader(false)


          });


  }
    return (
        <div >
        
        <div className="form-container col-lg-7 m-auto p-3 mt-5">
            <div>
                <h1 className='text-center fs-1 spatial-Font-Family '>Login</h1>
                <div className='my-4 d-flex justify-content-center'>
                    <Link className="spatial-btn " onClick={HandelToGoogleLogin}> <FcGoogle className='fs-1' /></Link>
                    <Link  className="spatial-btn mx-3" onClick={handleGithubLogin}><FaGithub className='fs-1' /></Link>
                    <Link  className="spatial-btn" onClick={HandelToFacebookLogin}><FaFacebookSquare className='fs-1' /></Link>
                
                </div>
                <Form  onSubmit={handleSubmit(onSubmit)} className='p-5'>
                            <FloatingLabel controlId="floatingInputGrid1" label="Email address">
                                     <Form.Control type="email" required name='Email' placeholder="name@example.com" {...register("email", {
                                      required: "Please enter a valid email address (the data you entered is not in the right format) ",
                                      maxLength: { value: 20, message: "you enter value is up to 20 characters" }
          
                                  })} />
                                  {
          
                                      errors.email && <p className='text-danger'>{errors.email.message}</p>
                                  }
                            </FloatingLabel>
                            <FloatingLabel className='mt-4' controlId="floatingInputGrid2" label="Enter Password">
                                     <Form.Control type={passwordToggle? 'text':"password"} name='Password' placeholder="Enter Password" {...register("password", {
                                      required: "Password is required",
                                      minLength: { value: 6, message: "At last provide 6 characters" },
                                      pattern: {
                                          value: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/,
                                          message: "must include lower, upper, number, and special chars"
                                      }
          
          
                                  })}/>
                                  <div className='w-100 d-flex justify-content-end position-absolute z-0' style={{top:'20%', right:'15px', cursor: 'pointer' }}>
                                  {
                                      passwordToggle ? <AiFillEyeInvisible onClick={() => setPasswordToggle(!passwordToggle)} className='fs-3' />
                                          : <AiFillEye onClick={() => setPasswordToggle(!passwordToggle)} className='fs-3' />
                                  }
                                  </div>
                                  {
          
                                      errors.password && <p className='text-danger' >{errors.password.message}</p>
                                  }
                            </FloatingLabel>
                            <Link className='mt-3' to='/forgetPassword'>Forget password?</Link>
                            <div className='mt-4'>
                                <button className='spatial-btn w-100 border-0' type="Submit" > {
                                  loader? <> <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                  Loading...</> :'Login'} </button>
                            </div>
                    </Form>
                    <p className='text-center'>Don't have an Account? <Link to='/register'>Register</Link></p>
            
            </div>
        
        </div>
            
        </div>
    );
};

export default Login;