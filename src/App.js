import React, { useState, useEffect } from 'react';
import './App.css';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ListBox } from 'primereact/listbox';
import { Divider } from 'primereact/divider';
import { Sidebar } from 'primereact/sidebar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const App = () => {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({});
  const [currentDate, setCurrentDate] = useState(new Date());
  const [lastQueries, setLastQueries] = useState([]);
  const [error, setError] = useState('');
  const [queryDateTime, setQueryDateTime] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSidebarView, setShowSidebarView] = useState(false);
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [savedData, setSavedData] = useState([]);

  const handleInputChange = (event) => {
    setCep(event.target.value);
  };

  const validateCepFormat = (cep) => {
    return /^\d{8}$/.test(cep);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateCepFormat(cep)) {
      setError('CEP inválido');
      return;
    }
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('CEP não encontrado');
        }
      })
      .then((data) => {
        if (data.erro) {
          setError('CEP não encontrado');
          setAddress({});
        } else {
          setAddress(data);
          setLastQueries([...lastQueries, { cep: data.cep, dateTime: new Date() }]);
          setError('');
        }
      })
      .catch((error) => {
        console.error(error);
        setAddress({});
        setError('CEP não encontrado');
      });
  };

  const handleNumberChange = (event) => {
    setNumero(event.target.value);
  };

  const handleComplementChange = (event) => {
    setComplemento(event.target.value);
  };

  const saveData = () => {
    const data = {
      cep: address.cep,
      numero: numero,
      complemento: complemento,
      logradouro: address.logradouro,
      bairro: address.bairro,
      localidade: address.localidade,
      uf: address.uf
    };
    console.log(data);
    setSavedData([...savedData, data]);
    setAddress((prevAddress) => ({
      ...prevAddress,
      numero: numero,
      complemento: complemento,
    }));
    setShowSidebar(false);
    navigator.vibrate(200)
  };

  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div id="consulta" className='container-sm rounded border border-1 shadow-sm my-2 py-5 px-0 d-flex flex-column align-items-center'>
      <h2><strong>Consulta de CEP</strong></h2>
      <p className='d-flex flex-row align-items-center'>
        <i className='pi pi-clock mx-1'></i>
        {currentDate.toLocaleString()}
      </p>
      <form className='container-sm d-flex flex-row justify-content-center my-3 p-1' onSubmit={handleSubmit}>
        <span className="p-float-label">
          <InputText id="cep" className='me-1' value={cep} onChange={handleInputChange} required />
          <label htmlFor="cep">Digite o CEP</label>
        </span>
        <Button className="ms-1" label="Consultar" severity='success' icon="pi pi-search" />
      </form>
      <Divider/>
      {error && <p>{error}</p>}.
      {Object.keys(address).length > 0 && (
        <div className='container-sm d-flex flex-column flex-lg-row justify-content-evenly align-items-top'>
          <div className='mt-3 p-3'>
            <p className='m-0'>
              <strong>CEP:</strong> {address.cep}
            </p>
            <p className='m-0'>
              <strong>Logradouro:</strong> {address.logradouro}
            </p>
            <p className='m-0'>
              <strong>Bairro:</strong> {address.bairro}
            </p>
            <p className='m-0'>
              <strong>Cidade:</strong> {address.localidade}
            </p>
            <p className='m-0'>
              <strong>Estado:</strong> {address.uf}
            </p>
            <Button label="Salvar Endereço" icon="pi pi-save" className="w-100 p-button-primary mt-2" onClick={() => setShowSidebar(true)} />
          </div>
          {lastQueries.length > 0 && (
            <div className='mt-3 p-3 d-flex flex-column align-items-center'>
              <h4>Últimas consultas:</h4>
              <ListBox
                options={lastQueries.map((query) => ({
                  ...query,
                  label: `${query.cep} - ${query.dateTime.toLocaleString()}`
                }))}
                optionLabel="label"
                className="p-m-0 rounded"
                disabled
              />
            </div>
          )}
        </div>
      )}

      <Sidebar visible={showSidebar} onHide={() => setShowSidebar(false)}>
        <h5 className='mb-5'><strong>Complete o endereço</strong></h5>
        <form onSubmit={(e) => e.preventDefault()}>
          <span className="p-float-label">
            <InputText  className="form-control" id="numberInput" value={numero} onChange={handleNumberChange} autoFocus required />
            <label htmlFor="numberInput"> Número:</label>
          </span>
          <span className="p-float-label my-4">
            <InputText className="form-control" id="complementInput" value={complemento} onChange={handleComplementChange} />
            <label htmlFor="complementInput">Complemento:</label>
          </span>
          <Button className='me-1' label='Salvar' severity='success' icon="pi pi-save" onClick={saveData}/>
          <Button className='ms-1' label='Cancelar' severity='danger' icon="pi pi-times" onClick={() => setShowSidebar(false)}/>
        </form>
      </Sidebar>

      <Sidebar visible={showSidebarView} onHide={() => setShowSidebarView(false)}>
        <h5 className='mb-5'><strong>Visualizar Dados</strong></h5>
        <div className="d-flex flex-column justify-content-between align-items-start">
          <p>
            <strong>CEP:</strong> {address.cep}
          </p>
          <p>
            <strong>Logradouro:</strong> {address.logradouro}
          </p>
          <p>
            <strong>Número:</strong> {address.numero}
          </p>
          <p>
            <strong>Complemento:</strong> {address.complemento}
          </p>
          <p>
            <strong>Bairro:</strong> {address.bairro}
          </p>
          <p>
            <strong>Cidade:</strong> {address.localidade}
          </p>
          <p>
            <strong>Estado:</strong> {address.uf}
          </p>
        </div>
      </Sidebar>
      {savedData.length > 0 && (
        <>
          <h5 className='mt-5'>Endereços Salvos</h5>
          <DataTable
            value={savedData}
            className="m-auto"
          >
            <Column field="cep" header="CEP" />
            <Column field="uf" header="Estado" />
            <Column body={rowData => <Button label='Visualizar' icon="pi pi-file" onClick={() => { setAddress(rowData); setShowSidebarView(true); }}/>} />
          </DataTable>
        </>
      )}
    </div>
  );
};

export default App;
