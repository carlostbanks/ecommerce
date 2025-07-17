// Retrieve initial state from localStorage if available
const getInitialCart = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const handleCart = (state = getInitialCart(), action) => {
  const product = action.payload;
  let updatedCart;

  switch (action.type) {
    case "ADDITEM":
      // Create a unique identifier for products with variants
      const productKey = `${product.id}-${product.selectedVariant?.size || 'default'}-${product.selectedVariant?.color || 'default'}`;
      
      // Check if product with same variants already in cart
      const exist = state.find((x) => {
        const existingKey = `${x.id}-${x.selectedVariant?.size || 'default'}-${x.selectedVariant?.color || 'default'}`;
        return existingKey === productKey;
      });
      
      if (exist) {
        // Increase the quantity
        updatedCart = state.map((x) => {
          const existingKey = `${x.id}-${x.selectedVariant?.size || 'default'}-${x.selectedVariant?.color || 'default'}`;
          return existingKey === productKey ? { ...x, qty: x.qty + 1 } : x;
        });
      } else {
        updatedCart = [...state, { ...product, qty: 1 }];
      }
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    case "DELITEM":
      const productKey2 = `${product.id}-${product.selectedVariant?.size || 'default'}-${product.selectedVariant?.color || 'default'}`;
      
      const exist2 = state.find((x) => {
        const existingKey = `${x.id}-${x.selectedVariant?.size || 'default'}-${x.selectedVariant?.color || 'default'}`;
        return existingKey === productKey2;
      });
      
      if (exist2.qty === 1) {
        updatedCart = state.filter((x) => {
          const existingKey = `${x.id}-${x.selectedVariant?.size || 'default'}-${x.selectedVariant?.color || 'default'}`;
          return existingKey !== productKey2;
        });
      } else {
        updatedCart = state.map((x) => {
          const existingKey = `${x.id}-${x.selectedVariant?.size || 'default'}-${x.selectedVariant?.color || 'default'}`;
          return existingKey === productKey2 ? { ...x, qty: x.qty - 1 } : x;
        });
      }
      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;

    default:
      return state;
  }
};

export default handleCart;