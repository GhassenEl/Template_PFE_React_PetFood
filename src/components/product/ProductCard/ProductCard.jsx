import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const { name, price, image, animalType, brand, rating, inStock } = product;

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={image} alt={name} />
        {!inStock && <span className="out-of-stock">Rupture</span>}
        <span className="animal-type-badge">{animalType}</span>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__brand">{brand}</p>

        <div className="product-card__rating">
          {"★".repeat(rating)}
          {"☆".repeat(5 - rating)}
          <span>({rating})</span>
        </div>

        <div className="product-card__footer">
          <span className="product-card__price">{price.toFixed(2)} €</span>
          <button
            className="product-card__button"
            onClick={() => onAddToCart(product)}
            disabled={!inStock}
          >
            {inStock ? "Ajouter au panier" : "Indisponible"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
