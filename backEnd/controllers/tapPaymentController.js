import axios from "axios";
import tapConfig from "../config/tap.js";
import { tapHeaders } from "../utils/tapHeaders.js";
import Order from "../models/orderModel.js";


// ============================================
// Create Tap Payment Charge
// ============================================
// ============================================
export const createTapCharge = async (req, res) => {
  try {
    const { amount, currency = "USD", orderId, customer } = req.body;

    if (!amount || !orderId || !customer) {
      return res.status(400).json({
        success: false,
        message: "amount, orderId, customer are required",
      });
    }

    const payload = {
      amount,
      currency,

      threeDSecure: true,
      save_card: false,

      description: `Payment for Order #${orderId}`,

      reference: {
        transaction: orderId, // IMPORTANT: your internal ID
      },

      customer: {
        first_name: customer.firstName,
        last_name: customer.lastName || "",
        email: customer.email,
        phone: {
          country_code: customer.countryCode || "961",
          number: customer.phone,
        },
      },

      source: {
        id: "src_all",
      },

      redirect: {
        // 🔥 IMPORTANT FIX: pass orderId so frontend can verify reliably
        url: `${process.env.FRONTEND_URL}/payment-result?orderId=${orderId}`,
      },
    };

    const response = await axios.post(
      `${tapConfig.baseUrl}/charges`,
      payload,
      {
        headers: tapHeaders(),
      }
    );

    const data = response.data;

    console.log("TAP RESPONSE:", JSON.stringify(data, null, 2));

    const chargeId =
      data.transaction?.id || data.id;

    const paymentUrl =
      data.transaction?.url ||
      data.url;

    if (!paymentUrl) {
      return res.status(500).json({
        success: false,
        message: "No payment URL returned from Tap",
        tapResponse: data,
      });
    }

    return res.status(200).json({
      success: true,
      chargeId,
      paymentUrl,
    });

  } catch (error) {
    console.error("Tap Create Charge Error:", error.response?.data || error.message);

    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.errors?.[0]?.description ||
        error.message,
    });
  }
};
// ============================================
// Get Charge Details
// ============================================
export const getTapCharge = async (req, res) => {
  try {
    const { chargeId } = req.params;

    const response = await axios.get(
      `https://api.tap.company/v2/charges/${chargeId}`,
      {
        headers: tapHeaders(),
      }
    );

    const charge = response.data;

    // ==========================
    // TAP CHARGE DEBUG
    // ==========================
    console.log("\n========== TAP CHARGE ==========");
    console.log("Charge ID:", charge.id);
    console.log("Status:", charge.status);
    console.log("Amount:", charge.amount, charge.currency);
    console.log("Response:", charge.response);
    console.log("Source:", charge.source);
    console.log("Transaction:", charge.transaction);
    console.log("Activities:", charge.activities);
    console.log("Customer:", charge.customer);
    console.log("Error:", charge.error);
    console.log("Gateway:", charge.gateway);

    console.log("\n----- FULL CHARGE OBJECT -----");
    console.log(JSON.stringify(charge, null, 2));
    console.log("================================\n");

    res.status(200).json({
      success: true,
      charge,
    });
  } catch (error) {
    console.error("\n========== TAP API ERROR ==========");

    if (error.response) {
      console.error("HTTP Status:", error.response.status);
      console.error("Response:");
      console.error(JSON.stringify(error.response.data, null, 2));

      return res.status(error.response.status).json({
        success: false,
        error: error.response.data,
      });
    }

    console.error("Message:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================================
// Webhook (Payment Notification)
// ============================================


// ============================================
// Tap Webhook
// ============================================
export const tapWebhook = async (req, res) => {
  try {
    const event = req.body;
console.info(`[Tap] Webhook received: ${event.id}`);
console.info(`[Tap] Order ID: ${event.reference?.transaction}`);
console.info(`[Tap] Status: ${event.status}`);

    const orderId = event.reference?.transaction;
    const status = event.status;

    // ------------------------------------
    // Validate webhook payload
    // ------------------------------------
    if (!orderId) {
      console.error("Webhook Error: Missing order ID.");
      return res.sendStatus(400);
    }

    const order = await Order.findById(orderId);

        if (!order) {
  console.error(`Order ${orderId} not found.`);
  return res.sendStatus(200);
}
    if (order.processedWebhookIds.includes(event.id)) {
  console.info(`[Tap] Webhook ${event.id} already processed.`);
  return res.sendStatus(200);
}



    switch (status) {
      // ====================================
      // PAYMENT SUCCESS
      // ====================================
      case "CAPTURED": {
        // Prevent duplicate processing
        if (order.isPaid) {
          console.warn(`[Tap] Duplicate webhook ignored for order ${orderId}`);
          return res.sendStatus(200);
        }

        order.isPaid = true;
        order.paidAt = new Date();

        order.paymentResult = {
  id: event.id,

  status: event.status,

  amount: event.amount,

  currency: event.currency,

  transactionId: event.reference?.transaction,

  paymentReference: event.reference?.payment,

  gatewayReference: event.reference?.gateway,

  acquirerReference: event.reference?.acquirer,

  email_address: event.customer?.email,

  gateway: "Tap",
  created: event.transaction?.created,
};

    
        order.processedWebhookIds.push(event.id);

await order.save();

      console.info(`[Tap] Order ${orderId} successfully marked as PAID.`);
        break;
      }

      // ====================================
      // PAYMENT FAILED
      // ====================================
      case "FAILED":
    console.warn(`[Tap] Payment FAILED for order ${orderId}`);
        break;

      // ====================================
      // PAYMENT DECLINED
      // ====================================
      case "DECLINED":
        console.warn(`[Tap] Payment DECLINED for order ${orderId}`);
        break;

      // ====================================
      // PAYMENT CANCELLED
      // ====================================
      case "CANCELLED":
       console.warn(`[Tap] Payment CANCELLED for order ${orderId}`);
        break;

      // ====================================
      // AUTHORIZED (if using auth/capture)
      // ====================================
      case "AUTHORIZED":
    console.info(`[Tap] Payment AUTHORIZED for order ${orderId}`);
        break;

      // ====================================
      // UNKNOWN STATUS
      // ====================================
      default:
        console.warn(
  `[Tap] Unhandled payment status "${status}" for order ${orderId}`
);
    }

    // Tell Tap webhook processed successfully
    return res.sendStatus(200);
  } catch (error) {
    console.error("[Tap] Webhook Error:", error);

    return res.sendStatus(500);
  }
};