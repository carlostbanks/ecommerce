import toast from "react-hot-toast";

// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

// Utility functions for product variants and stock
export const generateVariants = (category) => {
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

export const generateStockStatus = (productId) => {
  // Make some products out of stock for demo
  const outOfStockIds = [3, 7, 11, 15];
  const isOutOfStock = outOfStockIds.includes(parseInt(productId));
  
  return {
    inStock: !isOutOfStock,
    quantity: isOutOfStock ? 0 : Math.floor(Math.random() * 50) + 1,
  };
};

// Validate product before adding to cart
export const validateProductForCart = (product, stockStatus, variants, selectedVariant) => {
  if (!stockStatus.inStock) {
    toast.error("Product is out of stock");
    return false;
  }
  
  if (variants.sizes.length > 0 && !selectedVariant.size) {
    toast.error("Please select a size");
    return false;
  }
  
  if (variants.colors.length > 0 && !selectedVariant.color) {
    toast.error("Please select a color");
    return false;
  }
  
  return true;
};

// Enhanced add to cart with validation
export const addCartWithValidation = (product, stockStatus, variants, selectedVariant) => {
  return (dispatch) => {
    if (validateProductForCart(product, stockStatus, variants, selectedVariant)) {
      dispatch(addCart({ ...product, selectedVariant }));
      toast.success("Added to cart successfully!");
      return true;
    }
    return false;
  };
};