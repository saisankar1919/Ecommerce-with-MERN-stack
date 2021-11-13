import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getUsers,blockUser, unblockUser } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Report from "../../components/order/Report";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import axios from 'axios';
import Moment from 'moment';
import { BsLockFill, BsUnlockFill } from "react-icons/bs";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
//   const [startDate, setStartDate] = useState();
//   const [endDate, setEndDate] = useState();
  const { user } = useSelector((state) => ({ ...state }));
//   const [filterdata, setFilterData] = useState()
//   console.log(orders);
  // let date = startDate.toISOString() 
//   console.log(startDate)
//   console.log(endDate);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () =>
    getUsers(user.token).then((res) => {
      console.log(res);
      setUsers(res.data);
    });

    const block = (id) =>
        blockUser(id).then((res)=>{
            console.log(user.token)
            loadUsers()
            toast.error('User is blocked')
        })

    const unBlock = (id) =>
        unblockUser(id).then((res)=>{
            loadUsers()
            toast.success("User is unblocked")
        })




  return (
    <div style={{ marginTop: "75px" }}>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h2>Users</h2>
         

          <table className="table table-hover">
            <thead>
              <tr>
                <th>User Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((o, k) => (
                <tr key={k}>
                  <td>{o._id}</td>
                  <td>{o.name}</td>
                  <td>{o.email}</td>
                  {o.status?(<td style={{color:'green'}}>Active</td>):(<td style={{color:'red'}}>Blocked</td>)}
                  <td>{o.phone}</td>
                  {o.status?(<td style={{color:'red', cursor:'pointer'}}><BsLockFill onClick={()=>block(o._id)} /></td>):(<td style={{color:'green', cursor:'pointer'}}><BsUnlockFill onClick={()=>unBlock(o._id)}/></td>)}
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
