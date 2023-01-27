import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import {createUserWithEmailAndPassword, FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../Firebase/Firebase.config';



export const AuthContext =createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setuser] = useState({});
    const [loading, setLoading] = useState(true)

        // google sign in
        const googleLogin = () =>{
            const googleAuthProvider = new GoogleAuthProvider();
            setLoading(true)
            return signInWithPopup(auth, googleAuthProvider)
        }

        //gitHub sign in
        const githubLogin = () =>{
            const githubProvider= new GithubAuthProvider();
            return signInWithPopup(auth, githubProvider);
        }
        //facebook sign in
         const faceBookLogin = () =>{
            const faceBoolAuthProvider = new FacebookAuthProvider();
            setLoading(true)
            return signInWithPopup(auth, faceBoolAuthProvider);
         }

         //register user id password
         const registerWidthUserId = (email, password) =>{
            setLoading(true)
            return createUserWithEmailAndPassword(auth, email, password);
         }

            //update user profile
            const updateUserProfile = (profile) =>{
                setLoading(true)
                return updateProfile(auth.currentUser, profile)
                
              }


                //email Verify
            const emailVerify= () =>{
                setLoading(true)
                return sendEmailVerification(auth.currentUser)
                
              }

              //login user
              const userLoginWidthUserPassword =(email, password) => {
                setLoading(true)
                return signInWithEmailAndPassword(auth, email, password)
                
              }

         //logout account
    const userLogout = () =>{
        
        setLoading(true)
        return signOut(auth)
    }



         useEffect(() => {
            const unSubscribe =  onAuthStateChanged(auth, correctUser =>{
                 setuser(correctUser)
                 setLoading(false)
             })
     
             return () =>{  unSubscribe(); }
         }, [])




    const userInfo = {user, loading, googleLogin, githubLogin, faceBookLogin, registerWidthUserId, updateUserProfile, emailVerify, userLogout, userLoginWidthUserPassword} 
    return (
        <AuthContext.Provider value={userInfo}>
        {
            children
        }
        </AuthContext.Provider>
    );
};

export default AuthProvider;
