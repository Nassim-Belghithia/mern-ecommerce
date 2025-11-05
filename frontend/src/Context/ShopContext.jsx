import React, { createContext, useState, useEffect } from 'react';
import { productsAPI, cartAPI } from '../services/api';
import { getToken } from '../services/api';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productsAPI.getAll();
        // Map MongoDB _id to id for compatibility with existing frontend
        // Import local images mapping
        const imageMap = {
          'product_1.png': require('../components/Assets/product_1.png'),
          'product_2.png': require('../components/Assets/product_2.png'),
          'product_3.png': require('../components/Assets/product_3.png'),
          'product_4.png': require('../components/Assets/product_4.png'),
          'product_5.png': require('../components/Assets/product_5.png'),
          'product_6.png': require('../components/Assets/product_6.png'),
          'product_7.png': require('../components/Assets/product_7.png'),
          'product_8.png': require('../components/Assets/product_8.png'),
          'product_9.png': require('../components/Assets/product_9.png'),
          'product_10.png': require('../components/Assets/product_10.png'),
          'product_11.png': require('../components/Assets/product_11.png'),
          'product_12.png': require('../components/Assets/product_12.png'),
          'product_13.png': require('../components/Assets/product_13.png'),
          'product_14.png': require('../components/Assets/product_14.png'),
          'product_15.png': require('../components/Assets/product_15.png'),
          'product_16.png': require('../components/Assets/product_16.png'),
          'product_17.png': require('../components/Assets/product_17.png'),
          'product_18.png': require('../components/Assets/product_18.png'),
          'product_19.png': require('../components/Assets/product_19.png'),
          'product_20.png': require('../components/Assets/product_20.png'),
          'product_21.png': require('../components/Assets/product_21.png'),
          'product_22.png': require('../components/Assets/product_22.png'),
          'product_23.png': require('../components/Assets/product_23.png'),
          'product_24.png': require('../components/Assets/product_24.png'),
          'product_25.png': require('../components/Assets/product_25.png'),
          'product_26.png': require('../components/Assets/product_26.png'),
          'product_27.png': require('../components/Assets/product_27.png'),
          'product_28.png': require('../components/Assets/product_28.png'),
          'product_29.png': require('../components/Assets/product_29.png'),
          'product_30.png': require('../components/Assets/product_30.png'),
          'product_31.png': require('../components/Assets/product_31.png'),
          'product_32.png': require('../components/Assets/product_32.png'),
          'product_33.png': require('../components/Assets/product_33.png'),
          'product_34.png': require('../components/Assets/product_34.png'),
          'product_35.png': require('../components/Assets/product_35.png'),
          'product_36.png': require('../components/Assets/product_36.png'),
        };

        const products = response.data.map((product) => {
          // Extract image filename from path or use as is
          const imagePath = product.image;
          let imageUrl = imagePath;
          
          // If image path contains product_X.png, map it to local import
          const match = imagePath.match(/product_(\d+)\.png/);
          if (match && imageMap[`product_${match[1]}.png`]) {
            imageUrl = imageMap[`product_${match[1]}.png`];
          }
          
          // Ensure ID is always a string for consistency
          const productId = product._id ? product._id.toString() : product.id ? product.id.toString() : null;
          
          return {
            ...product,
            id: productId, // Use string ID for frontend compatibility
            image: imageUrl
          };
        });
        setAllProduct(products);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to local data if API fails
        try {
          const localProducts = require('../components/Assets/all_product').default;
          // Ensure local products also have string IDs for consistency
          const normalizedLocalProducts = localProducts.map(p => ({
            ...p,
            id: p.id ? p.id.toString() : null
          }));
          setAllProduct(normalizedLocalProducts);
        } catch (fallbackError) {
          console.error('Error loading local products:', fallbackError);
          setAllProduct([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Fetch cart items if user is logged in
  useEffect(() => {
    const fetchCart = async () => {
      const token = getToken();
      if (!token) {
        // If no token, initialize empty cart
        const defaultCart = {};
        all_product.forEach((product) => {
          defaultCart[product.id] = 0;
        });
        setCartItems(defaultCart);
        return;
      }

      try {
        setCartLoading(true);
        const response = await cartAPI.get();
        // Convert product IDs to match frontend format
        const cart = {};
        all_product.forEach((product) => {
          const frontendId = product.id ? product.id.toString() : null;
          // MongoDB _id from cart response might be ObjectId or string
          const mongoId = product._id ? product._id.toString() : frontendId;
          
          // Check both formats in cartItems
          const quantity = response.cartItems[mongoId] || response.cartItems[frontendId] || 0;
          if (frontendId) {
            cart[frontendId] = quantity;
          }
        });
        setCartItems(cart);
      } catch (error) {
        console.error('Error fetching cart:', error);
        // Initialize empty cart on error
        const defaultCart = {};
        all_product.forEach((product) => {
          defaultCart[product.id] = 0;
        });
        setCartItems(defaultCart);
      } finally {
        setCartLoading(false);
      }
    };

    if (all_product.length > 0) {
      fetchCart();
    }
  }, [all_product]);

  const addToCart = async (itemId) => {
    const token = getToken();
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      // Find product by frontend id (could be MongoDB _id or custom id)
      // itemId could be string or number, and could be _id or id
      const product = all_product.find((p) => {
        const pId = p.id || p._id;
        const pIdStr = pId ? pId.toString() : '';
        const itemIdStr = itemId ? itemId.toString() : '';
        return pIdStr === itemIdStr || pId === itemId;
      });

      if (!product) {
        console.error('Product not found for itemId:', itemId);
        return;
      }

      // Use MongoDB _id for API call (ensure it's a string)
      const productId = (product._id || product.id).toString();
      await cartAPI.add(productId);
      
      // Update local state using the frontend id (ensure it's a string)
      const frontendId = (product.id || product._id).toString();
      setCartItems((prev) => ({ ...prev, [frontendId]: (prev[frontendId] || 0) + 1 }));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    const token = getToken();
    if (!token) {
      // If not logged in, just update local state
      setCartItems((prev) => ({ ...prev, [itemId]: Math.max(0, (prev[itemId] || 0) - 1) }));
      return;
    }

    try {
      // Find product by frontend id (could be MongoDB _id or custom id)
      const product = all_product.find((p) => {
        const pId = p.id || p._id;
        const pIdStr = pId ? pId.toString() : '';
        const itemIdStr = itemId ? itemId.toString() : '';
        return pIdStr === itemIdStr || pId === itemId;
      });

      if (!product) {
        console.error('Product not found for itemId:', itemId);
        return;
      }

      // Use MongoDB _id for API call (ensure it's a string)
      const productId = (product._id || product.id).toString();
      await cartAPI.remove(productId);
      
      // Update local state using the frontend id (ensure it's a string)
      const frontendId = (product.id || product._id).toString();
      setCartItems((prev) => {
        const newQuantity = Math.max(0, (prev[frontendId] || 0) - 1);
        return { ...prev, [frontendId]: newQuantity };
      });
    } catch (error) {
      console.error('Error removing from cart:', error);
      alert('Failed to remove item from cart');
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product.id === item || product.id.toString() === item.toString()
        );
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[item];
        }
      }
    }
    return totalAmount.toFixed(2);
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    loading,
    cartLoading,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
