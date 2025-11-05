import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'; 
import  Breadcrums from '../components/Breadcrums/Breadcrums' ;
import ProduitDisplay from '../components/ProduitDisplay/ProduitDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
const Product = () => {
const {all_product, loading} = useContext(ShopContext) ;   //l récupère la liste de tous les produits depuis le contexte (ShopContext).              
const {productId} = useParams(); //Il lit l'identifiant (productId) du produit dans l'URL (grâce à useParams() de React Router).

// Try to find by id (string or number) or _id
const product = all_product.find((e) => {
  const id = e.id || e._id;
  if (!id || !productId) return false;
  
  // Convert both to strings for comparison
  const idStr = id.toString();
  const productIdStr = productId.toString();
  
  // Direct string comparison
  return idStr === productIdStr;
});
return (
<div>
  {loading ? (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Loading product...</h2>
    </div>
  ) : product ? (
    <>
      <Breadcrums product={product}/>
      <ProduitDisplay product={product}/>
      <DescriptionBox/>
      <RelatedProducts/>
    </>
  ) : (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>Product not found</h2>
      <p>The product you are looking for does not exist.</p>
    </div>
  )}
</div>
);
}
export default Product