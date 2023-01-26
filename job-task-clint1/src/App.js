import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import toast, { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router';
import { useState } from 'react';
import HashLoader from "react-spinners/HashLoader";

function App() {
  const [loading, setLoading] = useState(false);
  // useEffect(()=>{
  //   setLoading(true);
  //   setTimeout(()=>{
  //     setLoading(false);

  //   }, 8000)
  // },[])


  return (
    <>
    {
      loading ? <div className="spanner"><HashLoader  color="#005be6" /> <h1>welcome</h1></div>
      : <div >
      <RouterProvider  router={router}></RouterProvider>
      <Toaster />  
      </div>
    }
    </>
   
  );
}

export default App;
