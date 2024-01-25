
import { BrowserRouter as Router,Route,Routes } from "react-router-dom"
import { Suspense, lazy, useEffect } from "react"
import Loader from "./Components/Loader";
import Header from "./Components/Header";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { Auth } from "./Firebase";
import { useDispatch, useSelector } from "react-redux";
import { UserExist, UserNotExist } from "./Redux/Reducers/UserReducer";
import { GetUser } from "./Redux/Api/User";
import { USERInitialState } from "./Types/userreducer-Type";
import ProtectedRoute from "./Components/ProtectedRoute";

const Home = lazy(()=>import("./Pages/Home"));
const Login = lazy(()=>import("./Pages/Login"));
const Search = lazy(()=>import("./Pages/Search"));
const Cart = lazy(()=>import("./Pages/Cart"));
const OrderDetails = lazy(()=>import("./Pages/OrderDetails"));
const Orders = lazy(()=>import("./Pages/Orders"));
const Shipping = lazy(()=>import("./Pages/Shipping"));
const Dashboard = lazy(() => import("./Pages/admin/dashboard"));
const Products = lazy(() => import("./Pages/admin/products"));
const Customers = lazy(() => import("./Pages/admin/customers"));
const Transaction = lazy(() => import("./Pages/admin/transaction"));
const Barcharts = lazy(() => import("./Pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./Pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./Pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./Pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./Pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./Pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./Pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./Pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./Pages/admin/management/transactionmanagement")
);




const App = () => {

  const {user,loading }= useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer)

const dispatch = useDispatch();

  useEffect(()=>{

    onAuthStateChanged(Auth,async(user)=>{
    if(user){
      const data = await GetUser(user.uid)

      dispatch(UserExist(data.user))
   
    }else{
      dispatch(UserNotExist())
    }
    })

  },[])

  return  loading ? <Loader/> :  (
    <Router>

      <Header user={user}/>
      <Suspense fallback={<Loader/>}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={ <ProtectedRoute isAuthenticated={user ? false : true}>
<Login/>
        </ProtectedRoute> } />
<Route element={<ProtectedRoute isAuthenticated={user ? true :false} />}>
        <Route path="/shipping" element={<Shipping/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/order/:id" element={<OrderDetails/>} />
        </Route> 
        
        {/* Admin Routes */}
        <Route
  element={
    <ProtectedRoute isAuthenticated={true} adminroute={true} isadmin={user?.role=== "admin" ? true :false } />
  }
>
  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/admin/product" element={<Products />} />
  <Route path="/admin/customer" element={<Customers />} />
  <Route path="/admin/transaction" element={<Transaction />} />
  {/* Charts */}
  <Route path="/admin/chart/bar" element={<Barcharts />} />
  <Route path="/admin/chart/pie" element={<Piecharts />} />
  <Route path="/admin/chart/line" element={<Linecharts />} />
  {/* Apps */}
  <Route path="/admin/app/coupon" element={<Coupon />} />
  <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
  <Route path="/admin/app/toss" element={<Toss />} />

  {/* Management */}
  <Route path="/admin/product/new" element={<NewProduct />} />

  <Route path="/admin/product/:id" element={<ProductManagement />} />

  <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
</Route>;
      </Routes>
      </Suspense>
      <Toaster position="top-right"/>
    </Router>
  )
}

export default App