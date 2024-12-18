// Importing React and the `useState` hook for managing component state
import React, { useState } from "react";

// Importing `useStateContext` to utilize global state and actions within the context
import { useStateContext } from '../../context/StateContext'

// Importing icons for UI elements such as plus and minus symbols, and star ratings
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";

// Importing client and urlFor from a library to handle content fetching and image URLs
import { client, urlFor } from "../../lib/client";

// Importing the Product component for displaying related products
import { Product } from "../../components";

// Importing another component for additional product information
import { Info } from "../../components";

// Main component for displaying product details
const ProductDetails = ({ product, products }) => {

  // Destructuring product properties for easy access
  const { image, name, details, price, sku, ingredients, weight, delivery } = product;

  // State to manage the currently displayed image index
  const [index, setIndex] = useState(0);
  
  // Logging the context values for debugging purposes
  // console.log('useStateContext:::', useStateContext());

  // Extracting functions and state from the context for quantity management and cart actions
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  
  // Function to handle immediate purchase actions
  const handleBuyNow = () => {
    onAdd(product, qty);  // Adding the product to cart with specified quantity
    setShowCart(true);    // Displaying the cart immediately
  };

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            {/* Displaying the main product image based on the current index */}
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {/* Mapping through the images to create thumbnails; sets the main image on hover */}
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)} // Update index on mouse enter
              />
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              {/* Rendering star ratings for the product */}
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p> {/* Displaying the number of reviews */}
          </div>
          <h4>Details: </h4>
          <p>{details}</p> {/* Displaying the product details */}
          <p className="price">
            {/* Formatting the price to US currency standards */}
            ${price.toLocaleString("en-US", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })}
          </p>
          per box of 12: 
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="sku">SKU: {sku}</div> {/* Displaying the SKU of the product */}
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        {/* Displaying additional information via the Info component */}
        <Info ingredients={ingredients} weight={weight} delivery={delivery} />

        <h2>You may also like</h2> {/* Section heading for related products */}
        <div className="marquee">
          <div className="maylike-products-container track">
            {/* Mapping through related products and rendering the Product component for each */}
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Function to generate static paths for Next.js dynamic routes based on product slugs
export const getStaticPaths = async () => {
  // GraphQL-like query to fetch product slugs from the content database
  const query = `*[_type == "product"] {                  
    slug {               
      current                       
    }                         
  }`;

  // Fetching all products to retrieve their slugs
  const products = await client.fetch(query);

  // Mapping over products to create paths for dynamic routing
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  // Returning paths and setting fallback to 'blocking'
  return {
    paths,
    fallback: "blocking",
  };
};

// Function to fetch static props for a specific product based on the slug parameter
export const getStaticProps = async ({ params: { slug } }) => {
  // Constructing a query to fetch a single product that matches the provided slug
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;

  // Constructing a query to fetch all products, which will be used for related product suggestions
  const productsQuery = '*[_type == "product"]';

  // Fetching the specific product using the constructed query
  const product = await client.fetch(query);

  // Fetching all products using the second constructed query
  const products = await client.fetch(productsQuery);

  // Returning the fetched product and all products as props to be used in the component
  return {
    props: { products, product }, // Passing down the product and products array as props
  };
};

// Exporting the main component for use in other parts of the application
export default ProductDetails;