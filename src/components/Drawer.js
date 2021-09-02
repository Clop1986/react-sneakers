function Drawer({onClose, items = [], onRemove}) {
  return (

    <div className="overlay">
      <div className="drawer d-flex flex-column">
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
                    <div className="cartItem d-flex align-center mb-20">            
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
                    <b>21 498 руб.</b>
                  </li>
                  <li className="d-flex">
                    <span>Налог 5%:</span>
                    <div></div>
                    <b>1074 руб.</b>
                  </li>
                </ul>
                <button className="greenButton">
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="Arrow" />
                </button>
              </div>
            </>     
          ) : (
            <div className="cartEmpty d-flex align-center justify-center flex-column flex">
              <img src="/img/empty-cart.png" alt="Empty-cart" className="mb-20" width="120" height="120" />
              <h2>Корзина пустая</h2>
              <button className="greenButton" onClick={onClose}>
                <img src="/img/arrow.svg" alt="Arrow" />
                Вернуться назад
              </button>
            </div> 
          )
        }             
      </div>
    </div>
  );
}

export default Drawer;