import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Added to cart successfully!");
  };

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products/");
        const products = await response.json();
        setData(products);
        setFilter(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
            <Skeleton height={400} />
          </div>
        ))}
      </>
    );
  };

  const filterProduct = (cat) => {
    const updatedList = data.filter((item) => item.category === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => setFilter(data)}
          >
            All
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("men's clothing")}
          >
            Men's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("women's clothing")}
          >
            Women's Clothing
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("jewelery")}
          >
            Jewelery
          </button>
          <button
            className="btn btn-outline-dark btn-sm m-2"
            onClick={() => filterProduct("electronics")}
          >
            Electronics
          </button>
        </div>

        {filter.map((product) => {
          return (
            <div
              id={product.id}
              key={product.id}
              className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4"
            >
              <div className="card text-center h-100 shadow-sm border-0" key={product.id}>
                {/* Clickable Image */}
                <Link to={"/product/" + product.id} className="text-decoration-none">
                  <div className="card-img-container" style={{ height: "300px", overflow: "hidden", backgroundColor: "#f8f9fa" }}>
                    <img
                      className="card-img-top p-3 h-100"
                      src={product.image}
                      alt={product.title}
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
                
                <div className="card-body d-flex flex-column">
                  {/* Product Title */}
                  <h5 className="card-title mb-2" style={{ fontSize: "1rem", lineHeight: "1.2" }}>
                    {product.title.length > 50 ? product.title.substring(0, 50) + "..." : product.title}
                  </h5>
                  
                  {/* Rating */}
                  <div className="mb-2">
                    <span className="text-warning me-1">
                      {"★".repeat(Math.floor(product.rating?.rate || 0))}
                      {"☆".repeat(5 - Math.floor(product.rating?.rate || 0))}
                    </span>
                    <small className="text-muted">({product.rating?.rate})</small>
                  </div>
                  
                  {/* Description */}
                  <p className="card-text text-muted small mb-3" style={{ fontSize: "0.85rem" }}>
                    {product.description.length > 80 ? product.description.substring(0, 80) + "..." : product.description}
                  </p>
                  
                  {/* Price */}
                  <div className="mt-auto">
                    <h4 className="text-dark fw-bold mb-3">${parseFloat(product.price).toFixed(2)}</h4>
                    
                    {/* Action Buttons */}
                    <div className="d-flex gap-2">
                      <Link
                        to={"/product/" + product.id}
                        className="btn btn-dark btn-sm flex-fill"
                      >
                        View Details
                      </Link>
                      <button
                        className="btn btn-outline-dark btn-sm flex-fill"
                        onClick={() => addProduct(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;