import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CartInitialState } from "../Types/userreducer-Type";
import { SaveShippingInfo } from "../Redux/Reducers/CartReducer";

const Shipping = () => {
  const { cartItems, total } = useSelector(
    (state: { CartReducer: CartInitialState }) => state.CartReducer
  );

  const navigate = useNavigate();
  const dispatch= useDispatch()

  const [shippingdata, setShippingdata] = useState({
    country: "",
    city: "",
    pinCode: 0,
    address: "",
    state: "",
  });

  const shippinghandler = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setShippingdata((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submithandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(SaveShippingInfo(shippingdata))

    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/payment/create",
        { amount: total },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/pay", {
        state: data.clinetSecret,
      });
    } catch (error) {}
  };

  useEffect(() => {
    if (cartItems.length <= 0) return navigate("/cart");
  }, [cartItems]);

  return (
    <div className="shipping">
      <button className="backbtn" onClick={() => navigate("/cart")}>
        {" "}
        <BiArrowBack />{" "}
      </button>

      <form onSubmit={submithandler}>
        <h1>Shipping Address</h1>
        <input
          required
          type="text"
          name="pincode"
          placeholder="Enter your Pin Code"
          onChange={shippinghandler}
          value={shippingdata?.pinCode}
        />
        <input
          required
          type="text"
          name="address"
          placeholder="Enter your Address"
          onChange={shippinghandler}
          value={shippingdata?.address}
        />
        <input
          required
          type="text"
          name="city"
          placeholder="Enter your City"
          onChange={shippinghandler}
          value={shippingdata?.city}
        />
        <input
          required
          type="text"
          name="state"
          placeholder="Enter your State"
          onChange={shippinghandler}
          value={shippingdata?.state}
        />
        <select
          name="country"
          required
          value={shippingdata.country}
          onChange={shippinghandler}
        >
          <option value={""}>Choose the Country</option>
          <option value={"pakistan"}>Pakistan</option>
        </select>

        <button type="submit"> Pay Now </button>
      </form>
    </div>
  );
};

export default Shipping;
