import React, { useContext } from 'react'
import './NewCollections.css'
import { ShopContext } from '../../Context/ShopContext';
import Item from '../Item/Item'
const NewCollections = () => {
  const {all_product, loading} = useContext(ShopContext);
  // Get 8 random products for new collections
  const collectionsProducts = all_product.slice(0, 8);
  
  return (
    <div className = 'new-collections'> 
   <h1> NEW COLLECTIONS </h1>
    <hr />
<div className="collections">
{loading ? (
  <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>
) : (
  collectionsProducts.map((item,i)=>{
return <Item key={item.id || i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/> 
})
)}
</div>
</div>
  );
}

export default NewCollections