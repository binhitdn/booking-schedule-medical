import React, { useState, useEffect, useRef } from "react";
import { AiOutlineVerticalRight, AiOutlineVerticalLeft } from "react-icons/ai";
import './Slider.scss'
import { FormattedMessage } from "react-intl";

const photoSlider = [
  "https://img.meta.com.vn/Data/image/2022/03/08/hinh-anh-gia-dinh-hanh-phuc-34.jpg",
  "https://bookingcare.vn//assets/anh/bookingcare-cover-4.jpg"
];

let count = 0;
let slideInterval;
export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef.current.classNameList.remove("fade-anim");
  };

  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % photoSlider.length;
    setCurrentIndex(count);
    slideRef.current.classNameList.add("fade-anim");
  };
  const handleOnPrevClick = () => {
    const productsLength = photoSlider.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
    slideRef.current.classNameList.add("fade-anim");
  };

  return (
    <div>
      <div ref={slideRef}>
      <div className="background Button-Photo" style={{background: `url('${photoSlider[currentIndex]}') center center no-repeat`}}>
      <div className="home-header-banner-child-1">
                    <div className="title-1"><FormattedMessage id="slider.slider-title"/></div>
                        <div className="title-2"><FormattedMessage id="slider.slider-subtitle"/></div>
                        <div className="search">
                        <i className="fa fa-search"></i>
                        <input type="text" placeholder="Tìm lý do khám" />
                    </div>
                </div>
                <div className="Button-Animation">
     <button
      className="preButton"
       onClick={handleOnPrevClick}
     >
       <AiOutlineVerticalRight size={40} />
     </button>
     <button
      className="nextButton"
       onClick={handleOnNextClick}
     >
       <AiOutlineVerticalLeft size={40} />
     </button>
   </div>

                {/* <div className="home-header-banner-child-2">
                    <div className="options">
                    <div className="option">
                        <div className="option-icon">
                        <i className="fas fa-hospital"></i>
                        </div>
                        <div classNameNam="option-name">
                           Khám <br/>chuyên khoa
                            
                        </div>
                    </div>
                    <div className="option">
                        <div className="option-icon">
                        <i className="fas fa-hospital"></i>
                        </div>
                        <div classNameNam="option-name">
                           Khám <br/>chuyên khoa
                            
                        </div>
                    </div>
                    <div className="option">
                        <div className="option-icon">
                        <i className="fas fa-hospital"></i>
                        </div>
                        <div classNameNam="option-name">
                           Khám <br/>chuyên khoa
                            
                        </div>
                    </div>
                    <div className="option">
                        <div className="option-icon">
                        <i className="fas fa-hospital"></i>
                        </div>
                        <div classNameNam="option-name">
                           Khám <br/>chuyên khoa
                            
                        </div>
                    </div>
                    <div className="option">
                        <div className="option-icon">
                        <i className="fas fa-hospital"></i>
                        </div>
                        <div classNameNam="option-name">
                           Khám <br/>chuyên khoa
                            
                        </div>
                    </div>
                    
                    
                    </div>
                    
                </div> */}
        {/* <img src={photoSlider[currentIndex]} alt="" style={{width:'100%',height:'80vh'}}/> */}
      </div>
      

     
    </div>
     
    </div>
  );
}
