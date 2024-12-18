import React, { useRef } from "react";
import Link from "next/link";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import getStripe from "@/lib/getStripe";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import { eUSLocale } from "../lib/utils";
import { EmptyCart } from ".";


const Cart = () => {
  const cartRef = useRef();
  // Creating a reference to the cart element for potential DOM manipulations.
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();
  // Destructuring values and functions from the context, allowing access to cart state and behavior.

  const handleCheckout = async () => {
    const stripe = await getStripe()

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    console.log('data:::', data)

    toast.loading("Redirecting...");
    stripe.redirectToCheckout({
      sessionId: data.id
    });
  };


  return (
    <div className="cart-wrapper" ref={cartRef}>
      {/* Wrapping the cart component and assigning the cartRef for reference. */}
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <EmptyCart>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </EmptyCart>
        )}

        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              // Mapping over cartItems to display each item.
              <>
                <div className="product" key={item._id}>
                  {/* Using item._id as a unique key to help React identify each element. */}
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  // Calling onRemove function from context to remove an item from the cart.
                  >
                    <TiDeleteOutline />
                  </button>

                  <img
                    src={urlFor(item?.image[0])}
                    className="cart-product-image"
                  // Using urlFor to get a valid URL for the product image.
                  />

                  <div className="item-desc">
                    <div>
                      <span>{item.name}</span>
                      <span>
                        : Quantity of {item.quantity} @ ${eUSLocale(item.price)} each
                        {/* Displaying item quantity and formatted price. */}
                      </span>
                    </div>
                    <p className="quantity-desc">
                      <span
                        className="minus"
                        onClick={() => toggleCartItemQuantity(item._id, "dec")}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span
                        className="plus"
                        onClick={() => toggleCartItemQuantity(item._id, "inc")}
                      >
                        <AiOutlinePlus />
                      </span>
                      {/* Adjusting item quantity using toggleCartItemQuantity function. */}
                    </p>
                  </div>
                </div>
              </>
            ))}
        </div>

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${eUSLocale(totalPrice)}</h3>
            </div>
            <div className="btn-container">
              <button type="button" className="btn" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart

