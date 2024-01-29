import { useSelector } from "react-redux";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { BarChart } from "../../../Components/admin/Charts";
import { USERInitialState } from "../../../Types/userreducer-Type";
import { useDashboardBarQuery } from "../../../Redux/Api/DashboardApi";
import { Error } from "../../../Types/Apitypes";
import toast from "react-hot-toast";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

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
            data_1={[
              200, 444, 343, 556, 778, 455, 990, 444, 122, 334, 890, 909,
            ]}
            data_2={Order}
            title_1="Orders"
            title_2=""
            bgColor_1={`hsl(180, 40%, 50%)`}
            bgColor_2=""
            labels={months}
          />
          <h2>Orders throughout the year</h2>
        </section>
      </main>
    </div>
  );
};

export default Barcharts;
