import { useEffect, useState } from "react";
import { payments } from "@/constant/data";
import InputGroup from "@/components/ui/InputGroup";
import Button from "@/components/ui/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addPaymentMethod, applyDescuento, removePaymentMethod, resetDescuento } from "@/store/api/shop/cartSlice";
import { Icon } from "@iconify/react";
import Alert from "@/components/ui/Alert";
const Payment = () => {
  const dispatch = useDispatch()
  const { items, totalPrice, totalApply, paymentMethods, discount, errorMessage } = useSelector((state) => state.cart);
  const [payment, setPayment] = useState("EFECTIVO");
  const [descuento, setDescuento] = useState(discount);
  const [monto, setMonto] = useState(0);

  function aplicarDescuento() {
    const result = (totalPrice * descuento) / 100
    const nuevoTotal = totalPrice - result
    dispatch(applyDescuento({nuevoTotal, descuento}))

    setMonto(nuevoTotal) // Seteo el input de medio de pago al valor con descuento
  }

  function agregarMedioPago () {
    const object = {
      medio_pago: payment, // Nombre de medio de pago
      monto: parseFloat(monto) // Monto
    }

    dispatch(addPaymentMethod(object))
    setMonto(0)
  }

  function onResetDescuento () {
    dispatch(resetDescuento())
    setDescuento(0)
  }

  useEffect(() => {
    if(paymentMethods.length === 0) aplicarDescuento()
  }, [])
  
  return (
    <div className="card  rounded-sm p-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="lg:col-span-7 col-span-12">
          <h3 className="text-slate-900 dark:text-slate-300 font-medium  text-base  pb-3">
            Seleccione la Forma de Pago
          </h3>
          <div className="card border dark:border-slate-700 rounded-sm p-5">
            <div className="space-x-5 rtl:space-x-reverse">
              <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
                {payments.map((pay, i) => {
                  return (
                    <button onClick={() => setPayment(pay.value)} key={i}>
                      <div
                        className={`${
                          pay.value === payment
                            ? "text-slate-900 dark:text-white scale-105 ring-1 ring-primary-500 "
                            : " scale-100"
                        } cursor-pointer border rounded text-center
                          border-slate-300 ring-0  dark:border-slate-700 p-2 transition-all duration-150`}
                      >
                        <div>
                          <img
                            className="h-full w-full object-cover"
                            src={pay.img}
                            alt=""
                          />
                        </div>
                        <p className="pt-2 truncate">{pay.value}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="text-base text-gray-500 mt-8">
            <InputGroup
              type="number"
              placeholder="Monto"
              onChange={(e) => setMonto(e.target.value)}
              value={monto}
              step="0.01"
              append={<Button text="Agregar" className="btn btn-dark" disabled={!monto} onClick={agregarMedioPago}/>}
            />
          </div>

          {/* Listado de medios de pagos  */}
          <div className="mt-8">
            {
              (paymentMethods.length > 0)
              ? (
                <ul className="divide-y divide-slate-300 dark:divide-slate-600 pb-8 mt-4">
                  <li className=" text-base font-semibold pb-3">
                    <div className="flex justify-between"> 
                      <p>Pago</p>
                      <p>Monto</p>
                      <p></p>
                    </div>
                  </li>

                  {(paymentMethods.length > 0) && (paymentMethods.map((item) => (
                    <li
                      className=" text-sm  text-slate-600 dark:text-slate-300 py-2 "
                      key={item.id}
                    >
                      <div className="flex justify-between gap-3 pb-1">
                        <p>
                          {item.medio_pago}
                        </p>

                        <p className=" text-slate-800  dark:text-slate-300 font-medium">
                          ${item.monto}
                        </p>

                        <button
                          onClick={() => dispatch(removePaymentMethod(item.id))}
                          className="bg-slate-100 text-slate-400 p-2.5  mb-1.5 rounded-full hover:bg-red-200   hover:text-red-600  w-min"
                        >
                          <Icon icon="heroicons:trash" />
                        </button>
                      </div>
                    </li>
                    )))
                  }
                </ul>
              )
              : (
                <Alert
                  label="Por favor ingrese el medio de pago."
                  className="alert-outline-warning"
                  icon="heroicons-outline:exclamation"
                />
              )
            }
          </div>
        </div>

        <div className="lg:col-span-5 col-span-12">
          <h3 className="text-slate-900 dark:text-slate-300 font-medium  text-base  pb-3">
            Resumen
          </h3>
          <div className="card border dark:border-slate-700 rounded-sm p-4">
            <div>
              <ul className="divide-y divide-slate-300 dark:divide-slate-600  pb-8">
                <li className=" text-sm  pb-3 ">
                  <div className="flex justify-between">
                    <p>Productos</p>
                    <p>Total</p>
                  </div>
                </li>
                {items?.map((item, i) => (
                  <li
                    className=" text-sm  text-slate-600 dark:text-slate-300 py-2 "
                    key={i}
                  >
                    <div className="flex justify-between gap-3 pb-1">
                      <p>
                        {item.descripcion}
                        <span className=" text-slate-800  dark:text-slate-300  font-medium px-2">
                          x
                        </span>
                        <span className=" text-slate-800  dark:text-slate-300  font-medium">
                          {item.cantidad}
                        </span>
                      </p>
                      <p className=" text-slate-800  dark:text-slate-300  font-medium">
                        ${item.precio * item.cantidad}
                      </p>
                    </div>
                  </li>
                ))}

                <li className=" text-sm  py-2">
                  <div className="flex justify-between gap-3 mt-8">
                    <p className=" text-slate-900  dark:text-slate-300  font-bold">
                      Sub Total
                    </p>
                    <p className=" text-slate-800  dark:text-slate-300  font-bold">
                      ${totalPrice}
                    </p>
                  </div>
                </li>

                {
                  <li className=" text-sm  py-2 ">
                    <div className="flex justify-between gap-3 ">
                      <p className=" text-slate-900  dark:text-slate-300  font-bold">
                        Total 
                      </p>
                      <p className=" text-slate-800  dark:text-slate-300  font-bold">
                        {/* ${totalApply ? totalApply : totalPrice} */}
                        ${totalApply}
                      </p>
                    </div>
                  </li>
                }
              </ul>

              {/* <InputGroup
                type="number"
                placeholder="Aplicar Descuento"
                onChange={(e) => setDescuento(parseFloat(e.target.value))}
                value={descuento}
                append={<Button text="Aplicar" className="btn btn-dark" disabled={!descuento} onClick={aplicarDescuento}/>}
              /> */}

              <InputGroup
                type="number"
                placeholder="Aplicar Descuento"
                onChange={(e) => setDescuento(parseFloat(e.target.value))}
                value={descuento}
                step="0.01"
                prepend={
                  <Button
                    icon="heroicons-outline:trash"
                    className="btn btn-dark"
                    onClick={() => onResetDescuento()}
                    disabled={!descuento}
                  />
                }
                append={<Button text="Aplicar" className="btn btn-dark" disabled={!descuento} onClick={aplicarDescuento}/>}
              />
            </div>
          </div>
        </div>
      </div>

      {
        (!!errorMessage) && (
          <Alert 
            label={errorMessage} 
            className="alert-danger mt-4" 
            icon="heroicons-outline:ban"
          /> 
        )
      }
       
    </div>
  );
};

export default Payment;
