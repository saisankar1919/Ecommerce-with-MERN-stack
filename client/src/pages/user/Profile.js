import React, { useState, useEffect } from 'react'
import UserNav from '../../components/nav/UserNav'
import AdminNav from '../../components/nav/AdminNav'
// import {  } from '../../helpers/user'
import { useSelector, useDispatch } from 'react-redux'
import UserImage from '../../components/user/UserImage'
import {
    getUser,
    updateName,
    updateMob,
    updateAddress,
    deleteAddress
} from '../../functions/profile'
// import { Link } from 'react-router-dom'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { GrEdit } from "react-icons/gr";


const Profile = () => {

    const [name, setName] = useState('')
    console.log(name)
    const [mobile, setMobile] = useState('')
    console.log(mobile)
    const [address, setAddress] = useState('')
    const [addresses, setAddresses] = useState([])
    const [userInfo, setUserInfo] = useState({})
    // const [formAddress, setFormAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [pin, setPin] = useState('')
    // const [values, setValues] = useState([])
    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)
    const [add, setAdd] = useState(false)
    const [mobError, setMobError] = useState(true)
    const [addressError, setAddressError] = useState({
        address: true,
        state: true,
        pin: true
    })

    const { user } = useSelector(state => state)


    useEffect(() => {

        console.log('hello')
        getUser(user.token).then(res => {
            console.log(res)
            setName(res.data.user.name)
            setMobile(res.data.user.phone)
            setImage(res.data.images)
            // setAddresses(res.data.user.address)
            console.log('profile userEffect', res.data)
        })

        setUserInfo(userInfo)

    }, [])

    const clearForm = () => {
        setAddress('')
        setCity('')
        setState('')
        setPin('')
    }

    const handleAddBtn = () => {
        setAdd(true)
    }


    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleMobile = (e) => {
        let mobRegex = /^[0-9\b]*$/
        if (e.target.value.match(mobRegex)) {
            console.log('inside handleMobile')
            if (e.target.value.length > 10)
                e.preventDefault()
            else
                setMobile(e.target.value)
        }
        // console.log('e.target.value.length = ', e.target.value.length)
        if (e.target.value.length === 10 || e.target.value.length === 11) {

            document.getElementById('numErr').innerText = ''
            setMobError(false)
        }
        else
            setMobError(true)
    }

    const handleMobBlur = (e) => {
        if (e.target.value.length < 10) {
            document.getElementById('numErr').innerText = 'Mobile number needs to be of 10 digits!'
        }

    }

    const editName = () => {
        // console.log('inside edit')
        document.getElementById('name').disabled = false
        document.getElementById('nameSaveBtn').style.display = 'inline'
        document.getElementById('edit').style.display = 'none'
        //input.setAttribute('disabled', '')
    }

    const editNum = () => {
        document.getElementById('num').disabled = false
        document.getElementById('numSaveBtn').style.display = 'inline'
        document.getElementById('edit').style.display = 'none'

    }

    const saveEditName = () => {
        console.log('here')
        updateName(user.token, name)
            .then(res => console.log(res.data))
        document.getElementById('nameSaveBtn').style.display = 'none'
        document.getElementById('name').disabled = true
        document.getElementById('edit').style.display = 'inline'


    }

    const saveEditMob = () => {
        console.log('moberror', mobError)
        if (!mobError) {
            updateMob(user.token, parseInt(mobile))
                .then(res => console.log(res.data))
            document.getElementById('numSaveBtn').style.display = 'none'
            document.getElementById('num').disabled = true
            document.getElementById('edit').style.display = 'inline'

        }
    }

    // const submitAddress = (e) => {
    //     e.preventDefault()

    //     console.log('is pin true?', (pin === true))

    //     if (pin === '')
    //         document.querySelector('#pinError').innerHTML = 'Pincode cannot be empty!'
    //     if (state === '')
    //         document.querySelector('#stateError').innerHTML = 'Select a state!'

    //     if (!addressError.address && !addressError.state && !addressError.pin) {
    //         console.log('addressError = ', addressError)
    //         // updateAddress(user.token, { address, city, state, pin: parseInt(pin) })
    //         //     .then(res => {
    //         //         setAdd(false)
    //         //         setAddresses(res.data.address)
    //         //         clearForm()
    //         //     })
    //     }

    // }

    // const handleDeleteAddress = (index) => {
    //     if (window.confirm('Are you sure you want to delete this address?')) {
    //         // deleteAddress(user.token, index).then(res => {
    //         //     if (res.data) {
    //         //         // console.log(res.data)
    //         //         setAddresses(res.data.address)
    //         //     }
    //         // })
    //     }
    // }

    // const handleAddress = () => {
    //     if (address.length < 5) {
    //         document.querySelector('#addressError').innerHTML = 'This field needs to be atleast 5 characters!'
    //         setAddressError({ ...addressError, address: true })
    //     }
    //     else {
    //         document.querySelector('#addressError').innerHTML = ''
    //         setAddressError({ ...addressError, address: false })
    //     }
    // }

    // const handleState = (e) => {
    //     if (e.target.value) {
    //         document.querySelector('#stateError').innerHTML = ''
    //         setAddressError({ ...addressError, state: false })
    //     }
    //     else {
    //         setAddressError({ ...addressError, state: true })
    //     }
    //     setState(e.target.value)
    // }

    // const handlePin = (e) => {

    //     console.log('girrrrrrr')
    //     let numRegex = /^[0-9\b]*$/
    //     if (e.target.value.match(numRegex)) {
    //         if (e.target.value) {
    //             document.querySelector('#pinError').innerHTML = ''
    //             setAddressError({ ...addressError, pin: false })
    //         }

    //         setPin(e.target.value)
    //     }

    //     else {
    //         setAddressError({ ...addressError, pin: true })
    //     }

    // }

    // const showAddress = () => {
    //     const states = ["Andhra Pradesh",
    //         "Arunachal Pradesh",
    //         "Assam",
    //         "Bihar",
    //         "Chhattisgarh",
    //         "Goa",
    //         "Gujarat",
    //         "Haryana",
    //         "Himachal Pradesh",
    //         "Jammu and Kashmir",
    //         "Jharkhand",
    //         "Karnataka",
    //         "Kerala",
    //         "Madhya Pradesh",
    //         "Maharashtra",
    //         "Manipur",
    //         "Meghalaya",
    //         "Mizoram",
    //         "Nagaland",
    //         "Odisha",
    //         "Punjab",
    //         "Rajasthan",
    //         "Sikkim",
    //         "Tamil Nadu",
    //         "Telangana",
    //         "Tripura",
    //         "Uttarakhand",
    //         "Uttar Pradesh",
    //         "West Bengal",
    //         "Andaman and Nicobar Islands",
    //         "Chandigarh",
    //         "Dadra and Nagar Haveli",
    //         "Daman and Diu",
    //         "Delhi",
    //         "Lakshadweep",
    //         "Puducherry"]


    //     return (
    //         <div className="container-fluid">
    //             {/* {JSON.stringify(userInfo)} */}
    //             <div className="row ml-1 mr-2 mt-2 mb-2">
    //                 {addresses.length > 0 && addresses.map((address, i) => <div className='col-md-6 mr-2 mt-2 mb-2 border shadow-sm pr-2 pt-2 pb-2'>
    //                     <p>{address.address}, {address.city}
    //                         <span class='float-right' onClick={() => handleDeleteAddress(i)} style={{ cursor: 'pointer' }}>
    //                             <DeleteOutlined />
    //                         </span></p>
    //                     <p>{address.state} - {address.pin}</p>

    //                 </div>)}
    //             </div>

    //             {(!add && addresses.length < 3) && <div className=''> <button className='btn btn-info' onClick={handleAddBtn} style={{ cursor: 'pointer' }}>Add</button></div>}


    //             {(add) && <form >
    //                 <div className="form-row flex-column">
    //                     <div className="form-group col-md-6">
    //                         <textarea className='form-control' placeholder='Address (Area and Street)' rows='4' cols='40' name='address'
    //                             value={address} onChange={(e) => setAddress(e.target.value)} onBlur={handleAddress} />
    //                         <p className='text-danger' id='addressError'></p>
    //                     </div>
    //                     <div className="form-group col-md-6">
    //                         <input className='form-control' type="text" placeholder='City' name='city' value={city} onChange={(e) => setCity(e.target.value)} />
    //                     </div>
    //                     <div className="form-group col-md-6">
    //                         <select className='form-control' name="state" id="" value={state} onChange={handleState}>
    //                             <option value="">Select</option>
    //                             {states.map(s => <option value={`${s}`}> {s} </option>)}
    //                         </select>
    //                         <p className='text-danger' id='stateError'></p>
    //                     </div>
    //                     <div className="form-group col-md-6">
    //                         <input className='form-control' type="text" name="pin" id="" placeholder='Pincode' value={pin} onChange={handlePin} />
    //                         <p className='text-danger' id='pinError'></p>
    //                     </div>


    //                 </div>
    //                 <button className='btn btn-success' onClick={submitAddress}>Save</button>
    //             </form>}
    //         </div>
    //     )
    // }


    return (
        <div className="container-fluid" style={{marginTop:'75px'}}>
            <div className="row pr-3 pb-3">
                <div className="col-md-2">
                {user.role ==='admin' ? <AdminNav/> : <UserNav/>}
                </div>
                <div className="col">
                    <div className="p-3">
                        <div style={{marginLeft:'450px'}}>
                            <UserImage image={image} setImage={setImage} setLoading={setLoading} loading={loading} />
                        </div>
                    </div>
                    <div className="p-3 form-group col-md-4">
                        <h5>Name</h5>
                        <div className="input-group">
                            <input className='form-control' type="text" value={name} onChange={handleName} disabled={true} id='name' />
                            <a className='p-2 btn btn-dark float-right' id='edit' onClick={editName}><GrEdit/></a>
                            <button className='ml-5 btn btn-primary' onClick={saveEditName} id='nameSaveBtn' style={{ display: 'none', color:'rgb(87 67 67)' }}>Save</button>
                        </div>

                    </div>

                    <div className="p-3 form-group col-md-4">
                        <h5>Email</h5>
                        <p>{user.email}</p>
                    </div>

                    <div className="p-3 form-group col-md-4">
                        <h5>Mobile Number</h5>
                        <div className="input-group">
                            <input className='form-control' style={{backgroundColor:'white'}} type="text" value={mobile} onChange={handleMobile} onBlur={handleMobBlur} disabled={true} id='num' />
                            <a className='p-2 btn btn-dark' id='edit' onClick={editNum}><GrEdit/></a>
                            <button className='ml-5 btn btn-success' onClick={saveEditMob} id='numSaveBtn' style={{ display: 'none' }}>Save</button>
                        </div>
                        <p className='text-danger' id='numErr'></p>
                    </div>
{/* 
                    <div className='p-3'>
                        <h5>Address</h5>
                        {showAddress()}
                    </div> */}

                    {/* <Link to='/user/password'>
                    <button className='btn btn-info'>Change Password</button>
                    </Link> */}
                    

                </div>
            </div>
        </div>
    )
}

export default Profile