import React, { useContext } from "react";
import './Popular.css'
import { ShopContext } from '../../Context/ShopContext';
import Item from "../Item/Item";
export default function Popular () {
  const {all_product, loading} = useContext(ShopContext);
  // Get first 4 women's products for popular section
  const popularProducts = all_product.filter(item => item.category === 'women').slice(0, 4);
  
return(
        <div className='popular'>
 <h1>POPULAR IN WOMEN</h1>
<hr />
<div className="popular-item">
{loading ? (
  <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
) : (
  popularProducts.map((item,i)=>{
return <Item key={item.id || i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
})
)}
</div>
</div>
);
}