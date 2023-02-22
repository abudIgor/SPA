import React from "react";
import Product from "./Product";

const Products = ({data, updateFieldHandler, products}) => {
    console.log(products)
    return(
        <div className="products-container">
            {products.map(product => (
                <Product key={product.productCode} product={product}></Product>
            ))}
        </div>
    )
}

export default Products
