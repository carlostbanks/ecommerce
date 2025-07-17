import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import toast from "react-hot-toast";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  
  const [selectedVariant, setSelectedVariant] = useState({
    size: "",
    color: "",
  });
  const [variants, setVariants] = useState({
    sizes: [],
    colors: [],
  });
  const [stockStatus, setStockStatus] = useState({
    inStock: true,
    quantity: 0,
  });

  const dispatch = useDispatch();

  const addProduct = (product) => {
    if (!stockStatus.inStock) {
      toast.error("Product is out of stock");
      return;
    }
    
    if (variants.sizes.length > 0 && !selectedVariant.size) {
      toast.error("Please select a size");
      return;
    }
    
    if (variants.colors.length > 0 && !selectedVariant.color) {
      toast.error("Please select a color");
      return;
    }
    
    dispatch(addCart({ ...product, selectedVariant }));
    toast.success("Added to cart successfully!");
  };

  // Mock function to generate variants based on product category
  const generateVariants = (category) => {
    const variantData = {
      sizes: [],
      colors: [],
    };

    switch (category) {
      case "men's clothing":
      case "women's clothing":
        variantData.sizes = ["XS", "S", "M", "L", "XL", "XXL"];
        variantData.colors = ["Black", "White", "Navy", "Gray", "Blue"];
        break;
      case "electronics":
        variantData.colors = ["Black", "White", "Silver", "Space Gray"];
        break;
      case "jewelery":
        variantData.sizes = ["6", "7", "8", "9", "10"];
        variantData.colors = ["Gold", "Silver", "Rose Gold"];
        break;
      default:
        variantData.colors = ["Default"];
    }

    return variantData;
  };

  // Mock function to generate stock status
  const generateStockStatus = (productId) => {
    // Make some products out of stock for demo
    const outOfStockIds = [3, 7, 11, 15];
    const isOutOfStock = outOfStockIds.includes(parseInt(productId));
    
    return {
      inStock: !isOutOfStock,
      quantity: isOutOfStock ? 0 : Math.floor(Math.random() * 50) + 1,
    };
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      setLoading2(true);
      
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        
        // Generate variants and stock status
        const productVariants = generateVariants(data.category);
        const productStock = generateStockStatus(id);
        
        setVariants(productVariants);
        setStockStatus(productStock);
        
        // Set default selections
        setSelectedVariant({
          size: productVariants.sizes[0] || "",
          color: productVariants.colors[0] || "",
        });
        
        setLoading(false);
        
        // Fetch similar products
        const response2 = await fetch(
          `https://fakestoreapi.com/products/category/${data.category}`
        );
        const data2 = await response2.json();
        setSimilarProducts(data2);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
        setLoading2(false);
      }
    };
    
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          <div className="col-md-6 py-3">
            <Skeleton height={400} width={400} />
          </div>
          <div className="col-md-6 py-5">
            <Skeleton height={30} width={250} />
            <Skeleton height={90} />
            <Skeleton height={40} width={70} />
            <Skeleton height={50} width={110} />
            <Skeleton height={120} />
            <Skeleton height={40} width={110} inline={true} />
            <Skeleton className="mx-3" height={40} width={110} />
          </div>
        </div>
      </div>
    );
  };

  const ShowProduct = () => {
    return (
      <div className="container my-5 py-2">
        <div className="row">
          {/* Product Image */}
          <div className="col-md-6 col-sm-12 py-3">
            <div className="product-image-container">
              <img
                className="img-fluid rounded shadow-sm"
                src={product.image}
                alt={product.title}
                style={{ 
                  maxWidth: "100%", 
                  height: "500px", 
                  objectFit: "contain",
                  backgroundColor: "#f8f9fa"
                }}
              />
              {!stockStatus.inStock && (
                <div className="position-absolute top-0 start-0 bg-danger text-white px-3 py-1 rounded-end">
                  Out of Stock
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-6 py-5">
            <div className="product-details">
              {/* Category */}
              <span className="badge bg-secondary mb-2 text-uppercase">
                {product.category}
              </span>
              
              {/* Title */}
              <h1 className="display-6 fw-bold mb-3">{product.title}</h1>
              
              {/* Rating */}
              <div className="mb-3">
                <span className="text-warning me-1">
                  {"★".repeat(Math.floor(product.rating?.rate || 0))}
                  {"☆".repeat(5 - Math.floor(product.rating?.rate || 0))}
                </span>
                <span className="text-muted">
                  ({product.rating?.rate}) • {product.rating?.count} reviews
                </span>
              </div>
              
              {/* Price */}
              <div className="mb-4">
                <h2 className="text-dark fw-bold mb-0">${product.price}</h2>
                <small className="text-muted">Free shipping on orders over $50</small>
              </div>

              {/* Stock Status */}
              <div className="mb-3">
                {stockStatus.inStock ? (
                  <span className="text-success">
                    ✓ In Stock ({stockStatus.quantity} available)
                  </span>
                ) : (
                  <span className="text-danger">
                    ✗ Out of Stock
                  </span>
                )}
              </div>

              {/* Variant Selection */}
              <div className="variants-section mb-4">
                {variants.sizes.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Size:</label>
                    <select
                      className="form-select"
                      value={selectedVariant.size}
                      onChange={(e) => setSelectedVariant({
                        ...selectedVariant,
                        size: e.target.value
                      })}
                      disabled={!stockStatus.inStock}
                    >
                      <option value="">Select Size</option>
                      {variants.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {variants.colors.length > 0 && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Color:</label>
                    <select
                      className="form-select"
                      value={selectedVariant.color}
                      onChange={(e) => setSelectedVariant({
                        ...selectedVariant,
                        color: e.target.value
                      })}
                      disabled={!stockStatus.inStock}
                    >
                      <option value="">Select Color</option>
                      {variants.colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h5 className="fw-semibold">Description</h5>
                <p className="text-muted">{product.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3 mb-4">
                <button
                  className={`btn btn-lg flex-fill ${
                    stockStatus.inStock 
                      ? "btn-dark" 
                      : "btn-secondary"
                  }`}
                  onClick={() => addProduct(product)}
                  disabled={!stockStatus.inStock}
                >
                  {stockStatus.inStock ? (
                    <>
                      <i className="fa fa-shopping-cart me-2"></i>
                      Add to Cart
                    </>
                  ) : (
                    "Out of Stock"
                  )}
                </button>
                
                <Link 
                  to="/cart" 
                  className="btn btn-outline-dark btn-lg"
                >
                  <i className="fa fa-eye me-2"></i>
                  View Cart
                </Link>
              </div>

              {/* Additional Info */}
              <div className="additional-info">
                <small className="text-muted">
                  <i className="fa fa-truck me-2"></i>
                  Free delivery on orders over $50
                </small>
                <br />
                <small className="text-muted">
                  <i className="fa fa-undo me-2"></i>
                  30-day return policy
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Loading2 = () => {
    return (
      <div className="my-4 py-4">
        <div className="d-flex">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="mx-4">
              <Skeleton height={400} width={250} />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ShowSimilarProduct = () => {
    return (
      <div className="py-4 my-4">
        <div className="d-flex">
          {similarProducts.map((item) => (
            <div key={item.id} className="card mx-4 text-center shadow-sm">
              <img
                className="card-img-top p-3"
                src={item.image}
                alt="Card"
                height={300}
                width={300}
                style={{ objectFit: "contain" }}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {item.title.substring(0, 15)}...
                </h5>
                <p className="text-dark fw-bold">${item.price}</p>
              </div>
              <div className="card-body">
                <Link
                  to={"/product/" + item.id}
                  className="btn btn-dark btn-sm m-1"
                >
                  View Details
                </Link>
                <button
                  className="btn btn-outline-dark btn-sm m-1"
                  onClick={() => addProduct(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
        
        <div className="row my-5 py-5">
          <div className="d-none d-md-block">
            <h2 className="text-center mb-4">You may also like</h2>
            <Marquee pauseOnHover={true} pauseOnClick={true} speed={50}>
              {loading2 ? <Loading2 /> : <ShowSimilarProduct />}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;