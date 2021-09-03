import React from 'react';
import ContentLoader from "react-content-loader";
import AppContext from '../../context';
import styles from './Card.module.scss';

function Card({id, imageUrl, title, price, onFavorite, onPlus, favorited = false, loading = false}) {

  const { isItemAdded } = React.useContext(AppContext);  
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({id, imageUrl, title, price});    
  }

  const onClickFavorite = () => {  
    onFavorite({id, imageUrl, title, price});  
    setIsFavorite(!isFavorite);
  }

  return (    
    <div className={styles.card}>
      {
      loading ? 
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
        </ContentLoader> :
        <>
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
            <img src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Button" className={styles.plus} onClick={onClickPlus} />  
          </div>
        </>
      }      
    </div>
  );
}

export default Card;