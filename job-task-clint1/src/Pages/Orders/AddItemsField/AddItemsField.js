import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-hot-toast';
import './AddItemsField.css'

const AddItemsField = ({setAddItems, items}) => {
    
    
    const [rate, setRate] = useState(0);
    const [basicCost, setBasicCost] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountAmt, setDiscountAmt] = useState(0);
    const [finalBasicCost, setFinalBasicCost] = useState(0);
    const [texes, setTexes] = useState(0);
    const [taxesAmt, setTaxesAmt] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    

        const SlNo = items.length + 1;



    //basic cost calculation
    function basicCosts(rate, quantity) {
        const newCost = rate * quantity;
        setBasicCost(newCost)
        
    }

    //discount amt calculation
    function DiscountAmount(basicCost, discount) {

        const newDiscountAmt = basicCost * discount / 100 ;
        setDiscountAmt(newDiscountAmt);
        finalBasicCostAmount(basicCost, newDiscountAmt);

    }

    // final basic cost calculation
    function  finalBasicCostAmount( basicCost, discountAmt ){

            const newFinalBasicCost = basicCost - discountAmt;
            setFinalBasicCost(newFinalBasicCost)
    }
    // final basic cost calculation
    function  finalTaxesAmount( finalBasicCost, texes ){

            const newTaxesAmt = finalBasicCost * texes / 100;
            setTaxesAmt(newTaxesAmt);

            //total cost 
            const NweTotalCost = basicCost + taxesAmt;
            setTotalCost(NweTotalCost)
    }





    const handelRateInput = e => {
        
        const input = e.target.value;
        const pattern = /^[0-9]*$/;
        if(pattern.test(input)){
            setRate(input);
        }else{
            toast.error('Please enter a number type value.')
        }
        setRate(input);
       
    }
    const handelQuantityInput = e => {
        
        const input = e.target.value;
        const pattern = /^[0-9]*$/;
        if(pattern.test(input)){
            
            setQuantity(input);
            basicCosts(rate, input)
        }else{
            toast.error('Please enter a number type value.')
        }
        setQuantity(input);
        basicCosts(rate, input)
        
    }


    const handelDiscountInput = e => {
        
       
        const input = e.target.value;
        const pattern = /^[0-9]*$/;
        if(pattern.test(input)){
            
            setDiscount(input);
            DiscountAmount(basicCost, input);
            
        }else{
            toast.error('Please enter a number type value.')
        }
    }



    const handelTaxesChange = e => {
        
        const input = e.target.value;
        const pattern = /^[0-9]*$/;
        if(pattern.test(input)){
            
            setTexes(input);
            finalTaxesAmount( finalBasicCost, input );
        }else{
            toast.error('Please enter a number type value.')
        }
    }


    return (
        <tr>
            <td>
                    {SlNo}
            </td>
            <td>
                <Form.Control type="text" name='itemName'  required placeholder="Item Name" />
            </td>
            <td>
                <Form.Control type="text" name='rate' onChange={handelRateInput} required placeholder="Rate" />
            </td>
            <td>
                <Form.Control type="text" name='quantity' onChange={handelQuantityInput} required placeholder="Quantity" />
            </td>
            <td>
            <Form.Control type="text" name='basicCost' className='default-inputField' value={basicCost} readOnly />
            </td>
            <td>
                <Form.Control type="text" name='discount' onChange={handelDiscountInput}  required placeholder="Discount (%)" />
            </td>
            <td>
                    <Form.Control type="text" name='discountAmt' className='default-inputField' value={discountAmt}    readOnly />
            </td>
            <td>
                    <Form.Control type="text" name='finalBasicCost' className='default-inputField' value={finalBasicCost}  readOnly />
            </td>
            <td>
                <Form.Control type="text" name='texes'  onChange={handelTaxesChange}  required placeholder="Taxes(%)" />
            </td>
            <td>
                <Form.Control type="text" name='taxesAmt' className='default-inputField' value={taxesAmt} readOnly />
            </td>
            <td>
                <Form.Control type="text" name='totalCost' className='default-inputField' value={totalCost} readOnly />
            </td>
            <td>
                <Button variant="danger" className='me-3' onClick={()=>{setAddItems(false)}} >Delete</Button>
            </td>
      </tr>
    
    );
};

export default AddItemsField;