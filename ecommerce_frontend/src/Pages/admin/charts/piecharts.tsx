import { useSelector } from "react-redux";
import AdminSidebar from "../../../Components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../Components/admin/Charts";
// import data from "../../../assets/data.json";
import { USERInitialState } from "../../../Types/userreducer-Type";
import { useDashboardPieQuery } from "../../../Redux/Api/DashboardApi";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Error } from "../../../Types/Apitypes";

const PieCharts = () => {
  const {user} = useSelector((state:{UserReducer:USERInitialState})=>state.UserReducer)
  const {data,isError,error}= useDashboardPieQuery(user?._id!)
  if(isError) {toast.error((error as Error).data.message)
   return <Navigate to={"/admin/dashboard"} />;
  }
  const piechart= data?.piechart!;
  
  console.log(piechart)

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="chart-container">
        <h1>Pie & Doughnut Charts</h1>
        <section>
          <div>
            <PieChart
              labels={["Processing", "Shipped", "Delivered"]}
              data={[piechart?.Orderfullfillment.Processed,piechart?.Orderfullfillment.Shipped,piechart?.Orderfullfillment.Delivered]}
              backgroundColor={[
                `hsl(110,80%, 80%)`,
                `hsl(110,80%, 50%)`,
                `hsl(110,40%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Order Fulfillment Ratio</h2>
        </section>

        <section>
          <div>
          {piechart?.CategoryCount.map((i) => {
                 const [heading, value] = Object.entries(i)[0];
                 return(
                  <DoughnutChart
                  labels={[heading]}
                  data={[value]}
                  backgroundColor={ [`hsl(${i.value * 4}, ${i.value}%, 50%)`]
                  }
                  legends={false}
                  offset={[0, 0, 0, 80]}
                />
                  // <CategoryItem
                //   key={heading}
                //   value={value}
                //   heading={heading}
                //   color={`hsl(${i.value * 4}, ${i.value}%, 50%)`}
                // />
                )
})}

          </div>
          <h2>Product Categories Ratio</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={["In Stock", "Out Of Stock"]}
              data={[piechart?.StockAvaliability?.outstock,piechart?.StockAvaliability?.totalstock]}
              backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
              legends={false}
              offset={[0, 80]}
              cutout={"70%"}
            />
          </div>
          <h2> Stock Availability</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={[
                "Discount",
                "Production Cost",
                "Burnt",
                "Marketing Cost",
                "Net Margin",
              ]}
              data={[piechart?.RevenueDistribution?.Discount,piechart?.RevenueDistribution?.ProductionCost,piechart?.RevenueDistribution?.burnt,piechart?.RevenueDistribution?.marketingCost,piechart?.RevenueDistribution?.netmargin]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2>Revenue Distribution</h2>
        </section>

        <section>
          <div>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[piechart?.UserAgeGroup.teen,piechart?.UserAgeGroup.adult,piechart?.UserAgeGroup.old]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users Age Group</h2>
        </section>

        <section>
          <div>
            <DoughnutChart
              labels={["Admin", "Customers"]}
              data={[piechart?.AdminBlock.admin,piechart.AdminBlock.customer]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 50]}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default PieCharts;
