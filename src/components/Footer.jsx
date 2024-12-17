import React from "react";
import Link from "next/link";
import PaymentIcons from "../components/PaymentIcons";
import { useStateContext } from "../context/StateContext";

// import MiniCart from "../MiniCart";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

export default function Footer ()  {
  const { showCart } = useStateContext();

  return (
    <>
      <div className="footer-container">
        <div className="footer-content">
          <div>
            <Link href="/delivery">Delivery</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms and Conditions of Sale</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div>Contact: kenneth@macaronmagic.com</div>
          {/* <MiniCart /> */}
        </div>
        <div className="icon-container">
          <PaymentIcons />
          <div className="icons">
            <AiFillInstagram />
            <AiOutlineTwitter />
          </div>
        </div>
      </div>
      <p className="copyright">2025 Macaron Magic All rights reserved</p>
    </>
  );
};

