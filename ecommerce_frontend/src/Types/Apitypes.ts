import { ORDER, PRODUCT, USER } from "./Types"

export type Error={
    status:number;
    data:{
        success:boolean;
        message:string;
    }
}

export type MessageResponse= {
success:boolean,
message:string,
}

export type UserResponse= {
success:boolean,
user:USER,
}
export type AllOrderResponse= {
success:boolean,
orders:ORDER[],
}
export type OrderResponse= {
success:boolean,
orders:ORDER,
}

export type ProductResponse= {
success:boolean,
product:PRODUCT[],
}
export type GetUserResponse= {
success:boolean,
user:USER[],
}
export type ProductbyidResponse= {
success:boolean,
product:PRODUCT,
}

export type CategoriesResponse= {
success:boolean,
product:string[],
}

export type SerachResponse= {
success:boolean,
product:PRODUCT[],
totalpage:number
}

export type SerachRequest= {
search:string,
perpage:number,
category:string,
sort:string,
price:number
}

export type NewproductRequest ={
id:string,
formdata:FormData,
}

export type UpdateproductRequest ={
UserId:string,
ProductId:string,
formdata:FormData,
}

export type DeleteProductRequest ={
UserId:string,
ProductId:string,
}

export type DeleteUserRequest ={
UserId:string,
AdminId:string,
}