import React, { useContext, useState } from 'react';
import { Form, Col, Row, FloatingLabel, Image } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaGithub, FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import { useForm } from "react-hook-form";
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';




const Register = () => {
    const {googleLogin, githubLogin, faceBookLogin, registerWidthUserId, updateUserProfile, emailVerify  } = useContext(AuthContext)
    const [loader, setLoader] = useState(false)
    const [passwordToggle, setPasswordToggle] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const Navigate = useNavigate();
    const Location = useLocation();
    const from = Location.state?.from?.pathname || '/';

    const HandelToGoogleReg = () =>{
        setLoader(true)
        googleLogin()
        .then((result) => {
            toast.success('you are successfully signup');
            Navigate(from, {replace: true})
            setLoader(false)
          }).catch((error) => {
            const errorMessage = error.message;
            setLoader(false)
            toast.error(errorMessage)

          });
    }
    const HandelToGithubReg = () =>{
        setLoader(true)
        githubLogin()
        .then((result) => {
            toast.success('You are successfully signup ')
            setLoader(false)
            Navigate(from, {replace: true})
          }).catch((error) => {
            const errorMessage = error.message;
            setLoader(false)
            toast.error(errorMessage)
          });
    }
    const HandelToFacebookReg = () =>{
        setLoader(true)
        faceBookLogin()
        .then((result) => {
            toast.success('You are successfully signup ')
            setLoader(false)
            Navigate(from, {replace: true})
          }).catch((error) => {
            const errorMessage = error.message;
            setLoader(false)
            toast.error(errorMessage)
          });
    }


    //user id password register
    
  const onSubmit = data => {
    setLoader(true)
    const imgHostKey = `1ac619d1289137be2fe6cbaa52f2b8f9`
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);

        fetch(`https://api.imgbb.com/1/upload?key=${imgHostKey}`, {
                    method: 'POST',
                    body: formData
                })
                .then(res => res.json())
                .then(imgData => {
                    if (imgData.success) {

                       const profile = {
                           displayName: data.name,
                           photoURL: imgData.data.url,

                       }
                       // create user account
                       registerWidthUserId(data.email, data.password)
                       .then((result) => {
                        const user = result.user;

                        //update user profile
                        updateUserProfile(profile)
                            .then(() => {
                                    toast.success('Your account has been successfully create account');
                                    Navigate(from, {replace: true})
                            })
                            .catch(err => {
                                toast.error(err.message)
                                setLoader(false)
                            });
                            console.log(user)
                       })
                       .catch((error) => {
                            const errorMessage = error.message;
                            toast.error(errorMessage)
                            setLoader(false)
                       })
                    }
                })

  }




       

        //  //set error
        // if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        //          setError({...Error, emailError: "please provide email"})
        // }
        // setError({...Error, emailError: ""})

        // //password error conditions

        // if(!/(?=.*[A-Z])/.test(password)){
        //     setError({...Error, passwordError: 'Please provide at last uppercase'})
        //     return;
        // }
        // if(password.length < 6){
        //     setError({...Error, passwordError: 'Please should be at least 6 characters'})
        //     return;
        // }
        // if(!/(?=.*?[#?!@$%^&*-])/.test(password)){
        //     setError({...Error, passwordError: 'Please add at least one special character'})
        //     return;
        // }
        // if(!/(?=.*?[0-9])/.test(password)){
        //     setError({...Error, passwordError: 'Please add at least one special number'})
        //     return;
        // }
        // setError('')
    return (
        <div >
        
        <div className="form-container col-lg-7 m-auto p-3 mt-5">
            <div>
                <h1 className='text-center fs-1 spatial-Font-Family '> Register</h1>
                <div className='my-4 d-flex justify-content-center'>
                    <Link className="spatial-btn " onClick={HandelToGoogleReg}> <FcGoogle className='fs-1' /></Link>
                    <Link  className="spatial-btn mx-3" onClick={HandelToGithubReg}><FaGithub className='fs-1' /></Link>
                    <Link  className="spatial-btn" onClick={HandelToFacebookReg}><FaFacebookSquare className='fs-1' /></Link>
                
                </div>
                <Form action="" className='p-5' onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <FloatingLabel controlId="floatingInputGrid1" label="Enter Your Name">
                                     <Form.Control type="text" name='name'  placeholder="Enter Your Name" {...register("name", {
                                        required: "This field is required (You can't leave this field blank) ",
                                        maxLength: { value: 20, message: "Please Provide" }
    
                                    })}/>
                                    {

                                        errors.name && <p className='text-danger'>{errors.name.message}</p>
                                    }
                            </FloatingLabel>
                        </Col>
                        <Col>
                        <input type="file" name='imageUrl' className="form-control" id="customFile" {...register("img", {
                            required: "img is required",
                        })} accept=".png, .jpg, .jpeg" required />
                        {
                             errors.img && <p className='text-danger'>{errors.img.message}</p>
                        }
                           
                        </Col>
        
                    </Row>
                    <FloatingLabel className='mt-3' controlId="floatingInputGrid2" label="Email address">
                        <Form.Control type="email" name='email' placeholder="name@example.com" required  {...register("email", {
                            required: "Please enter a valid email address (the data you entered is not in the right format) ",
                            maxLength: { value: 20, message: "you enter value is up to 20 characters" }

                        })} />
                        {

                            errors.email && <p className='text-danger'>{errors.email.message}</p>
                        }
                    </FloatingLabel>
                    <FloatingLabel className='mt-4 position-relative' controlId="floatingInputGrid3" label="Enter Password">
                        <Form.Control type={passwordToggle? 'text': 'password'}  placeholder="Enter Password" name='password' {...register("password", {
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
                    
                    <div className='mt-4'>
                        <button className='spatial-btn w-100' type="Submit"  style={{border: 'none'}}> {
                            loader? <> <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            Loading...</> :'Register'} </button>
                    </div>
                    </Form>
                    <p className='text-center'>have an Account? <Link to='/login'>Login</Link></p>
            
            </div>
        
        </div>
            
        </div>
    );
};

export default Register;