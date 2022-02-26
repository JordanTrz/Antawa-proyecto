import React, { useEffect, useState } from 'react';
import Marc from '../../api/marca';
import Cards from '../../api/apicard';
import Modelo from '../../api/modelo';
import Categoria from '../../api/categoria';
import { useSelector } from 'react-redux';
import { Car } from './components/car';
import { api } from '../../api/api';
import 'boxicons';

const BcrAuto = () => {
  const [queryString, setQueryString] = useState(null);
  const [offers, setOffers] = useState([]);
  const [region,setRegion] = useState([]);
  const [dataSearch, setDataSearch] = useState([])
  const [isSent,setIsSent] = useState(false)
  const marcas = useSelector((state) => state.car.cars);
  const [form, setForm] = useState({
    ubication: '',
    search: '',
    brand: '',
    model: '',
    year_from: '',
    year_to: '',
    price: '',
    category:'',
    price_from: '',
    price_to: '',
    kilometer_from: '',
    kilometer_to: '',
  });

  const getOffertas = () => {
    api.get('/salepost')
    .then(({ data }) => {
      setOffers(data.content);
      setDataSearch(data.content)
    });
  }

  const search = (offers) =>{
    const alldata = offers.filter((offer) =>
      offer.region_type.toLowerCase().includes((form.ubication).toLowerCase()) &&
      offer.make_type.toLowerCase().includes((form.brand).toLowerCase()) &&
      offer.model_type.toLowerCase().includes((form.model).toLowerCase()) &&
      offer.category_type.toLowerCase().includes((form.category).toLowerCase())
    )
    setDataSearch(alldata);
  }

  console.log(dataSearch)

  const onSubmit = (e) => {
    e.preventDefault();
    // getOffertas(queryString);
    setIsSent(true);
    search(offers);
  }

  useEffect(() => {
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    params.set('search', form.search);
    params.set('brand', form.brand);
    params.set('model', form.model);
    params.set('year_from', form.year_from);
    params.set('year_to', form.year_to);
    params.set('price', form.price);

    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${params}`
    );
    const getUbication = async () =>{
      await api
              .get('/region')
              .then(res=>setRegion(res.data.content))
    }
    getUbication();
  }, [form]);

  useEffect(() => {
    if (!queryString) {
      const querystring = window.location.search;
      const params = new URLSearchParams(querystring);
      setQueryString(params);
    }

    if (queryString) {
      getOffertas(queryString);
      // setForm((state) => {
      //   return {
      //     ...state,
      //     search: queryString.get('search'),
      //     brand: queryString.get('brand'),
      //     model: queryString.get('model'),
      //     year_from: queryString.get('year_from'),
      //     year_to: queryString.get('year_to'),
      //     price: queryString.get('price'),
      //   };
      // });
    }
  }, [queryString]);

  return (
    <div className="main_buscar_auto">
      <div className="filtro">
        <form onSubmit={onSubmit}>
          <div className="filtro__titulo">
            <div>Ubicación</div>
            <div>
              <select value={form.ubication} name="ubication" onChange={e=>setForm({...form,ubication:e.target.value})} className="filtro__titulo__selects">
                <option value={""}>--Seleccione--</option>
                {region && region.map(singleRegion => (
                  <option key={singleRegion.region_id} value={singleRegion.region_type}>{singleRegion.region_type}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="filtro__titulo">
            <div>Marca</div>
            <div>
              <select
                id="modelo"
                className="filtro__titulo__selects"
                value={form.brand}
                onChange={(e) => {
                  setForm((state) => ({ ...state, brand: e.target.value }));
                }}
              >
                <option value={""}>Escoge tu marca</option>
                {marcas.data.content.map((marca) => {
                  return (
                    <option key={marca.make_id} value={marca.make_type}>
                      {marca.make_type}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="filtro__titulo">
            <div>Modelo</div>
            <div>
              <select
                className="filtro__titulo__selects"
                disabled={!form.brand.length}
                onChange={(e) => {
                  setForm((state) => ({ ...state, model: e.target.value }));
                }}
              >
                <option value={""}>Escoge tu modelo</option>
                {marcas.data.content
                  .filter((marca) => marca.make_type == form.brand)
                  .map((modelos) => {
                    return modelos.make_models.map((modelos) => (
                      <option key={modelos.model_id} value={modelos.model_type}>
                        {modelos.model_type}
                      </option>
                    ));
                  })}
              </select>
            </div>
          </div>
          <div className="filtro__titulo">
            <div>Año</div>
            <div>
              <select value={form.year_from} onChange={e=>setForm({...form,year_from:e.target.value})} name="year_from" className="filtro__titulo__selects">
                <option value={""}>Desde</option>
                <option value="2010">2010</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </select>
            </div>
            <div>
              <select value={form.year_to} onChange={e=>setForm({...form,year_to:e.target.value})} name="year_to" className="filtro__titulo__selects">
                <option value={""}>Hasta</option>
                <option value="2010">2010</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
              </select>
            </div>
          </div>
          <div className="filtro__titulo">
            <div>Categoria</div>
            <div>
              <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} name="category" className="filtro__titulo__selects">
                <option value={""}>Escoge tu Categoria</option>
                {<Categoria />}
              </select>
            </div>
          </div>

          <hr />

          <div className="filtro__titulo">
            <div>Precio</div>
            <div>
              <input
                type="text"
                className="filtro__titulo__inputs"
                placeholder="S/. 10000"
                onChange={e=>setForm({...form,price_from:e.target.value})}
              />
            </div>
            <div>a</div>
            <div>
              <input
                type="text"
                className="filtro__titulo__inputs"
                placeholder="S/. 500000"
                onChange={e=>setForm({...form,price_to:e.target.value})}
              />
            </div>
          </div>

          <hr />
          <div className="filtro__titulo">
            <div>Kilometraje</div>
            <div>
              <input
                type="text"
                className="filtro__titulo__inputs"
                placeholder="0"
                onChange={e=>setForm({...form,kilometer_from:e.target.value})}
              />
            </div>
            <div>a</div>
            <div>
              <input
                type="text"
                className="filtro__titulo__inputs"
                placeholder="200.000"
                onChange={e=>setForm({...form,kilometer_to:e.target.value})}
              />
            </div>
          </div>
          <div className="filtro__filtrar">
            <button>BUSCAR</button>
          </div>
        </form>
      </div>

      <div className="container">

        { dataSearch.map((car)=>{
        return  <Car {...car}/>
        })
        }
      </div>
    </div>
  );
};

export default BcrAuto;
