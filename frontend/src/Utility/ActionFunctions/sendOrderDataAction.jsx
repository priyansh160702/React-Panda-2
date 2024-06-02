import { isEmpty, isFiveChars } from "../Validator";

const sendOrderDataAction = async ({ request }) => {
  const token = localStorage.getItem("token");

  const data = await request.formData();

  const addressData = {
    street: data.get("street"),
    city: data.get("city"),
    postalCode: data.get("postal"),
  };

  const orderData = data.get("order");

  const order = JSON.parse(orderData);

  console.log(order);

  const totalAmount = data.get("totalAmount");

  const emptyErrorString = "This field cannot be empty!";

  const errors = {};

  if (isEmpty(addressData.street)) {
    errors.streetInputError = emptyErrorString;
  }
  if (isEmpty(addressData.city)) {
    errors.cityInputError = emptyErrorString;
  }
  if (isEmpty(addressData.postalCode)) {
    errors.postalCodeInputError = emptyErrorString;
  }

  if (!isFiveChars(addressData.postalCode)) {
    errors.postalCodeInputError = "It must be 5 characters!";
  }

  if (Object.keys(errors).length !== 0) {
    return errors;
  }

  // For creating order on the backend.
  const response = await fetch("http://localhost:8080/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      totalAmount,
    }),
  });

  const resData = await response.json();

  const paymentVerificationHandler = async (response) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      response;

    await fetch("http://localhost:8080/order/paymentVerification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        addressData,
        order,
        totalAmount,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
      }),
    });
  };

  var options = {
    key: resData.RazorpayId,
    amount: Number(totalAmount * 100),
    currency: "INR",
    name: "React Panda",
    description: "Test Transaction",
    order_id: resData.paymentOrderId,
    handler: paymentVerificationHandler,
    prefill: {
      name: "Gaurav Kumar",
      email: "gaurav.kumar@example.com",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#8a2b06",
    },
  };

  const razor = new window.Razorpay(options);

  razor.open();

  return null;
};

export default sendOrderDataAction;
