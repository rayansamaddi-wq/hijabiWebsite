import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCartItems } from "../slices/cartSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        console.log("========== PAYMENT RESULT ==========");

        const tapId =
          searchParams.get("tap_id") ||
          searchParams.get("charge_id") ||
          searchParams.get("id");

        console.log("URL:", window.location.href);
        console.log("tap_id:", tapId);
        console.log("orderId:", searchParams.get("orderId"));

        if (!tapId) {
          console.error("❌ No tap_id found in URL.");

          setMessage("Invalid payment session.");
          setLoading(false);

          setTimeout(() => {
            navigate("/cart");
          }, 3000);

          return;
        }

        console.log("➡️ Calling backend...");
        console.log(`/api/v1/payment/charge/${tapId}`);

        const { data } = await axios.get(
          `/api/v1/payment/charge/${tapId}`
        );

        console.log("========== BACKEND RESPONSE ==========");
        console.log(data);

        if (!data.success) {
          throw new Error("Unable to verify payment.");
        }

        const charge = data.charge;

        console.log("========== TAP CHARGE ==========");
        console.log(JSON.stringify(charge, null, 2));

        console.log("ID:", charge.id);
        console.log("Status:", charge.status);
        console.log("Response:", charge.response);
        console.log("Source:", charge.source);
        console.log("Transaction:", charge.transaction);
        console.log("Gateway:", charge.gateway);
        console.log("Customer:", charge.customer);
        console.log("Activities:", charge.activities);
        console.log("Error:", charge.error);
        console.log("===============================");

        switch (charge.status) {
          case "CAPTURED":
            console.log("✅ PAYMENT CAPTURED");

            dispatch(clearCartItems());

            setMessage("✅ Payment successful! Redirecting...");

            setTimeout(() => {
              navigate("/my-orders");
            }, 2000);

            break;

          case "FAILED":
            console.log("❌ PAYMENT FAILED");
            setMessage("❌ Payment failed.");

            setTimeout(() => {
              navigate("/cart");
            }, 3000);

            break;

          case "DECLINED":
            console.log("⚠️ CARD DECLINED");
            setMessage("⚠️ Your card was declined.");

            setTimeout(() => {
              navigate("/cart");
            }, 3000);

            break;

          case "CANCELLED":
            console.log("🚫 PAYMENT CANCELLED");
            setMessage("🚫 Payment was cancelled.");

            setTimeout(() => {
              navigate("/cart");
            }, 3000);

            break;

          case "AUTHORIZED":
            console.log("⏳ PAYMENT AUTHORIZED");
            setMessage("⏳ Payment authorized. Waiting for capture...");
            break;

          default:
            console.log("ℹ️ UNKNOWN STATUS:", charge.status);
            setMessage(`Payment Status: ${charge.status}`);
        }
      } catch (error) {
        console.error("========== PAYMENT ERROR ==========");
        console.error(error);

        if (error.response) {
          console.error("HTTP Status:", error.response.status);
          console.error("Response:", error.response.data);
        }

        setMessage(
          error.response?.data?.message ||
            error.message ||
            "Unable to verify payment."
        );
      } finally {
        setLoading(false);
        console.log("========== END PAYMENT CHECK ==========");
      }
    };

    verifyPayment();
  }, [dispatch, navigate, searchParams]);

  return (
    <div className="container mx-auto py-5 text-center">
      <h2 className="mb-4">Payment Status</h2>

      {loading ? (
        <>
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>

          <p className="mt-3">{message}</p>
        </>
      ) : (
        <div className="alert alert-info">
          {message}
        </div>
      )}
    </div>
  );
};

export default PaymentResult;