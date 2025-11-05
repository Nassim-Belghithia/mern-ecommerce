import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import dropdown_icon from '../components/Assets/dropdown_icon.png'
import Item from '../components/Item/Item'
import './CSS/ShopCategory.css'
const ShopCategory = (props) => {
  const {all_product, loading} = useContext(ShopContext);
  const filteredProducts = all_product.filter(item => props.category === item.category);
return (
<div className='shop-category'>
<img  src={props.banner} alt="" />
<div className="shopcategory-indexSort">
<p>
<span>Showing 1-{filteredProducts.length}</span> out of {filteredProducts.length} products
</p>
<div className="shopcategory-sort">
Sort by <img src={dropdown_icon} alt="" />
</div>
</div>
{loading ? (
  <div style={{ padding: '50px', textAlign: 'center' }}>Loading products...</div>
) : (
  <div className="shopcategory-products">
    {filteredProducts.map((item,i)=>{
      return <Item key={item.id || i} id={item.id}  name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
    })}
  </div>
)}
{filteredProducts.length === 0 && !loading && (
  <div style={{ padding: '50px', textAlign: 'center' }}>No products found in this category</div>
)}
<div className='ShopCategory-loadmore'>
  Explore More
</div>
</div>
)
}

export default ShopCategory 