import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="fw-bold mb-3">React Ecommerce</h5>
            <p className="text-light mb-3">
              Your trusted destination for quality products, fast shipping, and exceptional customer service.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fa fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-light">
                <i className="fa fa-linkedin fa-lg"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/product" className="text-light text-decoration-none">
                  Products
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text-light text-decoration-none">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Men's Clothing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Women's Clothing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Jewelry
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Electronics
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Customer Service</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Help Center
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Returns
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Shipping Info
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-light text-decoration-none">
                  Size Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Stay Updated</h6>
            <p className="text-light small mb-3">
              Subscribe to get special offers and updates.
            </p>
            <div className="input-group mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Your email"
                aria-label="Email"
              />
              <button className="btn btn-primary" type="button">
                <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom Section */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-light mb-0">
              &copy; 2024 React Ecommerce. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-flex justify-content-md-end gap-3">
              <a href="#" className="text-light text-decoration-none small">
                Privacy Policy
              </a>
              <a href="#" className="text-light text-decoration-none small">
                Terms of Service
              </a>
              <a href="#" className="text-light text-decoration-none small">
                Cookies
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="row mt-3">
          <div className="col-12 text-center">
            <small className="text-light">
              <i className="fa fa-lock me-2"></i>
              Secure payments with SSL encryption
            </small>
            <div className="mt-2">
              <span className="text-light me-3">
                <i className="fa fa-cc-visa fa-2x"></i>
              </span>
              <span className="text-light me-3">
                <i className="fa fa-cc-mastercard fa-2x"></i>
              </span>
              <span className="text-light me-3">
                <i className="fa fa-cc-paypal fa-2x"></i>
              </span>
              <span className="text-light">
                <i className="fa fa-cc-amex fa-2x"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;