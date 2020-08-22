import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new aws.S3({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_KEY,
  region: "ap-northeast-2",
});

// const upload = multer({ dest: "uploads/" });

const multerImage = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "gpoopmap/image",
  }),
});
// key: function (_req, file, cb) {
//   const extension = path.extname(file.originalname);
//   cb(null, Date.now().toString() + extension);
// },

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "gpoopmap/avatar",
  }),
});

export const uploadImage = multerImage.single("imageFile");
export const uploadAvatar = multerAvatar.single("avatar");
