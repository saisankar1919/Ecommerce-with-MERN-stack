// import axios from 'axios';
import axios from 'axios'

export const getUser = async(authtoken)=>
    await axios.get(`${process.env.REACT_APP_API}/user/profile/getuser`, {
        headers: {
          authtoken,
        },
      })

export const updateName = async(authtoken, name)=>
await axios.put(`${process.env.REACT_APP_API}/user/profile/updatename`,{name},{
    headers:{
        authtoken
    }
})

export const updateMob = async(authtoken, mobile)=>
await axios.put(`${process.env.REACT_APP_API}/user/profile/updatemobile`,{mobile},{
    headers:{
        authtoken
    }
})

export const updateImage = async(authtoken, url)=>{
console.log('************',url)
    await axios.put(`${process.env.REACT_APP_API}/user/profile/image`,{url},{
        headers:{
            authtoken
        }
    })}

