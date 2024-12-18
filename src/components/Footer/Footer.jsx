import React from "react";
import Link from "next/link";
import PaymentIcons from "../PaymentIcons";
import { useStateContext } from "../../context/StateContext";
import MiniCart from "../MiniCart";
import { AiFillInstagram, AiOutlineTwitter } from "react-icons/ai";

import styles from './Footer.module.css'

export default function Footer ()  {
  const { showCart } = useStateContext();

  return (                    
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerContent}>           
          <div>
            <Link href="/delivery">Delivery</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms and Conditions of Sale</Link>
            <Link href="/contact">Contact Us</Link>          
          </div>
          <div>Contact: kenneth@macaronmagic.com</div>    
          <MiniCart />            
        </div>
        <div className={styles.iconContainer}>
          <PaymentIcons />
          <div className={styles.icons}>
            <AiFillInstagram />
            <AiOutlineTwitter />          
          </div>            
        </div>              
      </div>
      <p className={styles.copyright}>2025 Macaron Magic All rights reserved</p>                   
    </>                      
  );                          
};


