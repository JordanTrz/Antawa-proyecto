import React, { Fragment, useState, useEffect } from "react";

const Formulario = (props) => {
  const { marcas, onSubmit = () => {} } = props;
  const [form, setForm] = useState({
    search: "",
    brand: "",
    model: "",
    year_from: "",
    year_to: "",
    price: "",
  });

  function validateForm() {
    return (
      !!form.search.length &&
      !!form.brand.length &&
      !!form.model.length &&
      !!form.year_from.length &&
      !!form.year_to.length &&
      !!form.price.length
    );
  }

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("search", form.search);
    params.set("brand", form.brand);
    params.set("model", form.model);
    params.set("year_from", form.year_from);
    params.set("year_to", form.year_to);
    params.set("price", form.price);
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
              placeholder="Buscar auto"
              className="form1__buscar__frm-buscar"
              value={form.search}
              onChange={(e) =>
                setForm((state) => ({ ...state, search: e.target.value }))
              }
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
            <label htmlFor="anio">Año</label>
            <input
              className="form1__periodo__num"
              type="date"
              placeholder="Desde"
              onChange={(e) => {
                setForm((state) => ({ ...state, year_from: e.target.value }));
              }}
            />
            <input
              className="form1__periodo__num"
              type="date"
              placeholder="Hasta"
              onChange={(e) => {
                setForm((state) => ({ ...state, year_to: e.target.value }));
              }}
            />

            <label htmlFor="rango" className="form1__periodo__espacio">
              Rango de precio S/.
            </label>
            <input
              type="range"
              name="rango"
              id="rango"
              min="10000"
              max="500000"
              step="5000"
              onChange={(e) => {
                setForm((state) => ({ ...state, price: e.target.value }));
              }}
            />

            <button disabled={!validateForm()}>BUSCAR</button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default Formulario;