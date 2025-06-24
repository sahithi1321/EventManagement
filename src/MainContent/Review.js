import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const reviews = [
  { id: 1, platform: "R1", category: "Destination Wedding", review: "Absolutely stunning arrangements! Our wedding was magical thanks to their team.", name: "Sophia W.", image: "/Images/Reviews/R1.jpg" },
  { id: 2, platform: "R2", category: "Corporate Event", review: "Perfectly organized! Our conference ran smoothly without a hitch.", name: "Michael B.", image: "/Images/Reviews/R2.jpg" },
  { id: 3, platform: "R3", category: "Marketing Event", review: "Their team handled everything professionally. Highly recommended!", name: "Emma L.", image: "/Images/Reviews/R3.jpg" },
  { id: 4, platform: "R1", category: "Birthday Party", review: "The decorations and planning were top-notch! A memorable day indeed.", name: "Jake P.", image: "/Images/Reviews/R1.jpg" },
  { id: 5, platform: "R2", category: "Music Concert", review: "Excellent coordination and management. A seamless experience!", name: "Olivia T.", image: "/Images/Reviews/R2.jpg" },
  { id: 6, platform: "R3", category: "Product Launch", review: "They brought our vision to life perfectly! Highly impressed.", name: "David R.", image: "/Images/Reviews/R3.jpg" },
];

const CustomPrevArrow = (props) => (
  <div {...props} className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-gray-700 hover:text-black">
    <MdArrowBack size={30} />
  </div>
);

const CustomNextArrow = (props) => (
  <div {...props} className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 cursor-pointer z-10 text-gray-700 hover:text-black">
    <MdArrowForward size={30} />
  </div>
);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: <CustomPrevArrow />, 
  nextArrow: <CustomNextArrow />, 
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

const Review = () => {
  return (
    <div className="relative bg-gray-100 min-h-screen flex justify-center items-center px-4">
      <motion.div 
        className="w-full max-w-5xl mx-auto bg-white p-6 shadow-2xl rounded-lg border-4 border-gray-300 relative"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        <motion.h2 
          className="text-3xl font-bold mb-4 font-serif text-center"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Captivating Customer Experiences
        </motion.h2>

        <motion.p 
          className="text-lg text-gray-600 mb-6 font-serif text-center"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Discover what our satisfied clients have to say about our services.
        </motion.p>

        <motion.div 
          className="w-full px-4 relative"
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <Slider {...settings}>
            {reviews.map((rev) => (
              <motion.div 
                key={rev.id} 
                className="bg-gray-50 p-4 mx-2 rounded-lg border border-gray-300 shadow-lg shadow-black max-w-xs"
                whileInView={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false, amount: 0.3 }}
              >
                {/* Image */}
                <div className="flex justify-center mb-3">
                  <img src={rev.image} alt={rev.category} className="w-24 h-24 rounded-full" />
                </div>

                {/* Category */}
                <h3 className="text-lg font-semibold mt-2 font-serif text-center">{rev.category}</h3>

                {/* Review Text */}
                <p className="text-gray-700 italic mt-2 font-serif text-center">"{rev.review}"</p>

                <hr className="my-3 border-gray-300" />

                {/* Reviewer Name */}
                <div className="flex items-center mt-2 justify-center">
                  <div className="w-7 h-7 flex items-center justify-center bg-gray-300 rounded-full font-bold text-lg">
                    {rev.name[0]}
                  </div>
                  <p className="ml-3 font-medium text-gray-800 font-serif">{rev.name}</p>
                </div>
                
                {/* 5-Star Image */}
                <div className="flex justify-center mt-3">
                  <img src="/Images/Reviews/R4.jpg" alt="5 stars" className="w-24" />
                </div>
              </motion.div>
            ))}
          </Slider>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Review;
