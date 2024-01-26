import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { USERInitialState } from "../../../Types/userreducer-Type";
import { useDeleteProductMutation, useGetProductbyIDQuery, useUpdateProductMutation } from "../../../Redux/Api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import { ResToast } from "../../../utils/Features";


const Productmanagement = () => {


  const {user}= useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer)

  const params= useParams()
  const navigate= useNavigate()
  const {data}= useGetProductbyIDQuery(params.id!)

  const [ product,setProduct]= useState({
    name:"",image:"",price:0,stock:0,category:"",
  })

  const {name, price,image,stock,category}=product;

const [Updateproduct]= useUpdateProductMutation();

const[deleteProduct] = useDeleteProductMutation()
  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [imageUpdate, setimageUpdate] = useState<string>(image);
  const [imageFile, setimageFile] = useState<File>();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setimageUpdate(reader.result);
          setimageFile(file);
        }
      };
    }
  };

  const submitHandler =async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata= new FormData();
    if (nameUpdate) formdata.set("name" ,nameUpdate)
    if (categoryUpdate)    formdata.set("category" ,categoryUpdate)
    if (stockUpdate)   formdata.set("stock" , stockUpdate.toString() )
    if (priceUpdate)  formdata.set("price" ,priceUpdate.toString())
    if (imageUpdate)  formdata.set("image" ,image)

    const res= await Updateproduct({formdata,UserId:user?._id!,ProductId:data?.product._id!})
    ResToast(res,navigate,"/admin/product")
 
  };
 
 
  const DeleteHandler =async ()=> {
    const res= await deleteProduct({UserId:user?._id!,ProductId:data?.product._id!})
    ResToast(res,navigate,"/admin/product")
 
  };


useEffect(()=>{
  if(data){
    setProduct(data.product)
    setNameUpdate(data.product.name)
    setPriceUpdate(data.product.price)
    setCategoryUpdate(data.product.category)
    setimageUpdate(data.product.image)
  }
},[data])

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID= {params.id}</strong>
          <img src={`http://localhost:3000/${image}`} alt="Product" />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>Pkr{price}</h3>
        </section>
        <article>
          <button className="product-delete-btn" onClick={DeleteHandler}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>image</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {imageUpdate && <img src={`http://localhost:3000/${imageUpdate}`} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Productmanagement;
