import React from 'react';
import styles from './Card.module.scss'

function Card({id, imageUrl, title, price, onFavorite, onPlus, favorited = false}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({imageUrl, title, price});
    setIsAdded(!isAdded);
  }

  const onClickFavorite = () => {  
    onFavorite({id, imageUrl, title, price});  
    setIsFavorite(!isFavorite);
  }

  return (

    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.png"} alt="Unliked" onClick={onClickFavorite} />
      </div>
      <img width="133" height="122" src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>        
        <img src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Button" className={styles.plus} onClick={onClickPlus} />  
      </div>
    </div>
  );
}

export default Card;