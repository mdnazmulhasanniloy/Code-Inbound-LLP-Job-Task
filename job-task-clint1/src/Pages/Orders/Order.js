import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Table from 'react-bootstrap/Table';
import  Button  from 'react-bootstrap/Button';
import TableHeads from './TableHeads/TableHeads';
import AddItemsField from './AddItemsField/AddItemsField';
import { toast } from 'react-hot-toast';
import TableBody from './TableBody/TableBody';
import { useQuery } from '@tanstack/react-query';

const Order = () => {

    const [addItems, setAddItems] = useState(false)
    const [totalBasicCost, setTotalBasicCost] = useState(0)
    const [taxableAmt, setTaxableAmt] = useState(0)
    const [totalCost, setTotalCost] = useState(0)
    const [loader, setLoader] = useState(false)
    

    // show all items 

    const { data: items = [], refetch, isLoading } = useQuery({
        queryKey: ['items'],
        queryFn: async () => {
            const res = await fetch(`https://job-task-server-blond.vercel.app/items`)
            const data = await res.json();
            return data;
        }
    })


    // total amount calculation
    useEffect(() => {
        if(items.length){
            let newBasicCost = 0;
            let newTaxableAmt = 0;
            items.map((item) =>{
                newBasicCost += parseInt(item.totalCost);
                newTaxableAmt += parseInt(item.taxesAmt);
            });

            setTotalBasicCost(newBasicCost);
            setTaxableAmt(newTaxableAmt);
            setTotalCost(newBasicCost + newTaxableAmt);
        }

    },[items])


    //New Items Add
    const handleSubmit = e => {
        setLoader(true)
        e.preventDefault();

        const farm = e.target;

        const itemName = farm.itemName.value;
        const rate = farm.rate.value;
        const basicCost = farm.basicCost.value;
        const quantity = farm.quantity.value;
        const discount = farm.discount.value;
        const discountAmt = farm.discountAmt.value;
        const finalBasicCost = farm.finalBasicCost.value;
        const texes = farm.texes.value;
        const taxesAmt = farm.taxesAmt.value;
        const totalCost = farm.totalCost.value;


        const itemData = {
            itemName,
            rate,
            quantity,
            basicCost,
            discount,
            discountAmt,
            finalBasicCost,
            texes,
            taxesAmt,
            totalCost,
        }
        console.log(itemData);

        fetch(`https://job-task-server-blond.vercel.app/ItemsAdd`, {
        method: 'POST',
        headers:{
            'content-type' : 'application/json'
        },
        body: JSON.stringify(itemData)

    })
    .then(res => res.json())
    .then(data => {
        if(data.acknowledged){
            setLoader(false);
            toast.success('Your Order successfully add');
            refetch();
            setAddItems(false);
        }
    })
    .catch(err => {
        toast.error(err.message);
        setLoader(false)
    });
  
    };
    //Items delete
    const HandelDelete = (id) =>{
        
        if (window.confirm('Are you sure you want to delete') === true) {
            setLoader(true)
            
            fetch(`https://job-task-server-blond.vercel.app/items/delete/${id}`, {
    
                method: 'DELETE',
    
            })
                .then(res => res.json())
                .then(data => {
    
                    if (data.deletedCount > 0) {
                        toast.success('Item deleted successfully.');
                        setLoader(false);
                        refetch();
                    }
                })
                .catch(err => {
                    toast.error(err.message);
                    setLoader(false);
                    console.log(err.message);
                });
          }

    }

     if(isLoading){
        return(<h1 className='text-5xl text-red text-center'>Loading...</h1>)
     }
     items.filter(item => item.totalCost)

     
    
    return (
        <div className='mt-5' style={{height: '120vh', width: '100%'}}>
        <div className="">
        </div>
            <div className="mx-auto" style={{width: '80%'}}>

            <div className="d-flex justify-content-end mb-3">
                <Button variant="primary" className='me-3' onClick={()=>{setAddItems(true)}} >ADD New Item</Button>
            </div>
            
                <form onSubmit={handleSubmit}>
                <Table striped bordered hover>
                    {
                        // Table Header
                    }
                    <TableHeads />
                  <tbody>
                  {
                        items.length > 0 && 
                       
                        items.map((item, i) => <TableBody item={item}
                                                HandelDelete={HandelDelete}
                                                setTotalBasicCost={setTotalBasicCost}
                                                setTaxableAmt={setTaxableAmt}
                                                taxableAmt={taxableAmt}
                                                totalBasicCost={totalBasicCost}
                                                items={items}
                                                 i={i} key={i} />)
                  },
                        
                       
                        {
                           
                            addItems && <AddItemsField  setAddItems={setAddItems} items={items}/>
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

                <div className="d-flex flex-column justify-content-end mb-3">
                    <h2 className='text-3xl '>Total Basic Cost: {totalBasicCost}</h2>
                    <h2 className='text-3xl '>Taxable Amt: {taxableAmt}</h2>
                    <h2 className='text-3xl '>Total Cost: {totalCost}</h2>
                
                </div>
            
            </div>
        </div>
    );
};

export default Order;