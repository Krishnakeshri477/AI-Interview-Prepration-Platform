// backend/src/services/imagekitService.js
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

exports.uploadToImageKit = async (buffer, fileName, folder = '/') => {
    try {
        const uploadResponse = await imagekit.upload({
            file: buffer,
            fileName: fileName,
            folder: folder,
            useUniqueFileName: true
        });

        console.log(`File uploaded successfully to ImageKit: ${uploadResponse.url}`);
        return uploadResponse.url;
    } catch (err) {
        console.error('Error uploading to ImageKit:', err);
        throw new Error('Failed to upload audio to ImageKit');
    }
};