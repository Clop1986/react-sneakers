import React from 'react';
import Drawer from './components/Drawer';
import Header from './components/Header';
import Card from './components/Card';

function App() {
  const [items, setItems] =React.useState([]);
  const [cartItems, setCartItems] =React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    fetch('https://6129f810068adf001789b9b5.mockapi.io/items')
      .then(res => {
        return res.json();
      }).then((json) => {
        setItems(json);
      });
  }, []);  

  const onAddtoCart = (obj) => {
    setCartItems(prev => [...prev, obj]);
  }

  return (
    <div className="wrapper clear">   
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}            
      <Header onClickCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input type="text" placeholder="Поиск ..." />
          </div>
        </div>
        <div className="d-flex flex-wrap">                 
          {items.map((item) => (
            <Card 
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavorite={() => console.log('Добавили в закладки')}
              onPlus={(obj) => onAddtoCart(obj)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;