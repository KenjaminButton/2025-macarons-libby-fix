// Importing React and necessary hooks from the React library. 
// `createContext` is used for creating context objects.
// `useContext` is used for consuming the context created.
// `useState` is used for managing state in functional components.
import React, { createContext, useContext, useState, useEffect } from "react";

// Importing the `toast` function from the `react-hot-toast` package for displaying notifications.
import { toast } from "react-hot-toast";

// Creating a new context object using the `createContext` function.
// This will be the context that will hold the state and methods for the global state management.
const Context = createContext();

// Defining a functional component `StateContext` that takes `children` as props.
// This component will serve as the Provider for the context, allowing other components to access the shared state.
export const StateContext = ({ children }) => {

  // Defining `showCart` state with a default value of `false`. 
  // This state determines whether the shopping cart should be displayed or not.
  const [showCart, setShowCart] = useState(false);

  // Creating `cartItems` state to hold the items added to the cart, initialized as an empty array.
  const [cartItems, setCartItems] = useState([]);

  // Creating `totalPrice` state to keep track of the total cost of items in the cart, initialized to `0`.
  const [totalPrice, setTotalPrice] = useState(0);

  // Establishing `totalQuantities` state to track the total number of items in the cart, initialized to `0`.
  const [totalQuantities, setTotalQuantities] = useState(0);

  // Initializing `qty` state to manage the quantity of a specific item the user wants to add to the cart, starting at `1`.
  const [qty, setQty] = useState(1);

  // Declaring `foundProduct` variable to store the reference of a product found in the cart.
  let foundProduct;

  // Declaring `index` variable to hold the index of a product within the cart items array.
  let index;

  // Defining `onAdd` function to handle adding products to the cart, taking `product` and `quantity` as parameters.
  const onAdd = (product, quantity) => {

    // Checking if the product being added is already in the cart by matching the product IDs.
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    // Updating the `totalPrice` state by adding the price of the newly added product multiplied by the quantity.
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    // Incrementing the `totalQuantities` state by the quantity of the product being added.
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    // If the product is already in the cart...
    if (checkProductInCart) {

      // If a matching product is found, update its quantity by adding the new quantity to the existing one.
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      // Set the updated cart items back to the `cartItems` state.
      setCartItems(updatedCartItems);
    } else {
      // If the product is not already in the cart...

      // Assign the desired quantity to the product object.
      product.quantity = quantity;

      // Add the new product (with specified quantity) to the existing cart items.
      setCartItems([...cartItems, { ...product }]);
    }

    // Display a success notification indicating that the product has been added to the cart.
    toast.success(`${qty} ${product.name} added to the cart.`);
  };

  // Defining `onRemove` function to remove a product from the cart, taking the `product` as an argument.
  const onRemove = (product) => {

    // Find the product to remove in the cart by matching the product ID.
    foundProduct = cartItems.find((item) => item._id === product._id);

    // Create a new array of cart items that excludes the product being removed.
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    // Update the `totalPrice` state by subtracting the cost of the found product (price * quantity) from it.
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );

    // Decrement the `totalQuantities` state by the quantity of the found product being removed.
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );

    // Set the new array of cart items (without the removed product) back to the `cartItems` state.
    setCartItems(newCartItems);
  };

  // Defining `toggleCartItemQuantity` function to adjust product quantity in the cart based on `value` (increase or decrease).
  const toggleCartItemQuantity = (id, value) => {

    // Find the item in the cart that matches the given product ID.
    foundProduct = cartItems.find((item) => item._id === id);

    // Find the index of the item that matches the given product ID.
    index = cartItems.findIndex((product) => product._id === id);

    // Filter out the found product from the cart items to create a new intermediary cart.
    const newCartItems = cartItems.filter((item) => item._id !== id);

    // If the action is to increment...
    if (value === "inc") {

      // Add the found product back to the cart items with an incremented quantity.
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);

      // Increase the `totalPrice` by the price of the found product.
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);

      // Increment the `totalQuantities` by 1.
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      // If the action is to decrement...

      // Only decrement if the product quantity is greater than 1...
      if (foundProduct.quantity > 1) {

        // Add the found product back to the cart items with a decremented quantity.
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);

        // Decrease the `totalPrice` by the price of the found product.
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);

        // Decrement the `totalQuantities` by 1.
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  // A function to increase the `qty` state by 1, adjusting desired item quantity before adding to cart.
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // A function to decrease the `qty` state by 1, ensuring it doesn't go below 1,
  // adjusting desired item quantity before adding to cart.
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  // Returning a `Context.Provider` with passed value containing state and actions to be
  // accessible to components within its children, enabling global state management.
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};

// Exporting a custom hook `useStateContext` to easily access the context's value,
// allowing components to utilize the context state and functions.
export const useStateContext = () => useContext(Context);