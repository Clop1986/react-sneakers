import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';

function App() {
  const [items, setItems] =React.useState([]);
  const [cartItems, setCartItems] =React.useState([]);
  const [favorites, setFavorites] =React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');  
  const [isLoading, setIsLoading] = React.useState(true); 
  const [isOrederComplete, setIsOrderComplete] = React.useState(false);   

  React.useEffect(() => {
    async function fetchData() {       
      try {
        const [cartResponse, favoritesResponse, itemsResponse, orderResponse] = await Promise.all([
          axios.get('https://6129f810068adf001789b9b5.mockapi.io/cart'),
          axios.get('https://6129f810068adf001789b9b5.mockapi.io/favorites'),
          axios.get('https://6129f810068adf001789b9b5.mockapi.io/items'),
          axios.get('https://6129f810068adf001789b9b5.mockapi.io/orders'),
        ]);        
        
        setIsLoading(false);        
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);            
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
        console.error(error);
      }
    }

    fetchData();
  }, []);  

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.parentId));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.parentId)));
        await axios.delete(`https://6129f810068adf001789b9b5.mockapi.io/cart/${findItem.id}`);        
      } else {
        setCartItems((prev) => [...prev, obj]);  
        const { data } = await axios.post('https://6129f810068adf001789b9b5.mockapi.io/cart', obj); 
        setCartItems((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));                
      }      
    } catch (error) {
      alert('Ошибка при добавлении в корзину');
      console.error(error);
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6129f810068adf001789b9b5.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  }

  const onAddToFavorite = async (obj) => {
    try {
      const findFavorite = favorites.find((item) => Number(item.parentId) === Number(obj.parentId));
      if (findFavorite) {
        setFavorites((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.parentId)));    
        await axios.delete(`https://6129f810068adf001789b9b5.mockapi.io/favorites/${findFavorite.id}`);          
      } else {
        setFavorites((prev) => [...prev, obj]);  
        const { data } = await axios.post('https://6129f810068adf001789b9b5.mockapi.io/favorites', obj); 
        setFavorites((prev) => prev.map(item => {
          if (item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            };
          }
          return item;
        }));       
      }    
    } catch (error) {
      alert('Произошла ошибка!');
      console.error(error);
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value );
  }

  const isItemAdded = (parentId) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(parentId));
  }  

  const isFavoriteAdded = (parentId) => {
    return favorites.some((obj) => Number(obj.parentId) === Number(parentId));
  }  

  const isOrderCompleteHide = () => {
    setCartOpened(true);
    setIsOrderComplete(false);
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, onAddToCart, setCartOpened, setCartItems, isFavoriteAdded, isOrederComplete, setIsOrderComplete}}>
      <div className="wrapper clear d-flex flex-column">   
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />         
        <Header onClickCart={isOrderCompleteHide} />
        <Route path="/" exact>
          <Home 
            items={items} 
            cartItems={cartItems}            
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToCart={onAddToCart}
            onAddToFavorite={onAddToFavorite}
            isLoading={isLoading}            
          />
        </Route>  
        <Route path="/favorites" exact>
          <Favorites />
        </Route>     
        <Route path="/orders" exact>
          <Orders />
        </Route> 
      </div>
    </AppContext.Provider>    
  );
}

export default App;