import React from 'react'
import Lottie from "lottie-react";
import animation from '../assests/animation.json'
import { Link } from 'react-router-dom';

const Notfound = () => {
  return (
    <>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <Lottie style={{ width: '600px', height: '400px' }} animationData={animation}></Lottie>
                    <div className='text-center'>
                        <Link to="/login"><h4>Go to HomePage</h4></Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Notfound
