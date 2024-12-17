import React, { useRef } from "react"; 
// Importing React and useRef hook to handle DOM references.
import Link from "next/link"; 
// Importing Link from Next.js for client-side navigation.
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from "react-icons/ai"; 
// Importing various icons from react-icons for UI elements.
import { TiDeleteOutline } from "react-icons/ti"; 
// Importing a delete icon for removing items from the cart.
import toast from "react-hot-toast"; 
// Importing toast for displaying notifications to users.
import { useStateContext } from "../context/StateContext"; 
// Importing a custom context hook for accessing the shopping cart state.
import { urlFor } from "../lib/client"; 
// Importing a function to handle image URLs for products.

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

  const eUSLocale = (x) => { 
    // Function to format currency to US locale.
    return x.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
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
          <div className="empty-cart"> 
            {/* Conditional rendering for when the cart is empty. */}
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button 
                type="button" 
                onClick={() => setShowCart(false)} 
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
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
              <h3>${eUSLocale(totalPrice)} 
              {/* Displaying formatted total price of all items in the cart. */}
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart

