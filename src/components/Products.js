import React from "react";

const Products = ({data, updateFieldHandler, products}) => {
    return(
        <div>
            <div className="products-container">
                {products.map(product => (
                    <div className="product-container" key={product.productCode} id={product.productCode} onClick={(e) => updateFieldHandler("selectedProductCode",e)}>
                        {product.productName}
                        {product.price}
                    </div>
                ))}
            </div>
        </div>
    ) 
}

export default Products
