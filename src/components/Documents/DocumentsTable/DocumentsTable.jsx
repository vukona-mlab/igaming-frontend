import React from 'react';
import './DocumentsTable.css';


const DocumentsTable = () => (
 <>
 <table>
  <tbody>
    <tr>
      <th>Document Name</th>
      <th>Status</th>
      <th>Document type</th>
      <th>Email</th>
      <th>Date added</th>
      <th>Actions</th>
    </tr>
    {data.map((item)=>(
       <tr key={item.id}>
       <td>Identity card pdf</td>
       <td>Approved</td>
       <td>Identity</td>
       <td>john@gmail.com</td>
       <td>18/03/2025</td>
       <td><div className="action-buttons">
         <div className="view-button">View</div>
         <div className="delete-button">Delete</div>
         </div></td>
     </tr>
    ))}
  </tbody>
 </table>
 </>
)

export default DocumentsTable