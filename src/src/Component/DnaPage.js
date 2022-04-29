import '../Styles/DnaPage.css';
import DataFill from './DataFill';


const DnaPage = () => {
  return (
    <>
      <img src={process.env.PUBLIC_URL+"dna.png"} className="App-logo" alt="logo"/>
      <div className='center'>
        <body className='App-body'>
          <h3 >
            Welcome to DNA Checker!
          </h3>
          <DataFill />
        </body>
      </div>
    </>
  );
}

export default DnaPage;