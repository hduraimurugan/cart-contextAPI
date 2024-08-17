import PropTypes from 'prop-types'
import { useContext } from 'react'
import { CartContext } from '../Context/cart.jsx'

export default function Cart({ showModal, toggle }) {
  const { cartItems, addToCart, removeFromCart, clearCart, getCartTotal } = useContext(CartContext)

  return (
    showModal && (
      <div className="fixed inset-0 left-1/4 flex items-center justify-center bg-white dark:bg-blue-950 text-black dark:text-white">
        <div className="flex flex-col w-full max-h-full overflow-y-auto gap-8 p-10 text-sm uppercase font-normal">
          <h1 className="text-2xl font-bold">Cart</h1>
          <div className="absolute right-16 top-10">
            <button
              className="px-4 py-2 shadow-md bg-gray-100 text-black text-xs font-bold uppercase rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-500"
              onClick={toggle}
            >
              Close
            </button>
          </div>
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <div className="flex flex-col md:flex-row justify-between mb-5 items-center" key={item.id}>
                <div className="flex gap-4">
                  <img src={item.image} alt={item.title} className="rounded-md h-24" />
                  <div className="flex flex-col">
                    <h1 className="text-lg font-bold">{item.title}</h1>
                    <p className='mt-2 text-gray-500 text-sm'>Details: <br/>{item.description.slice(0, 40)}...</p>
                    <p className="text-gray-400">Rs.{item.price}/-</p>
                  </div>
                </div>
                <div className="flex gap-4 md:my-1 my-5 ">
                  <button
                    className="px-4 py-2 shadow-md bg-gray-100 text-black text-xs font-bold uppercase rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-500"
                    onClick={() => {
                      addToCart(item)
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    className="px-4 py-2 shadow-md bg-gray-100 text-black text-xs font-bold uppercase rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-500"
                    onClick={() => {
                      removeFromCart(item)
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>
          {
            cartItems.length > 0 ? (
              <div className="flex flex-col justify-between items-center">
                <h1 className="text-lg font-bold mb-5">Total Amount to be Paid: Rs.{getCartTotal().toFixed(2)}/-</h1>
                <button
                  className="px-4 py-2 shadow-md bg-gray-100 text-black text-xs font-bold uppercase rounded hover:bg-gray-400 focus:outline-none focus:bg-gray-500"
                  onClick={() => {
                    clearCart()
                  }}
                >
                  Clear cart
                </button>
              </div>
            ) : (
              <h1 className="text-lg font-bold">Your cart is empty</h1>
            )
          }
        </div>
      </div>
    )
  )
}

Cart.propTypes = {
  showModal: PropTypes.bool,
  toggle: PropTypes.func
}
