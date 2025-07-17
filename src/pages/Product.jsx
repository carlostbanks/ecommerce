import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useDispatch } from "react-redux";
import { addCartWithValidation, generateVariants, generateStockStatus } from "../redux/action";

import { Footer, Navbar } from "../components";

const Product = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  // Product data state
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Variant-related state
  const [selectedVariant, setSelectedVariant] = useState({ size: "", color: "" });
  const [variants, setVariants] = useState({ sizes: [], colors: [] });
  const [stockStatus, setStockStatus] = useState({ inStock: true, quantity: 0 });

  // Fetch product data
  const fetchProductData = async () => {
    setLoading(true);
    
    try {
      const [productResponse, categoryResponse] = await Promise.all([
        fetch(`https://fakestoreapi.com/products/${id}`),
        fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
          .then(data => fetch(`https://fakestoreapi.com/products/category/${data.category}`))
      ]);

      const productData = await productResponse.json();
      const similarData = await categoryResponse.json();
      
      setProduct(productData);
      setSimilarProducts(similarData);
      
      // Generate variants and stock
      const productVariants = generateVariants(productData.category);
      const productStock = generateStockStatus(id);
      
      setVariants(productVariants);
      setStockStatus(productStock);
      setSelectedVariant({
        size: productVariants.sizes[0] || "",
        color: productVariants.colors[0] || "",
      });
      
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const addProduct = (product) => {
    dispatch(addCartWithValidation(product, stockStatus, variants, selectedVariant));
  };

  const Loading = () => (
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

  const ShowProduct = () => (
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
            <span className="badge bg-secondary mb-2 text-uppercase">
              {product.category}
            </span>
            
            <h1 className="display-6 fw-bold mb-3">{product.title}</h1>
            
            <div className="mb-3">
              <span className="text-warning me-1">
                {"★".repeat(Math.floor(product.rating?.rate || 0))}
                {"☆".repeat(5 - Math.floor(product.rating?.rate || 0))}
              </span>
              <span className="text-muted">
                ({product.rating?.rate}) • {product.rating?.count} reviews
              </span>
            </div>
            
            <div className="mb-4">
              <h2 className="text-dark fw-bold mb-0">${product.price}</h2>
              <small className="text-muted">Free shipping on orders over $50</small>
            </div>

            <div className="mb-3">
              {stockStatus.inStock ? (
                <span className="text-success">
                  ✓ In Stock ({stockStatus.quantity} available)
                </span>
              ) : (
                <span className="text-danger">✗ Out of Stock</span>
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
                      <option key={size} value={size}>{size}</option>
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
                      <option key={color} value={color}>{color}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h5 className="fw-semibold">Description</h5>
              <p className="text-muted">{product.description}</p>
            </div>

            <div className="d-flex gap-3 mb-4">
              <button
                className={`btn btn-lg flex-fill ${
                  stockStatus.inStock ? "btn-dark" : "btn-secondary"
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
              
              <Link to="/cart" className="btn btn-outline-dark btn-lg">
                <i className="fa fa-eye me-2"></i>
                View Cart
              </Link>
            </div>

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

  const ShowSimilarProduct = () => (
    <div className="py-4 my-4">
      <div className="d-flex">
        {similarProducts.map((item) => (
          <div key={item.id} className="card mx-4 text-center shadow-sm" style={{ minWidth: "280px" }}>
            <Link to={"/product/" + item.id} className="text-decoration-none">
              <div style={{ height: "300px", overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                <img
                  className="card-img-top p-3 h-100"
                  src={item.image}
                  alt={item.title}
                  style={{ 
                    objectFit: "contain",
                    transition: "transform 0.3s ease",
                    cursor: "pointer"
                  }}
                  onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                  onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                />
              </div>
            </Link>
            
            <div className="card-body">
              <h5 className="card-title">
                {item.title.length > 20 ? item.title.substring(0, 20) + "..." : item.title}
              </h5>
              <p className="text-dark fw-bold">${item.price}</p>
            </div>
            <div className="card-body">
              <Link to={"/product/" + item.id} className="btn btn-dark btn-sm m-1">
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
              {loading ? (
                <div className="d-flex">
                  {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="mx-4">
                      <Skeleton height={400} width={250} />
                    </div>
                  ))}
                </div>
              ) : (
                <ShowSimilarProduct />
              )}
            </Marquee>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;