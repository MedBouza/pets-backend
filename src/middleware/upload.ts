import multer from 'multer';
import uuid from 'uuid';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/');
  },
  filename: (req, file, callback) => {
    const extension = file.mimetype.split('/').pop();
    callback(null, `${uuid.v4()}.${extension}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  },
});

export default upload;
