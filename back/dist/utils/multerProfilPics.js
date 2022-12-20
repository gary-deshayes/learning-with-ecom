"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProfilPics = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './dist/uploads/profile_pics');
    },
    filename: function (req, file, cb) {
        let extension = '';
        switch (file.mimetype) {
            case "image/jpg":
            case "image/jpeg":
                extension = '.jpg';
                break;
            case "image/png":
                extension = '.png';
                break;
        }
        cb(null, req.user._id + extension);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {
        cb(null, true);
    }
    else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
};
exports.uploadProfilPics = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
