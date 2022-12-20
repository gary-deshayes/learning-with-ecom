import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './dist/uploads/profile_pics')
    },

    filename: function (req: any, file: any, cb: any) {
        let extension = ''
        switch (file.mimetype) {
            case "image/jpg":
            case "image/jpeg":
                extension = '.jpg'
                break;
            case "image/png":
                extension = '.png'
                break;
        }

        cb(null, req.user._id + extension)
    }
});
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {

        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
}
export const uploadProfilPics = multer({ storage: storage, fileFilter: fileFilter });