import React, { useEffect, useState } from 'react'
import {ReactComponent as ChooseIcon} from '../icons/choose.svg';
import {ReactComponent as ConfirmIcon} from '../icons/confirm.svg';
import {ReactComponent as ReceiveIcon} from '../icons/receive.svg';
import {ReactComponent as WhyIcon} from '../icons/why.svg';
import {ReactComponent as BestPrice} from '../icons/bestPrice.svg';
import {ReactComponent as FastDelivery} from '../icons/fastDelivery.svg';
import {ReactComponent as Guarantee} from '../icons/guarantee.svg';


function Home({checkLogin}) {

  useEffect(() => {
    checkLogin()
  }, []) 
  



  return (
      <div className='home-page'>
        <div className="w-section">
          <div className='w-section-title-desc'>
            <h1>Best Choice For Buying Products <span>Digital</span></h1>
            <p>We offer a collection of premium digital products to enhance your digital experience. From powerful productivity tools to captivating entertainment solutions, our products are offered to elevate every aspect of your digital life.</p>
          </div>
        </div>
            <div className='how-section'>
                <h1>How to buy?</h1>
                <div className='inst-section'>
                    <div className='first-step'>
                        <ChooseIcon width="150" height="150" />
                        <h3>Choose your Product</h3>
                        <p>Explore our products digital to find the perfect product that suits your needs and interests.</p>
                    </div>
                    <div className='second-step'>
                        <ConfirmIcon width="150" height="150" />
                        <h3>Confirm your Order</h3>
                        <p>Review your selections, apply any discounts, and securely confirm your order.</p>
                    </div>
                    <div className='third-step'>
                        <ReceiveIcon width="150" height="150" />
                        <h3>Receive your Product</h3>
                        <p>Sit back and relax as we process your order. Shortly, you'll receive an email with instructions to access your new digital product.</p>
                    </div>
                </div>
            </div>
            <div className='why-section'>
                <h1>Why us?</h1>
                <div className='why-icon-desc'>
                    <div className='why-icon'>
                        <WhyIcon />
                    </div>
                    <div className='why-desc'>
                        <div className='description'>
                            <div className='desc-icon'>
                                <BestPrice width='100px' height='100px'/>
                            </div>
                            <div className='desc'>
                                <h3>Best Prices</h3>
                                <p>Enjoy unbeatable value with our commitment to offering the best prices. We continuously strive to provide our customers with cost-effective solutions without compromising on quality, ensuring you get the most out of every purchase.</p>
                            </div>
                        </div>
                        <div className='description'>
                            <div className='desc-icon'>
                                <Guarantee width='100px' height='100px'/>
                            </div>
                            <div className='desc'>
                                <h3>Guarantee Product Quality</h3>
                                <p>Rest easy knowing that quality is at the forefront of our offerings. Our products undergo rigorous testing to meet the highest standards, providing you with a guarantee of superior quality. We take pride in delivering digital products that exceed your expectations.</p>
                            </div>
                        </div>
                        <div className='description'>
                            <div className='desc-icon'>
                                <FastDelivery width='100px' height='100px'/>
                            </div>
                            <div className='desc'>
                                <h3>Fast Delivery</h3>
                                <p>Time is of the essence, and we understand the importance of prompt delivery. With our efficient and reliable shipping processes. We aim to get your products to you swiftly, ensuring you can enjoy them without unnecessary delays.</p>
                            </div>
                        </div>
                        </div>
                </div>
            </div>
      </div>
  )
}

export default Home;