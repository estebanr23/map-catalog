import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useVentaStore } from "@/hooks/libreria";

const InvoiceCart = () => {
  const {id} = useParams()
  const { activeSale } = useSelector((state) => state.cart);
  const { productos, modo_pago, total, descuento, fecha, cliente, total_descuento } = activeSale
  const { startShowVenta } = useVentaStore()

  useEffect(() => {
    if(id) startShowVenta(id)
  }, [])

  // TODO: Hacer todo esto con activeSale y resetear todo lo demas

  return (
    <div className="p-6">
      <div className="text-center mb-8">
        <h4 className="text-slate-900 dark:text-slate-300 text-2xl font-medium pb-4">
          La Venta Ha Finalizado!
        </h4>
        {/* <p className="text-slate-900 dark:text-slate-300 text-base font-normal">
          A copy or your order summary has been sent to
          <span className=" dark:text-slate-400 text-base font-medium ml-1 cursor-pointer">
            customer@example.com
          </span>
        </p> */}
      </div>

      {/* Resumen de venta  */}
      <div className="border dark:border-slate-700 p-3 lg:p-6 rounded">
        <div className=" flex justify-between border-b dark:border-slate-700 mb-4">
          <p className="text-slate-900 dark:text-slate-300 text-lg font-medium pb-3">
            Resumen de Venta
          </p>
          <p className="text-slate-900 dark:text-slate-300 text-lg font-semibold pb-3">
            Nro. {id}
          </p>
        </div>

        {
          (!!cliente) 
          ? (
            <div className=" md:flex md:space-x-3 lg:space-x-5 space-y-3">
              <div className="flex-1">
                <div className="flex space-x-2 lg:space-x-12 rtl:space-x-reverse">
                  <div className=" font-medium  min-w-[110px] md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 ">
                    <p>Fecha:</p>
                    <p>Cliente:</p>
                  </div>
                  <div className="font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 min-w-[110px] ">
                    <p>{fecha || '-'}</p>
                    <p>{cliente.apellido} {cliente.nombre}</p>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex space-x-2 lg:space-x-12 rtl:space-x-reverse">
                  <div className=" font-medium  min-w-[110px] md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 ">
                    <p>Email:</p>
                    <p>Direccion:</p>
                  </div>
                  <div className=" font-normal md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 min-w-[110px] ">
                    <p>{cliente.email}</p>
                    <p>{cliente.domicilio}</p>
                  </div>
                </div>
              </div>
            </div>
          )
          : (
            <div className=" md:flex md:space-x-3 lg:space-x-5 space-y-3">
              <div className=" font-medium  min-w-[110px] md:text-sm text-xs text-slate-900 dark:text-slate-300  space-y-3 ">
                <p>Cliente: Consumidor Final</p>
              </div>
            </div>
          )
        }
      </div>

      {/* Ticket  */}
      {/* <div className="py-12 text-center lg:text-2xl text-xl font-normal text-slate-900 dark:text-slate-300">
        Número de Titket:{" "}
        <span className="lg:text-2xl text-xl font-medium">
          2023
        </span>
      </div> */}

      {/* Detalle de medios de pago  */}
      {/* <div className="p-3 md:p-6 rounded">
        <p className="text-slate-900 dark:text-slate-300 text-xl font-medium pb-3 border-b dark:border-slate-700">
          Detalle de Pago
        </p>
        <div className="bg-white dark:bg-slate-800 space-y-7">
          <div className="overflow-x-auto border-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="w-1/2 divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
                  <thead className=" border-0 border-slate-00 dark:border-slate-700">
                    <tr>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case pl-0 rtl:pr-0 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left "
                      >
                        Pago
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left	 "
                      >
                        Monto
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white  divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                    {paymentMethods?.map((payment, i) => (
                      <tr key={i}>
                        <td className="table-td flex items-center space-x-3 rtl:space-x-reverse pb-3 pl-0 rtl:pr-0 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          <div>
                            <p className="text-slate-900 dark:text-slate-300 lg:text-base text-sm font-normal md:pb-2 pb-1 lg:w-[380px] w-[150px] truncate">
                              {payment.medio_pago}
                            </p>
                          </div>
                        </td>
                        <td className="table-td pb-3 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                          ${payment.monto}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Detalle de productos */}
      <div className="p-3 md:p-6 rounded">
        <p className="text-slate-900 dark:text-slate-300 text-xl font-medium pb-3 border-b dark:border-slate-700">
          Detalle de Venta
        </p>
        <div className="bg-white dark:bg-slate-800 space-y-7">
          <div className="overflow-x-auto border-0">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700 ">
                  <thead className=" border-0 border-slate-00 dark:border-slate-700">
                    <tr>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case pl-0 rtl:pr-0 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left "
                      >
                        Productos
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left	 "
                      >
                        Cantidad
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left	 "
                      >
                        Precio
                      </th>
                      <th
                        scope="col"
                        className=" table-th text-slate-900 dark:text-slate-300 font-medium lg:text-base text-sm normal-case pr-0 rtl:pl-0	ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left "
                      >
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white  divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                    {
                      productos?.map((item, i) => (
                        <tr key={i}>
                          <td className="table-td flex items-center space-x-3 rtl:space-x-reverse pb-3 pl-0 rtl:pr-0 ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            <div>
                              <p className="text-slate-900 dark:text-slate-300 lg:text-base text-sm font-normal md:pb-2 pb-1 lg:w-[380px] w-[150px] truncate">
                                {item.descripcion}
                              </p>
                            </div>
                          </td>
                          <td className="table-td pb-3 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            {item.cantidad}
                          </td>
                          <td className="table-td pb-3 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            ${item.precio}
                          </td>
                          <td className="table-td pb-3  pr-0 rtl:pl-0 text-slate-900 dark:text-slate-300 text-sm lg:text-base font-normal ltr:text-left ltr:last:text-right rtl:text-right rtl:last:text-left">
                            ${item.precio * item.cantidad}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>

                <div className="md:flex  lg:py-6 py-3 justify-between border-t dark:border-slate-700 mt-3"> {/* items-center */}

                  <div className="flex-none min-w-[270px] space-y-3">
                    <p className="text-slate-900 dark:text-slate-300 text-base font-medium pb-3 border-b dark:border-slate-700">
                      Detalle de Pago
                    </p>
                    { 
                      modo_pago.map((payment, i) => (
                        <div className="space-y-3" key={i}>
                          <div className="flex justify-between">
                            <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                              {payment.medio_pago}:
                            </span>
                            <span className="text-slate-900 dark:text-slate-300 font-medium text-xs lg:text-sm">
                              ${payment.monto}
                            </span>
                          </div>
                        </div>
                      )) 
                    }
                  </div>
              
                  <div className="flex-none min-w-[270px] space-y-3">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Subtotal:
                        </span>
                        <span className="text-slate-900 dark:text-slate-300 font-medium text-xs lg:text-sm">
                          ${total}
                        </span>
                      </div>
                      {/* <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Descuento:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm font-normal">
                          10%
                        </span>
                      </div> */}
                      {/* <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          IVA:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm font-normal">
                          2.5%
                        </span>
                      </div> */}
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Descuento:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 text-xs lg:text-sm font-normal">
                          {descuento}%
                        </span>
                      </div>
                    </div>
                    <div className="border-t dark:border-slate-700 ">
                      <div className="flex justify-between pt-3">
                        <span className="font-medium text-slate-900 text-xs lg:text-sm dark:text-slate-300">
                          Total:
                        </span>
                        <span className="text-slate-900 dark:text-slate-300 text-xs lg:text-sm">
                          ${total_descuento}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="flex justify-end gap-4">
        <button
          type="button"
          className="flex items-center gap-2  btn btn-danger text-sm font-normal disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon icon="heroicons-outline:arrow-long-left" className="text-xl"/>
          Volver
        </button>

        <button
          type="button"
          className="flex items-center gap-2 btn btn-warning text-sm font-normal disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Icon icon="heroicons-outline:printer" className="text-xl"/>
          Imprimir
        </button>
      </div> */}
      
    </div>
  );
};

export default InvoiceCart;
