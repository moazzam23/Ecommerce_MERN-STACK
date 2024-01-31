import { useSelector } from "react-redux";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { BarChart } from "../../../Components/admin/Charts";
import { USERInitialState } from "../../../Types/userreducer-Type";
import { useDashboardBarQuery } from "../../../Redux/Api/DashboardApi";
import { Error } from "../../../Types/Apitypes";
import toast from "react-hot-toast";
import { GetLastMonth } from "../../../utils/Features";



const {last12Month,last6Month}= GetLastMonth()

const Barcharts = () => {

  const {user} = useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer)

const {data , isError,error}= useDashboardBarQuery(user?._id!)
if(isError) toast.error((error as Error).data.message)
const Products= data?.barchart.product || [];
const User= data?.barchart.user || [];
const Order= data?.barchart.order || [];

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Bar Charts</h1>
        <section>
          <BarChart
            data_2={Products}
            data_1={User}
            labels={last6Month}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260, 50%, 30%)`}
            bgColor_2={`hsl(360, 90%, 90%)`}
          />
          <h2>Top Products & Top Customers</h2>
        </section>

        <section>
          <BarChart
            horizontal={true}
            data_1={
             Order
            }
            data_2={[]}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={last12Month}
          />
          <h2>Orders throughout the year</h2>
        </section>
      </main>
    </div>
  );
};

export default Barcharts;
