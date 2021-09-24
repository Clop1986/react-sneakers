import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import AppContext from '../context';

function Favorites() {

  const { favorites, onAddToFavorite, onAddToCart} = React.useContext(AppContext);

  return (
    <>
      {
        favorites.length > 0 ? (
          <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
              <h1>Мои закладки</h1>        
            </div>
            <div className="d-flex flex-wrap">                 
              {favorites.map((item, index) => (
                <Card 
                  key={index}             
                  onFavorite={onAddToFavorite}
                  onPlus={onAddToCart}   
                  {...item}        
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="content p-40 d-flex align-center justify-center flex-column flex cartEmpty">
            <img src="img/empty-favorite.png" alt="Пустота" width="70" height="70" />
            <h2>Закладок нет :(</h2>
            <p className="opacity-6 mt-5">Вы ничего не добавляли в закладки</p>
            <Link to="/" className="greenButton d-flex align-center justify-center">              
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад              
            </Link>          
          </div>
        )
      }      
    </>
  );
}

export default Favorites;