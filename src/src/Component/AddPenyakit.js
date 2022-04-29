import '../Styles/AddPenyakit.css';
import React, { useState } from 'react';
import postDisease from '../Service/postDisease';

const AddPenyakit = () => {
    const[ill,updateIll] = useState('');
    const[dna,updateDna] = useState('');
    const[messageStatus,updateMessageStatus] = useState('');
    const[isReponseSuccess,updateResponseSuccess]= useState(false);

    const setUploadFile = (event) =>{
        event.preventDefault();
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            console.log(text);
            updateDna(text);
        };
        reader.readAsText(event.target.files[0]);
  
    }
    const handleIll = (event) => {
        updateIll(event.target.value)
    }
    const handleSubmit = async(event) => {
        if(ill === '' || dna === ''){
            alert('Data tidak boleh kosong')
        }
        event.preventDefault();
        console.log(dna,ill)
        const datas = {
            dna: dna,
            penyakit: ill,
        }
        const result = await postDisease(datas);
        if (result.status !== 200){
            updateMessageStatus('Data tidak valid')
            updateResponseSuccess(false)
        }
        else{
            updateMessageStatus(result.data.message)
            updateResponseSuccess(true)
        }

    } 
    return (
    <>
        <img src={process.env.PUBLIC_URL+"dna.png"} className="App-logo" alt="logo"/>
        <div className='center'>
            <body className='App-body'>
                <h3 >
                Tambahkan Penyakit
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className='Option-txt'>
                        <p className='txt'>Nama Penyakit : </p>
                        <input className='Input' type="text" name="penyakit" value = {ill} onChange={handleIll} placeholder="penyakit..." />
                    </div>
                    <div className='Option-txt'>
                        <p className='txt'>Sequence DNA : </p>
                        <input className='Input' type="file" onChange={setUploadFile} />
                    </div>
                    <div className='submitField'>
                        <button className='button button1'>
                        Submit
                        </button>
                    </div>
                </form>
                <p className='App-Result' hidden={!isReponseSuccess} id="HasilTest" >
                    <strong>{messageStatus}</strong>
                </p>
            </body>
        </div>
    </>
  );
}

export default AddPenyakit;