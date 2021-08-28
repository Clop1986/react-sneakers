import React from 'react';
import styles from './Card.module.scss'

function Card({onFavorite, imageUrl, title, price, onPlus}) {
  const [isAdded, setIsAdded] = React.useState(false);

  const onClickPlus = () => {
    onPlus({imageUrl, title, price});
    setIsAdded(!isAdded);
  }

  return (

    <div className={styles.card}>
      <div className={styles.favorite} onClick={onFavorite}>
        <img src="/img/heart-unliked.svg" alt="Unliked" />
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