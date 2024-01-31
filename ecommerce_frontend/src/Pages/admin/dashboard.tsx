// import toast from "react-hot-toast";
import { BiMaleFemale } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FaRegBell } from "react-icons/fa";
// import data from "../../assets/data.json";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { useSelector } from "react-redux";
import AdminSidebar from "../../Components/admin/AdminSidebar";
import { BarChart, DoughnutChart } from "../../Components/admin/Charts";
import Table from "../../Components/admin/DashboardTable";
import { useDashboardratioQuery } from "../../Redux/Api/DashboardApi";
import { Navigate } from "react-router-dom";
import Skeleton from "../../Components/Skeleton";
import { RootState } from "../../Redux/Store";
import { GetLastMonth } from "../../utils/Features";
// import Loader from "../../Components/admin/Loader";

const userImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJxA5cTf-5dh5Eusm0puHbvAhOrCRPtckzjA&usqp";

const Dashboard = () => {
  const {user} = useSelector((state:RootState)=>state.UserReducer)

  const {data,isError,isLoading}=  useDashboardratioQuery(user?._id!)

  const {last6Month}= GetLastMonth()

 const stats= data?.stats!;
  if (isError) return <Navigate to={"/"} />;
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="dashboard">
      { isLoading ? (<Skeleton/>):(
        <>
        <div className="bar">
          <BsSearch />
          <input type="text" placeholder="Search for data, users, docs" />
          <FaRegBell />
          <img src={user?.image || userImg} alt="User" />
        </div>

        <section className="widget-container">
          <WidgetItem
            percent={stats.ChangePercent.revenue}
            amount={true}
            value={stats.Count.revenue}
            heading="Revenue"
            color="rgb(0, 115, 255)"
          />
          <WidgetItem
            percent={stats.ChangePercent.user}
            value={stats.Count.user}
            color="rgb(0 198 202)"
            heading="Users"
          />
          <WidgetItem
            percent={stats.ChangePercent.order}
            value={stats.Count.order}
            color="rgb(255 196 0)"
            heading="Transactions"
          />

          <WidgetItem
            percent={stats.ChangePercent.product}
            value={stats.Count.product}
            color="rgb(76 0 255)"
            heading="Products"
          />
        </section>

        <section className="graph-container">
          <div className="revenue-chart">
            <h2>Revenue & Transaction</h2>
            <BarChart
              data_2={data?.stats.chart.Revenue!}
              data_1={data?.stats.chart.order!}
              title_1="Revenue"
              labels={last6Month}
              title_2="Transaction"
              bgColor_1="rgb(0, 115, 255)"
              bgColor_2="rgba(53, 162, 235, 0.8)"
            />
          </div>

          <div className="dashboard-categories">
            <h2>Inventory</h2>

            <div>
              {data?.stats.CategoryCount.map((i) => {
                 const [heading, value] = Object.entries(i)[0];
                 return(
                <CategoryItem
                  key={heading}
                  value={value}
                  heading={heading}
                  color={`hsl(${value * 4}, ${value}%, 50%)`}
                />)
})}
            </div>
          </div>
        </section>

        <section className="transaction-container">
          <div className="gender-chart">
            <h2>Gender Ratio</h2>
            <DoughnutChart
              labels={["Female", "Male"]}
              data={[data?.stats.UserRatio.female!, data?.stats.UserRatio.male!]}
              backgroundColor={[
                "hsl(340, 82%, 56%)",
                "rgba(53, 162, 235, 0.8)",
              ]}
              cutout={90}
            />
            <p>
              <BiMaleFemale />
            </p>
          </div>
          <Table data={data?.stats.LatestTransaction!} />
        </section>
        </>
        )}
      </main>
    </div>
  );
};

interface WidgetItemProps {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
}

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: WidgetItemProps) => (
  <article className="widget">
    <div className="widget-info">
      <p>{heading}</p>
      <h4>{amount ? `Pkr${value}` : value}</h4>
      {percent > 0 ? (
        <span className="green">
          <HiTrendingUp /> +{percent}%{" "}
        </span>
      ) : (
        <span className="red">
          <HiTrendingDown /> {percent}%{" "}
        </span>
      )}
    </div>

    <div
      className="widget-circle"
      style={{
        background: `conic-gradient(
        ${color} ${(Math.abs(percent) / 100) * 360}deg,
        rgb(255, 255, 255) 0
      )`,
      }}
    >
      <span
        style={{
          color,
        }}
      >
        {percent}%
      </span>
    </div>
  </article>
);

interface CategoryItemProps {
  color: string;
  value: number;
  heading: string;
}

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
  <div className="category-item">
    <h5>{heading}</h5>
    <div>
      <div
        style={{
          backgroundColor: color,
          width: `${value}%`,
        }}
      ></div>
    </div>
    <span>{value}%</span>
  </div>
);

export default Dashboard;
