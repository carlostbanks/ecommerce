import React from "react";
import { Footer, Navbar } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { addCart, delCart } from "../redux/action";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Quantity increased!");
  };

  const removeProduct = (product) => {
    dispatch(delCart(product));
    toast.success("Quantity decreased!");
  };

  const removeAllOfProduct = (product) => {
    // Remove all quantities of this specific product variant
    for (let i = 0; i < product.qty; i++) {
      dispatch(delCart(product));
    }
    toast.success("Item removed from cart");
  };

  const EmptyCart = () => (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body text-center py-5">
              <div className="py-4">
                <i className="fa fa-shopping-cart fa-5x text-muted mb-4"></i>
                <h4 className="display-6 mb-3">Your cart is empty</h4>
                <p className="text-muted mb-4">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link to="/product" className="btn btn-dark btn-lg">
                  <i className="fa fa-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ShowCart = () => {
    let subtotal = 0;
    let shipping = 30.0;
    let totalItems = 0;

    state.forEach((item) => {
      subtotal += item.price * item.qty;
      totalItems += item.qty;
    });

    return (
      <div className="container py-4">
        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8 mb-4">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold">
                  Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </h5>
              </div>
              <div className="card-body p-0">
                {state.map((item, index) => (
                  <div key={index} className="border-bottom p-4">
                    <div className="row align-items-center">
                      {/* Product Image */}
                      <div className="col-md-2 col-4 mb-3 mb-md-0">
                        <Link to={`/product/${item.id}`}>
                          <div 
                            className="product-image-container rounded"
                            style={{ 
                              height: "100px", 
                              backgroundColor: "#f8f9fa",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center"
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="img-fluid"
                              style={{ 
                                maxHeight: "90px",
                                maxWidth: "90px",
                                objectFit: "contain"
                              }}
                            />
                          </div>
                        </Link>
                      </div>

                      {/* Product Details */}
                      <div className="col-md-4 col-8 mb-3 mb-md-0">
                        <Link 
                          to={`/product/${item.id}`} 
                          className="text-decoration-none"
                        >
                          <h6 className="mb-1 text-dark fw-semibold">
                            {item.title.length > 50 ? 
                              item.title.substring(0, 50) + "..." : 
                              item.title
                            }
                          </h6>
                        </Link>
                        
                        <small className="text-muted text-uppercase d-block mb-2">
                          {item.category}
                        </small>
                        
                        {/* Variant Information */}
                        {item.selectedVariant && (
                          <div className="mb-2">
                            {item.selectedVariant.size && (
                              <span className="badge bg-light text-dark me-2 border">
                                <i className="fa fa-tag me-1"></i>
                                Size: {item.selectedVariant.size}
                              </span>
                            )}
                            {item.selectedVariant.color && (
                              <span className="badge bg-light text-dark border">
                                <i className="fa fa-palette me-1"></i>
                                Color: {item.selectedVariant.color}
                              </span>
                            )}
                          </div>
                        )}
                        
                        {/* Rating */}
                        <div className="d-flex align-items-center">
                          <span className="text-warning small me-1">
                            {"★".repeat(Math.floor(item.rating?.rate || 0))}
                            {"☆".repeat(5 - Math.floor(item.rating?.rate || 0))}
                          </span>
                          <small className="text-muted">({item.rating?.rate || 0})</small>
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-md-3 col-6 mb-3 mb-md-0">
                        <div className="d-flex align-items-center justify-content-center">
                          <button
                            className="btn btn-outline-secondary btn-sm rounded-circle"
                            onClick={() => removeProduct(item)}
                            style={{ width: "36px", height: "36px" }}
                          >
                            <i className="fa fa-minus"></i>
                          </button>
                          <span className="mx-3 fw-bold fs-5">{item.qty}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm rounded-circle"
                            onClick={() => addProduct(item)}
                            style={{ width: "36px", height: "36px" }}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="col-md-2 col-6 mb-3 mb-md-0">
                        <div className="text-center">
                          <h6 className="mb-1 fw-bold text-dark">
                            ${(item.price * item.qty).toFixed(2)}
                          </h6>
                          <small className="text-muted d-block mb-2">
                            ${parseFloat(item.price).toFixed(2)} each
                          </small>
                          <button
                            className="btn btn-link text-danger p-0 small"
                            onClick={() => removeAllOfProduct(item)}
                            title="Remove item"
                          >
                            <i className="fa fa-trash me-1"></i>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card shadow-sm border-0 sticky-top" style={{ top: "20px" }}>
              <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold">Order Summary</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="fw-semibold">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Shipping</span>
                  <span className="fw-semibold">
                    {subtotal > 50 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax</span>
                  <span className="fw-semibold">$0.00</span>
                </div>
                
                {subtotal > 50 && (
                  <div className="alert alert-success small py-2 mb-3">
                    <i className="fa fa-check-circle me-2"></i>
                    You've qualified for free shipping!
                  </div>
                )}
                
                <hr />
                
                <div className="d-flex justify-content-between mb-4">
                  <h6 className="fw-bold">Total</h6>
                  <h6 className="fw-bold text-dark">
                    ${(subtotal + (subtotal > 50 ? 0 : shipping)).toFixed(2)}
                  </h6>
                </div>

                <div className="d-grid gap-2">
                  <Link to="/checkout" className="btn btn-dark btn-lg">
                    <i className="fa fa-credit-card me-2"></i>
                    Proceed to Checkout
                  </Link>
                  <Link to="/product" className="btn btn-outline-dark">
                    <i className="fa fa-arrow-left me-2"></i>
                    Continue Shopping
                  </Link>
                </div>

                {/* Additional Info */}
                <div className="mt-4 pt-3 border-top">
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa fa-lock text-muted me-2"></i>
                    <small className="text-muted">Secure SSL encryption</small>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <i className="fa fa-truck text-muted me-2"></i>
                    <small className="text-muted">Free shipping on orders over $50</small>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fa fa-undo text-muted me-2"></i>
                    <small className="text-muted">30-day return policy</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 text-center mb-1">Shopping Cart</h1>
            <p className="text-center text-muted mb-4">
              Review your items and proceed to checkout
            </p>
            <hr />
          </div>
        </div>
        {state.length ? <ShowCart /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Cart;