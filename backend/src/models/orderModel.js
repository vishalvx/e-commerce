import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    pinCode: {
      type: Number,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
  },
  orderInfo: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  taxPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  shippingPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  deliveredAt: Date,
  orderStatus: {
    type: String,
    default: "Processing",
    required: true,
  },
});

export default mongoose.model("Order", orderSchema);
