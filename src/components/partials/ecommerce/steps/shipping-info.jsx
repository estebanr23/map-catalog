import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Radio from "@/components/ui/Radio";
import Modal from "@/components/ui/Modal";
import { ClienteForm } from "@/components/libreria/modals";
import { useClienteStore } from "@/hooks/libreria";
import { handleClientes } from "@/store/cliente";
import { addCustomerToSale } from "@/store/api/shop/cartSlice";
import osoApi from "@/api/config";

const ShippingInfo = () => {
  const dispatch = useDispatch()
  const { customer } = useSelector(state => state.cart) 
  const { startSavingCliente } = useClienteStore()
  const [value, setValue] = useState("A"); // 'A:Consumidor Final' , 'B:Cliente Mayorista'

  const { clientes } = useClienteStore()
  const [search, setSearch] = useState('')
  const [show, setShow] = useState(true) 
  const [select, setSelect] = useState(null) // Cliente seleccionado de buscador

  async function onSearch({ target: { value } }){
    setSearch(value)

    if (value.length === 0) {
      setShow(true)
      return null
    }

    if (value.length < 3) return false

    try {
      const response = await osoApi.get(`/clientes/buscar/${value}`)
      const { data } = response
      dispatch(handleClientes(data))
    } catch (error) {
      console.log(error)
    }
  }

  function selectCliente (cliente) {
    setSelect(cliente)
    setSearch('')
  }

  const handleChange = (e) => {
    setValue(e.target.value)
    
    if(e.target.value === 'A') {
      dispatch(addCustomerToSale(null))
    } else {
      dispatch(addCustomerToSale(select))
    }
  };

  useEffect(() => {
    customer && dispatch(addCustomerToSale(null))
  }, [])
  
  return (
    <>
      <div className="bg-white dark:bg-slate-800">
        <div className=" rounded p-5 space-y-5">
          <div className="flex justify-center gap-4 mb-4">
            <div className="  relative w-2/3">
              <input type="text" 
                placeholder="Buscar clientes" 
                className="px-4 py-2 rounded-lg border border-gray-400 w-full" 
                onChange={onSearch}
                value={search}
              />

              {/* Resultados de busqueda de clientes */}
              {
                (search.length >= 3 && show) && (
                  <ul className='w-full overflow-y-auto h-max-32 absolute z-10 bg-white'>
                    {
                      (clientes.length > 0)
                        ? clientes.map((cliente) => (
                          <li key={cliente.id} className='hover:bg-slate-300 border-b-2 border-x px-2'><button type='button' className='mb-1 w-full text-start py-2' onClick={() => selectCliente(cliente)}><strong>{cliente.nro_documento}</strong> - {cliente.apellido} {cliente.nombre}</button></li>
                        ))
                        : <li className='hover:bg-slate-300 border-b-2 border-x px-2 py-2'>No se encontraron clientes.</li>
                    }
                  </ul>
                )
              }
            </div>

            {/* Modal de agregar cliente */}
            <div className="flex justify-end">
              <Modal
                title="Agregar Cliente"
                label="Nuevo"
                labelClass="btn-dark"
                centered
                children={
                  <ClienteForm 
                    fnAction={startSavingCliente} 
                  />
                }
              />
            </div>
          </div>

          <div className=" border dark:border-slate-700 rounded  p-5">
            <label className="flex">
              <Radio
                name="x"
                value="A"
                checked={value === "A"}
                onChange={handleChange}
              />
              <div className="flex -mt-1 space-x-5 rtl:space-x-reverse">
                <div className="  min-w-[110px] md:text-base text-sm text-slate-500 dark:text-slate-400  space-y-1.5 ">
                  <p>Cliente:</p>
                </div>
                <div className="  md:text-base text-sm text-slate-900 dark:text-slate-300  space-y-1.5 ">
                  <p>Consumidor Final</p>
                </div>
              </div>
            </label>
          </div>

          {
            (select) && (
              <div className=" border dark:border-slate-700 rounded p-5 ">
                <label className="flex gap-1 ">
                  <Radio
                    name="x"
                    value="B"
                    checked={value === "B"}
                    onChange={handleChange}
                  />
                  <div className="flex -mt-1 space-x-5 rtl:space-x-reverse">
                    <div className="min-w-[110px] md:text-base text-sm text-slate-500 dark:text-slate-400  space-y-1.5">
                      <p>Nombre:</p>
                      <p>DNI:</p>
                      <p>Telefono:</p>
                      <p>Email:</p>
                      <p>Domicilio:</p>
                    </div>
                    <div className="  md:text-base text-sm text-slate-900 dark:text-slate-300  space-y-1.5 ">
                      <p>{select.apellido} {select.nombre}</p>
                      <p>{select.nro_documento}</p>
                      <p>{select.telefono}</p>
                      <p>{select.email}</p>
                      <p>{select.domicilio}</p>
                    </div>
                  </div>
                </label>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default ShippingInfo;
