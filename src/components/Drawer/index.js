import React from 'react';
import axios from 'axios';
import Info from '../Info';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.scss';
import AppContext from '../../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({onClose, items = [], onRemove, opened}) {
  const { isOrederComplete, setIsOrderComplete } = React.useContext(AppContext); 
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  //const [isOrederComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);    

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://6129f810068adf001789b9b5.mockapi.io/orders', {
        items: cartItems,
      });      
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);   
      
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(`https://6129f810068adf001789b9b5.mockapi.io/cart/${item.id}`);
        await delay(1000);
      }

    } catch {
      alert('Ошибка при создании заказа :(');
    }  
    setIsLoading(false); 
  }  

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={`${styles.drawer} d-flex flex-column`}>
        <h2 className="mb-30 d-flex justify-between">
          Корзина
          <img src="/img/btn-remove.svg" alt="Close" className="removeBtn cu-p" onClick={onClose} />
        </h2>
        {
          items.length > 0 ? (
            <>
              <div className="items flex">
                {
                  items.map((obj) => (
                    <div className="cartItem d-flex align-center mb-20" key={obj.id}>            
                      <div className="cartItemImg flex" style={{ backgroundImage: `url(${obj.imageUrl})` }}></div>
                      <div className="mr-20 flex">
                        <p className="mb-5">{obj.title}</p>
                        <b>{obj.price} руб.</b>
                      </div>
                      <img src="/img/btn-remove.svg" alt="Remove" className="removeBtn" onClick={() => onRemove(obj.id)} />
                    </div>
                  ))
                }            
              </div>
              <div className="cartTotalBlock">
                <ul>
                  <li className="d-flex">
                    <span>Итого:</span>
                    <div></div>
                    <b>{totalPrice} руб.</b>
                  </li>
                  <li className="d-flex">
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>{totalPrice * 0.05} руб.</b>
                  </li>
                </ul>
                <button className="greenButton" onClick={onClickOrder} disabled={isLoading}>
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </>     
          ) : (
            <Info title={isOrederComplete ? 'Заказ оформлен' : 'Корзина пустая'} description={isOrederComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} image={isOrederComplete ? '/img/complete-order.png' : '/img/empty-cart.png'} />
          )
        }             
      </div>
    </div>
  );
}

export default Drawer;