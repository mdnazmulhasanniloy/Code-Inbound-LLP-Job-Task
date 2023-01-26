import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import './AddItemsField.css'

const AddItemsField = ({setAddItems, register}) => {
    
    
    const [rate, setRate] = useState(null);
    const [basicCost, setBasicCost] = useState(null);
    const [quantity, setQuantity] = useState(null);
    const [discount, setDiscount] = useState(null);
    const [discountAmt, setDiscountAmt] = useState(null);
    const [finalBasicCost, setFinalBasicCost] = useState(null);
    const [texes, setTexes] = useState(null);
    const [taxesAmt, setTaxesAmt] = useState(null);
    const [totalCost, setTotalCost] = useState(null);
    





    //basic cost calculation
    function basicCosts(rate, quantity) {
        const newCost = rate * quantity;
        setBasicCost(newCost)
    }

    //discount amt calculation
    function DiscountAmount(basicCost, discount) {

        const newDiscountAmt = basicCost * discount / 100 ;
        setDiscountAmt(newDiscountAmt)

    }

    // final basic cost calculation
    function  finalBasicCostAmount( basicCost, discountAmt ){

            const newFinalBasicCost = basicCost - discountAmt;
            setFinalBasicCost(newFinalBasicCost)
    }
    // final basic cost calculation
    function  finalTaxesAmount( basicCost, texes ){

            const newTaxesAmt= basicCost * texes / 100;
            setTaxesAmt(newTaxesAmt);
    }





    const handelRateInput = e => {
        
        const input = e.target.value;
        const pattern = /^[0-9]*$/;
        // if(pattern.test(input)){
        //     setRate(input);
        // }else{
        //     toast.error('Please enter a number type value.')
        // }
        setRate(input);
       
    }
    const handelQuantityInput = e => {
        
        const input = e.target.value;
        // const pattern = /^[0-9]*$/;
        // if(pattern.test(input)){
            
        //     setQuantity(input);
        //     basicCosts(rate, quantity)
        // }else{
        //     toast.error('Please enter a number type value.')
        // }
        setQuantity(input);
        basicCosts(rate, quantity)
        
    }


    const handelDiscountInput = e => {
        
       
        const input = e.target.value;
        const pattern = /^[0-9]*$/;
        if(pattern.test(input)){
            
            setDiscount(input);
            DiscountAmount(basicCost, discount);
            
        }else{
            toast.error('Please enter a number type value.')
        }
    }



    const handelTaxesChange = e => {
        
        const input = e.target.value;
        const pattern = /^[0-9]*$/;
        if(pattern.test(input)){
            
            setTexes(input);
            finalTaxesAmount( basicCost, texes );

            //total cost 
            const NweTotalCost = basicCost + taxesAmt;
            setTotalCost(NweTotalCost)
        }else{
            toast.error('Please enter a number type value.')
        }
    }

    console.log(basicCost, rate);

    
    const handelChange = e => {}
    return (
        <tr>
            <td>

            </td>
            <td>
                <Form.Control type="text" {...register("ItemName")} placeholder="Item Name" />
            </td>
            <td>
                <Form.Control type="text" name='rate' {...register("Rate")} onChange={handelRateInput} value={rate} placeholder="Rate" />
            </td>
            <td>
                <Form.Control type="text" name='quantity' {...register("Quantity")} onChange={handelQuantityInput} value={quantity}  placeholder="Quantity" />
            </td>
            <td>
            <Form.Control type="text" className='default-inputField' value={basicCost}   {...register("BasicCost")} readOnly />
            </td>
            <td>
                <Form.Control type="text" name='discount' {...register("Discount")} onChange={handelDiscountInput} value={discount} placeholder="Discount (%)" />
            </td>
            <td>
                    <Form.Control type="text" className='default-inputField' value={discountAmt}   {...register("discountAmt")} readOnly />
            </td>
            <td>
                    <Form.Control type="text" className='default-inputField' value={finalBasicCost}   {...register("finalBasicCost")} readOnly />
            </td>
            <td>
                <Form.Control type="text" name='taxes'  {...register("Taxes")} onChange={handelTaxesChange} value={texes}  placeholder="Taxes(%)" />
            </td>
            <td>
                <Form.Control type="text" className='default-inputField' value={taxesAmt}   {...register("taxesAmt")} readOnly />
            </td>
            <td>
                <Form.Control type="text" className='default-inputField' value={totalCost}   {...register("totalCost")} readOnly />
            </td>
            <td>
                <Button variant="danger" className='me-3' onClick={()=>{setAddItems(false)}} >Delete</Button>
            </td>
      </tr>
    
    );
};

export default AddItemsField;