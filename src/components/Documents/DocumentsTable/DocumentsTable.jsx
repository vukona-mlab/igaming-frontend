import React from 'react';
import './DocumentsTable.css';

export default function DocumentsTable(){
  const data = [{
    dname:'identy card.pdf',
    status:'Approve',
    dtype:'identity',
    email:'rea@gmail.com',
    date:'18/03/2024'
  }]
  return(
    <div className='overlord'>
    <table className="table-container">
     <tbody>
       <tr className="table-heading">
         <th className="t-heading">Document Name</th>
         <th className="t-heading">Status</th>
         <th className="t-heading">Document type</th>
         <th className="t-heading">Email</th>
         <th className="t-heading">Date added</th>
         <th className="t-heading">Actions</th>
       </tr>
       {data.map((item)=>(
          <tr key={item.id}>
          <td className="t-data">{item.dname}</td>
          <td className="t-data">{item.status}</td>
          <td className="t-data">{item.dtype}</td>
          <td className="t-data">{item.email}</td>
          <td className="t-data">{item.date}</td>
          <td className="t-data"><div className="action-buttons">
            <div className="view-button">View</div>
            <div className="delete-button">Delete</div>
            </div></td>
        </tr>
       ))}
     </tbody>
    </table>
    </div>
  )
}