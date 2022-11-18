const cloudinary = require('../util/cloudinary');

const uploadFile = async (req,res) => {
    const {folder,picture,fileName} = req.body;

    try{
        const result = await cloudinary.uploader.upload(picture, {
            public_id: `${folder}/${fileName}`,
            overwrite: true
        })
        res.json({
            success: true,
            url: result.url
        })
    }catch (e){
        res.json({
            success: false,
            msg: "can't upload image"
        });
    }
}

module.exports = {
    uploadFile
}