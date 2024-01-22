import multer from "multer";
import { v4 as uuid} from "uuid"

const storage = multer.diskStorage({ 

    destination(req, file, callback){
        callback(null,"uploads")

    },
    filename(req,file,callback){
        const id = uuid();
        const Extname= file.originalname.split(".").pop()
        callback(null, `${id}.${Extname}`)
    }

 })
  
export const Singleupload = multer({ storage }).single("image")