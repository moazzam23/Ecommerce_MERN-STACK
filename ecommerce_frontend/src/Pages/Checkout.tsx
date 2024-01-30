import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CartInitialState, USERInitialState } from "../Types/userreducer-Type";
import { useCreateOrderMutation } from "../Redux/Api/OrderApi";
import { resetcart } from "../Redux/Reducers/CartReducer";
import { ResToast } from "../utils/Features";
import { NeworderResponse } from "../Types/Apitypes";

const stripePromise = loadStripe(
  "pk_test_51Oc3iEF0d5jaFXgrnfqqWoOna9mwXklh9MlJsL6wLbHm34pJ0nFf5TCsaNPjg5fyPdgwneNy4D1xkpwVmbRAjiGF00ujvuejuf"
);

const CheckOutForm = () => {
  const { user } = useSelector(
    (state: { UserReducer: USERInitialState }) => state.UserReducer
  );
  const {
    subtotal,
    tax,
    total,
    shippingcharges,
    shippinginfo,
    discount,
    cartItems,
  } = useSelector(
    (state: { CartReducer: CartInitialState }) => state.CartReducer
  );
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const stripe = useStripe();
  const elements = useElements();

  const [neworder] = useCreateOrderMutation();
  const [isprocessing, setIsprocessing] = useState<boolean>(false);

  const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setIsprocessing(true);

    const order: NeworderResponse = {
      tax,
      total,
      shippingInfo:shippinginfo,
      shippingcharges,
      discount,
      subtotal,
      orderItems:cartItems,
      user:user?._id!,
    };

    setTimeout(() => {
      setIsprocessing(false);
    }, 2000);

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: window.location.origin },
      redirect: "if_required",
    });
    if (error) {
      setIsprocessing(false);
      return toast.error(error.message || "Something Went Wrong");
    }
    if (paymentIntent.status === "succeeded") {
     const res = await neworder(order)
     dispatch(resetcart())
     ResToast(res,navigate,"/orders")
      navigate("/orders");
    }
    setIsprocessing(false);
  };

  return (
    <div className="checkout-container">
      <form onSubmit={submithandler}>
        <PaymentElement />
        <button>{isprocessing ? "Processing..." : "Pay"}</button>
      </form>
    </div>
  );
};

const Checkout = () => {

    const location= useLocation();
    
  const clientSecret: string | undefined = location.state;

  if (!clientSecret) return <Navigate to={"/shipping"} />;
  return (
    <Elements
      options={{
        clientSecret:
          "pi_3OeBl8F0d5jaFXgr18PZEDDU_secret_0FaX5wlOim1oECu7n9HRzhar6",
      }}
      stripe={stripePromise}
    >
      <CheckOutForm />
    </Elements>
  );
};

export default Checkout;
