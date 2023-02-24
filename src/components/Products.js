import React from "react";

const Products = ({data, updateFieldHandler, products}) => {
    return(
        <div>
            <div className="products-container">
                {products.map(product => (
                    <div className="product-container" key={product.productCode} id={product.productCode} onClick={(e) => updateFieldHandler("selectedProductCode",e)}>
                        <div>{product.productName}</div>
                        <div>Por Apenas R${product.price}/mês</div> 
                    </div>
                ))}
            </div>
        </div>
    ) 
}

export default Products
