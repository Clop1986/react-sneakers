import React from 'react';
import Card from '../components/Card';

function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onAddToCart, onAddToFavorite, isLoading}) {  

  const renderItems = () => { 
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));  
    return (isLoading ? [...Array(8)] : filteredItems).map((item, index) => (
      <Card 
        key={index}            
        onFavorite={(obj) => onAddToFavorite(obj)}
        onPlus={(obj) => onAddToCart(obj)}        
        loading={isLoading}
        {...item}
      />
    ));
  }

  return (
    <div className="content p-40">
      <img src="/img/banner.jpg" alt="Баннер" width="100%" className="mb-40" />
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && <img src="/img/btn-remove.svg" alt="Clear" className="clear cu-p" onClick={() => setSearchValue('')} />}
          <input type="text" placeholder="Поиск ..." onChange={onChangeSearchInput} value={searchValue} />
        </div>
      </div>
      <div className="d-flex flex-wrap">{renderItems()}</div>
    </div>
  );
}

export default Home;