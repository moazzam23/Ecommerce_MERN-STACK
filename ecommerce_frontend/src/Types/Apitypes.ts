import {
  Barchart,
  ORDER,
  PRODUCT,
  piechart,
  USER,
  cartItems,
  linechart,
  shippinginfo,
  stats,
} from "./Types";

export type Error = {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
};

export type MessageResponse = {
  success: boolean;
  message: string;
};

export type UserResponse = {
  success: boolean;
  user: USER;
};
export type AllOrderResponse = {
  success: boolean;
  orders: ORDER[];
};
export type OrderResponse = {
  success: boolean;
  orders: ORDER;
};

export type ProductResponse = {
  success: boolean;
  product: PRODUCT[];
};
export type GetUserResponse = {
  success: boolean;
  user: USER[];
};
export type ProductbyidResponse = {
  success: boolean;
  product: PRODUCT;
};

export type CategoriesResponse = {
  success: boolean;
  product: string[];
};

export type SerachResponse = {
  success: boolean;
  product: PRODUCT[];
  totalpage: number;
};

export type SerachRequest = {
  search: string;
  perpage: number;
  category: string;
  sort: string;
  price: number;
};

export type NewproductRequest = {
  id: string;
  formdata: FormData;
};

export type UpdateproductRequest = {
  UserId: string;
  ProductId: string;
  formdata: FormData;
};

export type DeleteProductRequest = {
  UserId: string;
  ProductId: string;
};

export type DeleteUserRequest = {
  UserId: string;
  AdminId: string;
};

export type NeworderResponse = {
  shippingInfo: shippinginfo;
  orderItems: cartItems[];
  subtotal: number;
  tax: number;
  shippingcharges: number;
  discount: number;
  total: number;
  user: string;
};

export type UpdateOrderresponse = {
  orderId: string;
  userId: string;
};
export type DeleteOrderResponse = {
  adminId: string;
  userId: string;
};

export type StateResponse = {
  success: boolean;
  stats: stats;
};
export type PieResponse = {
  success: boolean;
  piechart: piechart;
};
export type BarResponse = {
  success: boolean;
  barchart: Barchart;
};
export type LineResponse = {
  success: boolean;
  linechart: linechart;
};
