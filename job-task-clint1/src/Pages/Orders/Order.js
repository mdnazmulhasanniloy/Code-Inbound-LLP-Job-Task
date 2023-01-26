import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Table from 'react-bootstrap/Table';
import  Button  from 'react-bootstrap/Button';
import TableHeads from './TableHeads/TableHeads';
import TableBody from './TableBody/TableBody';
import AddItemsField from './AddItemsField/AddItemsField';

const Order = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [addItems, setAddItems] = useState(false)
    


    //New Items Add
    const onSubmit = data => {
        console.log(data)
    };

    //Items delete
    const HandelDelete = (e) =>{

    }

    
    return (
        <div className='mt-5' style={{height: '100vh', width: '100%'}}>
            <div className="mx-auto" style={{width: '80%'}}>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="primary" className='me-3' onClick={()=>{setAddItems(true)}} >ADD New Item</Button>
            </div>
            
                <form onSubmit={handleSubmit(onSubmit)}>
                <Table striped bordered hover>
                    {
                        // Table Header
                    }
                    <TableHeads />
                  <tbody>
                        <TableBody />
                        {
                            addItems && <AddItemsField  setAddItems={setAddItems} register={register} />
                        }

                  </tbody>
                </Table>
                <div className="d-flex justify-content-end mb-3">
                   {
                    addItems && 
                    <Button variant="primary" className='me-3' type='submit'>Save</Button>
                   } 
                </div>
                </form>
            
            </div>
        </div>
    );
};

export default Order;