import { useSelector } from "react-redux";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { LineChart } from "../../../Components/admin/Charts";
import { USERInitialState } from "../../../Types/userreducer-Type";
import { useDashboardLineQuery } from "../../../Redux/Api/DashboardApi";
import { GetLastMonth } from "../../../utils/Features";


const{last12Month}=GetLastMonth()

const Linecharts = () => {

  const {user} = useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer)

  const {data}= useDashboardLineQuery(user?._id!)
  const Products= data?.linechart.product!;
  const User= data?.linechart.user!;
  const Discount= data?.linechart.discount!;
  const Revenue= data?.linechart.revenue!;


  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Line Charts</h1>
        <section>
          <LineChart
            data={User}
            label="Users"
            borderColor="rgb(53, 162, 255)"
            labels={last12Month}
            backgroundColor="rgba(53, 162, 255, 0.5)"
          />
          <h2>Active Users</h2>
        </section>

        <section>
          <LineChart
            data={Products}
            backgroundColor={"hsla(269,80%,40%,0.4)"}
            borderColor={"hsl(269,80%,40%)"}
            labels={last12Month}
            label="Products"
          />
          <h2>Total Products (SKU)</h2>
        </section>

        <section>
          <LineChart
            data={Revenue}
            backgroundColor={"hsla(129,80%,40%,0.4)"}
            borderColor={"hsl(129,80%,40%)"}
            label="Revenue"
            labels={last12Month}
          />
          <h2>Total Revenue </h2>
        </section>

        <section>
          <LineChart
            data={Discount}
            backgroundColor={"hsla(29,80%,40%,0.4)"}
            borderColor={"hsl(29,80%,40%)"}
            label="Discount"
            labels={last12Month}
          />
          <h2>Discount Allotted </h2>
        </section>
      </main>
    </div>
  );
};

export default Linecharts;
