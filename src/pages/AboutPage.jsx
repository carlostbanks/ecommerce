import React from 'react'
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-5 py-4">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold">About Us</h1>
          <hr className="w-25 mx-auto" />
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <p className="lead text-center mb-5">
              We are passionate about providing high-quality products and exceptional 
              customer service. Our curated selection includes the latest in fashion, 
              electronics, and accessories to meet all your shopping needs.
            </p>
          </div>
        </div>

        <div className="mb-5">
          <h2 className="text-center mb-4">Our Products</h2>
          <div className="row">
            <div className="col-md-3 col-sm-6 mb-4">
              <Link to="/product" className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0">
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      className="card-img-top h-100" 
                      src="https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=600" 
                      alt="Men's Clothing"
                      style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title text-dark">Men's Clothing</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <Link to="/product" className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0">
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      className="card-img-top h-100" 
                      src="https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=600" 
                      alt="Women's Clothing"
                      style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title text-dark">Women's Clothing</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <Link to="/product" className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0">
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      className="card-img-top h-100" 
                      src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600" 
                      alt="Jewelry"
                      style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title text-dark">Jewelry</h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-sm-6 mb-4">
              <Link to="/product" className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0">
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img 
                      className="card-img-top h-100" 
                      src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=600" 
                      alt="Electronics"
                      style={{ objectFit: "cover", transition: "transform 0.3s ease" }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title text-dark">Electronics</h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage