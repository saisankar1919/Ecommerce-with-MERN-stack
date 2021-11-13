import React, { useState, useEffect } from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, Badge, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons';
import { updateImage } from '../../functions/profile'
import ImageCropperModal from '../forms/ImageCropperModal'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const UserImage = ({ image, setImage, setLoading, loading }) => {

    const { user } = useSelector((state) => ({ ...state }))
    const [public_id, setPublic_id] = useState('')

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [srcImg, setSrcImg] = useState(null);
    //save the resulted image
    const [result, setResult] = useState(null);
    const [files, setFiles] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {

        console.log('re render');
        fileUploadAndResize()

}, [files])

const handleImage = (e) => {
    if (e.target.files.length > 0) {
        setSrcImg(URL.createObjectURL(e.target.files[0]));
        // console.log(e.target.files[0]);

        setIsModalVisible(true)

    }
};


const showModal = () => {
    setIsModalVisible(true);
};

const onImageEdit = async (imgUrl) => {

    const response = await fetch(imgUrl);
    const blob = await response.blob();

    return blob
}



    const fileUploadAndResize = async () => {
        console.log('inside fileUploadAndResize')
        // console.log(e.target.files);
        //resize using npm package react image file resize
        if(files) {

            // let allUploadedFiles = values.images
            const blobFromUrl = await onImageEdit(result)
            console.log(loading)
    
            setLoading(true)
            console.log('check check', result)
            Resizer.imageFileResizer(blobFromUrl,
                720,
                720,
                'JPEG',
                100,
                0,
                (uri) => {
                    // console.log(uri)
                    axios.post(`${process.env.REACT_APP_API}/profileimage`, { image: uri }, {
                        headers: {
                            authToken: user.token
                        }
                    }).then(res => {
                        console.log('IMG UPLOAD RES DATA', res);
                        console.log(res.data.url)
                        updateImage(user.token, res.data.url)
                            .then(res => {
                                dispatch({
                                    type: 'LOGGED_IN_USER',
                                    payload: { ...user, image: res.data.images }
                                })
                            })
                        setLoading(false)
                        setImage(res.data.url)
                        setPublic_id(res.data.public_id)
    
                    })
                        .catch(err => {
                            setLoading(false)
                            console.log('img upload error');
                        })
                },
                'base64')

        //     axios.post(`${process.env.REACT_APP_API}/uploaduserpicture`, { image: result }, {
        //         headers: {
        //             authToken: user.token
        //         }
        //     }).then(res => {
        //         console.log('IMG UPLOAD RES DATA', res);
        //         updateImage(user.token, res.data.url)
        //             .then(res => {
        //                 dispatch({
        //                     type: 'LOGGED_IN_USER',
        //                     payload: { ...user, image: res.data.image }
        //                 })
        //             })
        //         setLoading(false)
        //         setImage(res.data.url)
        //         setPublic_id(res.data.public_id)

        //     })
        //         .catch(err => {
        //             setLoading(false)
        //             console.log('img upload error');
        //         })

        }
        
        // send back to server to upload to cloudinary
        // set url to images[] in the parent component state - ProductCreate
    }


    const handleImageRemove = (public_id) => {
        console.log(public_id)
        setLoading(true)
        // console.log('remove image', public_id)
        axios.post(`${process.env.REACT_APP_API}/deleteprofileimage`, { public_id }, {
            headers: {
                authToken: user ? user.token : ''
            }
        }).then(res => {
            console.log('removed image', res);
            setLoading(false)
            updateImage(user.token, '')
                .then(res => {
                    dispatch({
                        type: 'LOGGED_IN_USER',
                        payload: { ...user, image: res.data.image }
                    })
                })
                .catch(err => console.log(err))
            setImage('')
            document.getElementById('fileInput').value = null
        })
            .catch(err => {
                console.log(err);
                setLoading(false)
            })
    }

    return (
        <>
            <div className="row">

                <Badge count='X' onClick={() => handleImageRemove(public_id)} style={{ cursor: 'pointer' }}>
                    <Avatar src={image ? image : 'https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg'} size={100} shape='circle' className='ml-3 mb-2' />
                </Badge>

                {loading && <Spin indicator={antIcon} className='m-3 text-danger' />}
            </div>


            <div className='row'>
                <label className='btn btn-primary ml-3' style={{color:'rgb(87 67 67)'}}>Choose File
                    <input type="file"
                        id='fileInput'
                        hidden
                        accept='images/*'
                        onChange={handleImage}
                    />
                </label>

                <ImageCropperModal
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                    showModal={showModal}
                    srcImg={srcImg}
                    setResult={setResult}
                    setFiles={setFiles}
                />

            </div>
        </>

    )
}

export default UserImage