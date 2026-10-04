import multer from "multer";

const storageForServer = multer.memoryStorage();

const uploads = multer(
    { storage: storageForServer },
        {limits: {
            fileSize: 1 * 1024 * 1024,
            files: 5,
        }},
);

export default uploads;
