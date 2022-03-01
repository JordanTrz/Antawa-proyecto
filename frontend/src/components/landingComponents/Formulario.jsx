import React, { Fragment, useState, useEffect } from "react";

const Formulario = (props) => {
  const { marcas, onSubmit = () => {} } = props;
  const [form, setForm] = useState({
    brand: "",
    model: ""
  });

  function validateForm() {
    return (
      !!form.brand.length &&
      !!form.model.length
    );
  }

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("brand", form.brand);
    params.set("model", form.model)
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params}`
    );
  }, [form]);

  return (
    <Fragment>
      <div className="form1">
        <div className="form1__option">
          <button>Todos</button>
          <button>Nuevos</button>
          <button>Usados</button>
        </div>

        <form
          className="form1__filtro"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
          }}
        >
          <div className="form1__buscar">
            <input
              type="text"
              placeholder="Buscar auto =>"
              className="form1__buscar__frm-buscar"
              value={form.search}
              onChange={(e) =>
                setForm((state) => ({ ...state, search: e.target.value }))
              } readOnly
            />
            <select
              name="marca"
              id="marca"
              value={form.brand}
              onChange={(e) => {
                setForm((state) => ({ ...state, brand: e.target.value }));
              }}
            >
              <option value="">Escoge tu marca</option>
              {marcas.data && marcas.data.content.map((marca)=>{
                return(
                  <option key={marca.make_id} value={marca.make_id}>
                    {marca.make_type}
                  </option>
                )
              })}
            </select>
            <select
              name="modelo"
              id="modelo"
              disabled={!form.brand.length}
              onChange={(e) => {
                setForm((state) => ({ ...state, model: e.target.value }));
              }}
            >
              <option value="0">Escoge tu modelo</option>
              {marcas.data && marcas.data.content.filter(marca=> marca.make_id == form.brand).map(modelos=>{
                return modelos.make_models.map(modelos => (
                  <option key={modelos.model_id} value={modelos.model_type}>
                    {modelos.model_type}
                  </option>
                ))})
              }
            </select>
          </div>

          <div className="form1__periodo">
            <button disabled={!validateForm()}>BUSCAR</button>
          </div>

        </form>
      </div>
    </Fragment>
  );
};

export default Formulario;