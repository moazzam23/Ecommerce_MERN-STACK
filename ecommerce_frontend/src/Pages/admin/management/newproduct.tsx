import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { useSelector } from "react-redux";
import { USERInitialState } from "../../../Types/userreducer-Type";
import { useCreateProductMutation } from "../../../Redux/Api/productApi";
import { ResToast } from "../../../utils/Features";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {

  const {user} = useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer);

  const navigate= useNavigate()
  
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [imagePrev, setimagePrev] = useState<string>("");
  const [image, setimage] = useState<File>();
  
  const[newproduct]= useCreateProductMutation()


  const handlesubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();
if(!image || !stock || !price || !name || !category )
return;

const formdata= new FormData();
formdata.set("name" ,name)
formdata.set("category" ,category)
formdata.set("stock" , stock.toString() )
formdata.set("price" ,price.toString())
formdata.set("image" ,image)

const res= await newproduct({id:user?._id!, formdata})

ResToast(res,navigate,"/admin/product")

  }

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setimagePrev(reader.result);
          setimage(file);
        }
      };
    }
  };

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={handlesubmit}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                required
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                              required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                              required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>image</label>
              <input type="file" required onChange={changeImageHandler} />
            </div>

            {imagePrev && <img src={imagePrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;
