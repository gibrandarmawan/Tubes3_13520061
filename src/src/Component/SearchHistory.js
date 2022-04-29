import '../Styles/SearchHistory.css';
import React, { useState } from 'react';
import getResult from '../Service/getResult';
import ReactDOM from 'react-dom';

const SearchHistory = () => {
    const[cari,updateCari] = useState('');
    const[isResponseSuccess,updateResponseSuccess]= useState(false);
    const[dataShow,updateDataShow]= useState([]);
    const[messageStatus,updateMessageStatus] = useState('');

    const handleInput = (event) => {
        updateCari(event.target.value)
    };
    const handleSearch = async (event) => {
        event.preventDefault();
        updateResponseSuccess(false)

        const data = {
            query: cari,
        }

        const result = await getResult(data)
        const theData = result.data
        console.log('hasil dari getResult',theData)

        if(result.data.message != null){
            updateMessageStatus(result.data.message)
            updateResponseSuccess(false)
        }
        else{
            const resultData = theData.map(person => (
                <p className='Result-Border'>
                    {person.tanggal} {person.nama}-{person.penyakit}-{person.status}-{person.persentase}%
                </p>
            ))
            updateDataShow(resultData)
            console.log('hasil dari resultData',resultData)
            updateResponseSuccess(true)
        }
        
    }

    return (
        <>
            <img src={process.env.PUBLIC_URL+"dna.png"} className="App-logo" alt="logo"/>
            <div className='center'>
                <body className='App-body'>
                    <div className='Header'>
                        <h3 >
                                Pencarian Hasil         
                        </h3>
                    </div>
                    <form className='Border-Inv' onSubmit={handleSearch}>
                        <div>
                            <input className='Input' type="text" name="cari" value = {cari} onChange={handleInput} placeholder="<Tanggal> <Penyakit>" /> 
                        </div>
                        <p className='Input-Example'>
                        Tanggal dalam format : DD-MM-YYYY, DD/MM/YYYY, DD MM YYYY, atau DD YYYY <br></br>
                        Input dapat berupa tanggal saja, penyakit saja, atau keduanya
                        </p>
                        <div className='submitField'>
                            <button className='button button1'>
                            Cari
                            </button>
                        </div>
                    </form>
                    
                    <div className='App-Result' hidden={!isResponseSuccess} id="HasilCari" >
                        <hr></hr>
                        {dataShow}
                    </div>
                    <div className='App-Result' hidden={isResponseSuccess} id="HasilCari" >
                        <strong>{messageStatus}</strong>
                    </div>
                </body>
            </div>
        </>
    );
}

export default SearchHistory;