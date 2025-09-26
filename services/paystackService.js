import axios from "axios";

const PAYSTACK_API = "https://api.paystack.co";

export async function initializePayment(email, amount) {
  try {
    const response = await axios.post(
      `${PAYSTACK_API}/transaction/initialize`,
      { email, amount: amount * 100 }, // convert Naira → Kobo
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}

export async function verifyPayment(reference) {
  try {
    const response = await axios.get(
      `${PAYSTACK_API}/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
}
