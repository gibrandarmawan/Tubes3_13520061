import '../Styles/dataFill.css'
import postTest from '../Service/postTest';
import React, { useState } from 'react';
import Select from 'react-select';

const DataFill = (props) => {

    const[pengguna,updateName] = useState('');
    const[ill,updateIll] = useState('');
    const[dna,updateDna] = useState('');

    const[resultPengguna,updateResultName] = useState('');
    const[resultIll,updateResultIll] = useState('');
    const[presentase,updatePresentase] = useState(0);
    const[status,updateStatus] = useState("");
    const[message,updateMessage] = useState("");
    const[KMP,updateKMP] = useState("");

    const[isResponseSuccess,updateResponseSuccess]= useState(false);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const algoChoice =[
      {
        label : 'KMP', value:'true', 
      },
      {
        label : 'Boyer Moore', value:'false'
      },
    ];

    const handleInput = (event) => {
      switch(event.target.name){
        case "pengguna":
          updateName(event.target.value)
          break;
        case "penyakit":
          updateIll(event.target.value)
          break;
        default:
          break;
      }
    };
    const onSubmitClick = async (event) =>{
      updateResultName("")
      updateResultIll("")
      updatePresentase(0)
      updateStatus("")
      updateResponseSuccess(false)
      updateMessage("")
      if(pengguna === '' || ill === '' || dna === '' || KMP === ''){
        alert('Data tidak boleh kosong')
      }else{
      event.preventDefault();
      console.log('fungsi dipanggil',pengguna,ill,dna)
      const datas = {
        nama: pengguna,
        dna: dna,
        penyakit: ill,
        algo: KMP,
      }
      const checkResult = await postTest(datas)
      console.log('hasil dari postTest',checkResult)
      if (checkResult.status == 206){
        updateMessage(checkResult.data.message)
        updateResponseSuccess(false)
      }
      else if (checkResult.status == 200){
        updateResultName(checkResult.data.nama)
        updateResultIll(checkResult.data.penyakit)
        updatePresentase(checkResult.data.persentase)
        updateStatus(checkResult.data.status)
        updateResponseSuccess(true)
      }
      else {
        alert('Server Error')
      }

    }
    };
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
    
    return ( 
      <>
        <form onSubmit={onSubmitClick}>
          <div className='Option-txt'>
            <p className='txt'>Nama Pengguna : </p>
            <input className='Input' type="text" name="pengguna" value = {pengguna} onChange={handleInput} placeholder="nama..." />
          </div>
          <div className='Option-txt'>
            <p className='txt'>Sequence DNA : </p>
            <input className='Input' type="file" onChange={setUploadFile} />
          </div>
          <div className='Option-txt'>
            <p className='txt'>Prediksi Penyakit : </p>
            <input className='Input' type="text" name="penyakit" value = {ill} onChange={handleInput} placeholder="penyakit..." />
          </div>
          <Select className='ChoiceField' options={algoChoice} onChange={(e)=>updateKMP(e.value)}/>
          <div className='submitField'>
            <button className='button button1'>
              Submit
            </button>
          </div>
        </form>
        <hr></hr>
        <p className='App-Result'>
          <strong>Hasil Tes</strong>
        </p>
        <p className='App-Result' hidden={!isResponseSuccess} id="HasilTest" >
          <strong>{date} - {resultPengguna} - {resultIll} - {presentase}% - {status}</strong> 
        </p>
        <p className='App-Result' hidden={isResponseSuccess} id="HasilTest" >
          <strong>{message}</strong> 
        </p>
      </>
    )
}

export default DataFill;
