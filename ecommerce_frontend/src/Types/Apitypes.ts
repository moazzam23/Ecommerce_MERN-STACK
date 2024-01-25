import { PRODUCT, USER } from "./Types"

export type MessageResponse= {
success:boolean,
message:string,
}

export type UserResponse= {
success:boolean,
user:USER,
}


export type ProductResponse= {
success:boolean,
product:PRODUCT[],
}