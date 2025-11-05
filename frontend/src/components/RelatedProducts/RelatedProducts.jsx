import React, { useContext } from 'react'
import './RelatedProducts.css'
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item'
const RelatedProducts = () => {
  const {all_product, loading} = useContext(ShopContext);
  // Get 4 random products for related products
  const relatedProducts = all_product.slice(0, 4);
  
return(
<div className='relatedproducts'>
<h1>Related Products</h1>
<hr />
<div className="relatedproducts-item">
{loading ? (
  <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
) : (
  relatedProducts.map((item,i)=>{
return <Item key={item.id || i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> 
})
)}
</div>
</div>
);
}
export default RelatedProducts ;