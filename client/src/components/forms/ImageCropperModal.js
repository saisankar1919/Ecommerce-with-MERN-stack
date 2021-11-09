import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css'


function ImageCropperModal({ isModalVisible, setIsModalVisible, setFiles, srcImg, setResult }) {

    //save the image that used to be crop
    const [image, setImage] = useState(null);
    //change the aspect ratio of crop tool as you preferred
    const [crop, setCrop] = useState({ aspect: 1 / 1 });

    useEffect(()=> console.log(srcImg))


    const handleOk = async () => {
        await getCroppedImg()
        setFiles(true)
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const getCroppedImg = async () => {
        try {
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;
            canvas.width = crop.width;
            canvas.height = crop.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                image,
                crop.x * scaleX,
                crop.y * scaleY,
                crop.width * scaleX,
                crop.height * scaleY,
                0,
                0,
                crop.width,
                crop.height
            );

            const base64Image = canvas.toDataURL("image/jpeg", 1);

            console.log(base64Image)

            setResult(base64Image);

        } catch (e) {
            console.log("crop the image");
        }
    };


    return (
        <>
            <Modal
                title="Crop Image"
                bodyStyle={{ backgroundColor: 'rgb(87, 67, 67)' }}
                visible={isModalVisible} onOk={handleOk}
                onCancel={handleCancel} width={700}>
                {srcImg && (
                    <div className='text-center'>
                        <ReactCrop
                            style={{ maxWidth: "50%" }}
                            src={srcImg}
                            onImageLoaded={setImage}
                            crop={crop}
                            onChange={setCrop}
                        />
                        <div className="p-3">
                            {/* <Button
                            onClick={getCroppedImg}
                        >
                            Crop
                        </Button> */}
                        </div>

                    </div>
                )}
            </Modal>
        </>
    );
}

export default ImageCropperModal
