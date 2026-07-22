import crypto from "crypto";

// Currencies with 3 decimal places
const THREE_DECIMAL_CURRENCIES = ["BHD", "JOD", "KWD", "OMR"];

function formatAmount(amount, currency) {
  const decimals = THREE_DECIMAL_CURRENCIES.includes(currency) ? 3 : 2;
  return Number(amount).toFixed(decimals);
}

export const verifyTapWebhook = (req, res, next) => {
  try {
    const event = req.body;

    const receivedHash = req.headers.hashstring;

    if (!receivedHash) {
      console.error("❌ Missing Tap hashstring header.");
      return res.status(401).json({
        success: false,
        message: "Missing webhook signature",
      });
    }

    const amount = formatAmount(event.amount, event.currency);

    const stringToHash =
      `x_id${event.id}` +
      `x_amount${amount}` +
      `x_currency${event.currency}` +
      `x_gateway_reference${event.reference?.gateway || ""}` +
      `x_payment_reference${event.reference?.payment || ""}` +
      `x_status${event.status}` +
      `x_created${event.transaction?.created}`;

    const calculatedHash = crypto
      .createHmac("sha256", process.env.TAP_SECRET_KEY)
      .update(stringToHash)
      .digest("hex");

    const receivedBuffer = Buffer.from(receivedHash, "utf8");
    const calculatedBuffer = Buffer.from(calculatedHash, "utf8");

    if (
      receivedBuffer.length !== calculatedBuffer.length ||
      !crypto.timingSafeEqual(receivedBuffer, calculatedBuffer)
    ) {
      console.error("❌ Invalid Tap webhook signature.");

      return res.status(401).json({
        success: false,
        message: "Invalid webhook signature",
      });
    }

    console.log("✅ Tap webhook signature verified.");

    next();
  } catch (error) {
    console.error("Webhook verification failed:", error);

    return res.status(500).json({
      success: false,
      message: "Webhook verification error",
    });
  }
};