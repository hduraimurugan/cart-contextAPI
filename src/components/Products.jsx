import { useState, useEffect, useContext } from 'react'
import { CartContext } from '../Context/cart.jsx'
import Cart from './Cart.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import data from "../assets/products .json";
import { BsCart4 } from "react-icons/bs";

export default function Products() {
  const [showModal, setshowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  const toggle = () => {
    setshowModal(!showModal);
  };

  function getProducts() {
    setProducts(data.products);
  }

  useEffect(() => {
    getProducts();
  }, []);

  const notifyAddedToCart = (item) => toast.success(`${item.title} added to cart!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#fff',
      color: '#000',
    }
  });

  const notifyRemovedFromCart = (item) => toast.error(`${item.title} removed from cart!`, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
    style: {
      backgroundColor: '#000',
      color: '#fff',
    }
  });

  const handleRemoveFromCart = (product) => {
    removeFromCart(product);
    notifyRemovedFromCart(product);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='flex flex-col justify-center bg-gray-200'>
      <ToastContainer />

      <div className='flex flex-col md:flex-row justify-around gap-4 md:gap-10 items-center px-20 py-5'>
        <div className='flex flex-row gap-7'>
          <div>
          <h1 className='md:text-2xl text-xl font-row-font mt-10 text-center mb-10'>Ship-Kart</h1>
          </div>
          <div className='flex items-center'>
            <input
              type="text"
              placeholder="Search Products Here"
              className="px-4 py-2 shadow-md text-black text-md rounded-lg focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

        </div>

        <div>
        {!showModal && (
          <button
            className='mt-4 md:mt-0 px-4 py-2 flex flex-row shadow-md bg-yellow-400 text-black text-xs font-bold uppercase rounded hover:bg-yellow-500 focus:outline-none focus:bg-yellow-600'
            onClick={toggle}
          >
            <BsCart4 size={16} /> Cart ({cartItems.length})
          </button>
        )}</div>
        
      </div>

      <div className='bg-blue-950 text-white'>
        <h1 className='flex md:flex-row flex-col items-center md:justify-center md:text-4xl text-md font-semibold font-list-font px-10 md:py-20 py-10 text-center'>Welcome to Our Upgraded Ship-Cart <BsCart4 size={36} /></h1>
      </div>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 px-10'>
        {filteredProducts.map(product => (
          <div key={product.id} className='bg-white shadow-md rounded-lg flex flex-col justify-between px-10 py-10'>

            <div>
              <img src={product.image} alt={product.title} className='rounded-md h-48' />
            </div>

            <div className='mt-4'>
              <h1 className='text-lg uppercase font-bold'>{product.title}</h1>
              <p className='mt-2 text-gray-600 text-sm'>{product.description.slice(0, 40)}...</p>
              <p className='mt-2 text-gray-600'>Rs.{product.price}/-</p>
            </div>

            <div className='mt-6 flex justify-between items-center'>
              {!cartItems.find(item => item.id === product.id) ? (
                <button
                  className='px-4 py-2 w-full shadow-md bg-yellow-400 text-black text-xs font-bold uppercase rounded-2xl hover:bg-yellow-500 focus:outline-none focus:bg-yellow-600'
                  onClick={() => {
                    addToCart(product);
                    notifyAddedToCart(product);
                  }}
                >
                  Add to cart
                </button>
              ) : (
                <div className="flex gap-4">
                  <button
                    className="px-4 py-2 w-full shadow-md bg-yellow-400 text-black text-xs font-bold uppercase rounded-2xl hover:bg-yellow-500 focus:outline-none focus:bg-yellow-600"
                    onClick={() => {
                      addToCart(product);
                    }}
                  >
                    +
                  </button>
                  <p className='text-gray-600'>{cartItems.find(item => item.id === product.id).quantity}</p>
                  <button
                    className="px-4 py-2 w-full shadow-md bg-yellow-400 text-black text-xs font-bold uppercase rounded-2xl hover:bg-yellow-500 focus:outline-none focus:bg-yellow-600"
                    onClick={() => {
                      const cartItem = cartItems.find(item => item.id === product.id);
                      if (cartItem.quantity === 1) {
                        handleRemoveFromCart(product);
                      } else {
                        removeFromCart(product);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <Cart showModal={showModal} toggle={toggle} />
    </div>
  );
}
