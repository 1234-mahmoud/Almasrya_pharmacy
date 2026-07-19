import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../store/slices/cartSlice";
import cart_pic from "../src/assets/cart.svg";
import { RiShoppingCartLine } from "react-icons/ri";
export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return (
    <div
      className={`relative  rounded-xl p-5
        bg-white shadow-2xl shadow-gray-500 `}
    >
      <div className={`flex items-center gap-2 `}>
        <RiShoppingCartLine color="rgba(56,52,244,1)" className="w-7 h-7" />
        <span className={`text-xl font-bold`}>Current Sale</span>
      </div>
      <hr
        className={`absolute top-20 left-0 w-full h-px bg-gray-300 border-0`}
      />
      <div
        className={`flex flex-col lg:flex-row justify-between items-center gap-10  py-5`}
      >
        <div
          className={`
            my-10 px-5 w-full
        `}
        >
          <span>Cart is Empty</span>
          {/* Medicines */}
          <div
            className="
          
            grid
      grid-cols-1
      md:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-4
      py-4
          "
          >
            {/* Medicine card */}
            {items.map((item) => (
              <div
                key={item.id}
                className="
            w-full
            h-70
            rounded-xl
            flex
            flex-col
            gap-5
            justify-center
            px-3
            md:px-5
            bg-white
            border
            border-gray-300
          "
              >
                <div className="flex flex-col gap-5">
                  <span className="flex flex-col gap-3">
                    <span className="text-lg md:text-xl font-bold">
                      {item.name}
                    </span>

                    <span className="bg-blue-100 text-blue-600 w-fit px-3 rounded-lg">
                      {item.category}
                    </span>

                    <span className="text-md text-gray-600">
                      {item.description}
                    </span>
                  </span>
                </div>

                <div className="flex flex-col items-center w-full">
                  <span className="text-xl font-bold text-blue-600">
                    {item.price}$
                  </span>
                  <div
                    className={`flex flex-col justify-center items-center gap-4`}
                  >
                    <div className={`flex justify-center items-center gap-3`}>
                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="bg-green-600 w-10 rounded-full text-white font-bold p-2"
                      >
                        +
                      </button>
                      <span>quantity:{item.quantity}</span>
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="bg-red-600 w-10 rounded-full text-white font-bold p-2"
                      >
                        -
                      </button>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="bg-red-600 text-white font-semibold p-2 rounded-md"
                    >
                      Remove from Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
