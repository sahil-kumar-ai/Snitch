import ImageKit, { toFile } from '@imagekit/nodejs';    
import config from '../config/config.js';

const client = new ImageKit({
    privateKey : config.IMAGE_KIT_SECRET_KEY,
})

const uploadFile = async (buffer, fileName) => {
    const upload = await client.files.upload({
        file : await toFile(buffer),
        fileName : fileName,
        folder : "Snitch"
    })

    return upload;
};


export default uploadFile;