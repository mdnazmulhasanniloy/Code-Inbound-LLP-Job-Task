import React, { useEffect } from 'react';
import  Button  from 'react-bootstrap/Button';


 


const TableBody = ({item, i, HandelDelete, totalBasicCost, totalcosts, setTotalBasicCost, taxableAmt, setTaxableAmt,}) => {

  

    const {
      _id,
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
  } = item;
  console.log(totalCost)
  // totalcosts += parseInt(totalCost);
  // setTotalBasicCost(totalBasicCost + parseInt(totalCost));
 
  return (
    <tr>
    <td>{i+1} </td>
    <td>{itemName} </td>
    <td>{rate} </td>
    <td>{quantity} </td>
    <td>{basicCost} </td>
    <td>{discount} </td>
    <td>{discountAmt} </td>
    <td>{finalBasicCost} </td>
    <td>{texes} </td>
    <td>{taxesAmt} </td>
    <td>{totalCost} </td>
    <td><Button variant="danger" className='me-3' onClick={()=>HandelDelete(_id)} >Delete</Button></td>
  </tr>
  );
};

export default TableBody;

