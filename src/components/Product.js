import React from "react";

let selectedProduct = "";

const Product = ({product}) => {
    return (
        <div className="product-container" id={product.productCode} onClick={(e) => teste(e)}>
            {product.productName}
            {product.price}
        </div>
    )

}
const teste = (e) => {
    let productCode = e.nativeEvent.srcElement.id; 
    
    if(selectedProduct === productCode) {
        document.getElementById(productCode).classList.remove("selected-product");
        selectedProduct = ""
    } else {
        document.getElementById(selectedProduct)?.classList.remove("selected-product");
        selectedProduct = productCode;
        document.getElementById(productCode).classList.add("selected-product");
    }
    
}

export default Product;