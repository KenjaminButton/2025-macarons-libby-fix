import React from "react";
import Link from "next/link";
// import { client } from "../lib/client";
import PerfectBanner from "../components/PerfectBanner";
import Newsletter from "../components/Newsletter";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });


const Home = () => (
  <div>
    <div className="frontlogo">
      <div className="banner">
        <span className="tagline">Luxury macarons made by hand</span>
        <span>
          <Link className="shop-now" href="/shop">
            Shop Now
          </Link>
        </span>
      </div>
    </div>
    <div className="intro">
      <p>
        Welcome to Macaron Magic - the home of great-tasting, luxurious macarons, made by hand here in our workshop in the Peak District.
      </p>
      <p>
        We have carefully chosen a select range of flavors for your delight, ready for you to enjoy - just imagine...biting into each one, where it practically melts in your mouth...yum!
      </p>
      <p>
        To start, browse over to our shop where you will see the full range available - we'll be adding more over time. If you have any questions, please do let us know - our contact details are at the bottom of this page.
      </p>
    </div>
    <PerfectBanner />
    <Newsletter />
  </div>
);



export default Home;
