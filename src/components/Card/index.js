import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';
import styles from './Card.module.scss';

function Card({id, parentId, title, imageUrl, price, onFavorite, onPlus, loading = false}) {

  const { isItemAdded, isFavoriteAdded } = React.useContext(AppContext);   
  const obj ={id, parentId, title, imageUrl, price};  

  const onClickPlus = () => {
    onPlus(obj);    
  }

  const onClickFavorite = () => {  
    onFavorite(obj);     
  }

  return (    
    <div className={styles.card}>
      {
      loading ? (
        <ContentLoader 
          speed={2}
          width={155}
          height={190}
          viewBox="0 0 150 190"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"          
        >
          <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
          <rect x="0" y="104" rx="5" ry="5" width="150" height="15" /> 
          <rect x="0" y="126" rx="5" ry="5" width="100" height="15" /> 
          <rect x="0" y="164" rx="5" ry="5" width="80" height="25" /> 
          <rect x="118" y="157" rx="10" ry="10" width="32" height="32" />
        </ContentLoader> ) : (
        <>
          {onFavorite && (
          <div className={styles.favorite} onClick={onClickFavorite}>
            <img src={isFavoriteAdded(parentId) ? '/img/heart-liked.svg' : '/img/heart-unliked.png'} alt="Закладки" title={isFavoriteAdded(parentId) ? 'Удалить из закладок' : 'Добавить в закладки'} />
          </div>)}
          <img width="133" height="122" src={imageUrl} alt="Кросовки" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price.toLocaleString()} руб.</b>
            </div>        
            {onPlus && (<img src={isItemAdded(parentId) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Кнопка" className={styles.plus} onClick={onClickPlus} title={isItemAdded(parentId) ? 'Удалить из корзины' : 'Добавить в корзину'} />)}
          </div>
        </>
        )}      
    </div>
  );
}

export default Card;