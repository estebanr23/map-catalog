import { useState } from "react";
import Icon from "@/components/ui/Icon";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, updatePrice, updateQuantity } from "@/store/api/shop/cartSlice";
import osoApi from "@/api/config";
import { handleProductos } from "@/store/producto";
import { useProductoStore } from "@/hooks/libreria";

const CartStep = () => {
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);

  const { productos } = useProductoStore() 
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(true)

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleIncreaseQuantity = (productId) => {
    const item = items.find((item) => item.id === productId);

    if (item && item.cantidad < 10) { // Debe ser menor a 10
      dispatch(updateQuantity({ id: productId, cantidad: item.cantidad + 1 }));
    }
  };

  const handleDecreaseQuantity = (productId) => { 
    const item = items.find((item) => item.id === productId);

    if (item && item.cantidad > 1) { // Debe ser mayor a 1
      dispatch(updateQuantity({ id: productId, cantidad: item.cantidad - 1 }));
    }
  };

  async function onSearch({ target: { value } }){
    setSearch(value)

    if (value.length === 0) {
      setShow(true)
      return null
    }

    if (value.length < 3) return false

    try {
      const response = await osoApi.get(`/productos/buscar/${value}`)
      const { data } = response
      dispatch(handleProductos(data))
    } catch (error) {
      console.log(error)
    }
  }

  function selectProducto (producto) {
    dispatch(addToCart(producto))
    setSearch('')
  }
  
  return (
    <div className="bg-white dark:bg-slate-800 space-y-7">

      <div className="mb-4 mx-auto relative w-2/3">
        <input type="text" 
          placeholder="Buscar productos" 
          className="px-4 py-2 rounded-lg border border-gray-400 w-full" 
          onChange={onSearch}
          value={search}
        />

        {/* Resultados de busqueda de productos */}
        {
          (search.length >= 3 && show) && (
            <ul className='w-full overflow-y-auto h-max-32 absolute z-10 bg-white'>
              {
                (productos.length > 0)
                  ? productos.map((producto) => (
                    <li key={producto.id} className='hover:bg-slate-300 border-b-2 border-x px-2'><button type='button' className='mb-1 w-full text-start py-2' onClick={() => selectProducto(producto)}><strong>{producto.codigo}</strong> - {producto.descripcion}</button></li>
                  ))
                  : <li className='hover:bg-slate-300 border-b-2 border-x px-2 py-2'>No se encontraron productos.</li>
              }
            </ul>
          )
        }
      </div>

      <div className="overflow-x-auto border-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden ">
            <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
              <thead className=" border-0 border-slate-100 dark:border-slate-800">
                <tr>
                  <th scope="col" className=" table-th  ">
                    Codigo
                  </th>
                  <th scope="col" className=" table-th ">
                    Descripcion
                  </th>
                  <th scope="col" className=" table-th ">
                    Precio
                  </th>
                  <th scope="col" className=" table-th ">
                    Cantidad
                  </th>
                  <th scope="col" className=" table-th w-32">
                    Dto %
                  </th>
                  <th scope="col" className=" table-th ">
                    Total
                  </th>
                  <th scope="col" className=" table-th ">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white  divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                {items.length > 0 ? (
                  items?.map((item, i) => (
                    <tr key={i}>
                      <td className="table-td pb-3"><strong>{item.codigo}</strong></td>
                      <td className="table-td pb-3">{item.descripcion}</td>
                      <td className="table-td pb-3">${item.precio_original}</td> {/* ${item.precio} */}
                      <td className="table-td pb-3">
                        <div className="flex-1 h-8 md:min-w-[112px] min-w-[95px] flex border border-1 border-slate-900 delay-150 ease-in-out dark:border-slate-600 divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-slate-900 dark:divide-slate-600 rounded">
                          <button
                            className="md:px-3 px-2 disabled:cursor-not-allowed"
                            onClick={() => handleDecreaseQuantity(item.id)}
                            disabled={item.cantidad <= 1}
                          >
                            <Icon icon="eva:minus-fill" />
                          </button>

                          <span className="flex-1 text-xs  text-center flex items-center justify-center">
                            {item.cantidad}
                          </span>
                          <button
                            className="md:px-3 px-2 disabled:cursor-not-allowed"
                            onClick={() => handleIncreaseQuantity(item.id)}
                            disabled={item.cantidad >= 10}
                          >
                            <Icon icon="eva:plus-fill" />
                          </button>
                        </div>
                      </td>
                      <td className="table-td pb-3">  
                        <div className="flex items-center">
                          <input 
                            onChange={(e) => dispatch(updatePrice({id: item.id, descuento:e.target.value}))}
                            value={item.descuento || ''}
                            type="number"
                            min="0" 
                            className="py-1 w-24 text-center border border-1 border-slate-900 delay-150 ease-in-out dark:border-slate-600 divide-x-[1px] rtl:divide-x-reverse text-sm font-normal divide-slate-900 dark:divide-slate-600 rounded"
                            step="0.01"
                          />
                          <span className="md:px-3 px-2 disabled:cursor-not-allowed">%</span>     
                        </div>              
                      </td>
                      <td className="table-td pb-3">
                        ${item.precio * item.cantidad}
                      </td>
                      <td className="table-td pb-3">
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="bg-slate-100 text-slate-400 p-2.5  mb-1.5 rounded-full hover:bg-red-200   hover:text-red-600  "
                        >
                          <Icon icon="heroicons:trash" />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="table-td text-center h-24 " colSpan="5">
                      No se agregaron productos.
                    </td>
                  </tr>
                )}
              </tbody>

              <tfoot className="mx-6">
                <tr className="border-t dark:border-slate-700  ">
                  <td className="table-td " colSpan="5">
                    <p className="md:text-base text-sm font-medium text-slate-500 dark:text-slate-400">
                      Subtotal:
                    </p>
                  </td>
                  <td className="table-td">
                    <p className="md:text-base text-sm font-medium text-slate-900 dark:text-slate-300">
                      ${totalPrice}
                    </p>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartStep;
