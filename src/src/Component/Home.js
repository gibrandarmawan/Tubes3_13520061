//import libs
import { useState, useEffect } from 'react';
import '../Styles/home.css';

// import components
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

// const ORIGINAL_LINES = ["DNA-Matching"];
const DESCRIPTION_LINES = [
  "Periksa Penyakit Anda Sebelum Terlambat di RS Borromeus",
  "Menggunakan Teknologi DNA Sring Matching"
]

const totalChars = DESCRIPTION_LINES.reduce(
  (chars, line) => chars + line.length,
  0
);

function promiseDelay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getPartialLines(lines, charCount) {
  const copiedLines = [];
  let remainingChars = charCount;
  for (const line of lines) {
    if (remainingChars <= line.length) {
      copiedLines.push(line.slice(0, remainingChars));
      break;
    }
    remainingChars -= line.length;
    copiedLines.push(line);
  }
  return copiedLines;
}


const Home = () => {
  const [lines, setLines] = useState([""]);

  useEffect(() => {
    async function doTyping() {
      for (let typedChars = 0; typedChars <= totalChars; typedChars++) {
        await promiseDelay(25);
        setLines(getPartialLines(DESCRIPTION_LINES, typedChars));
      }
    }
    doTyping();
  }, []);

  
  return (
    <>
      <div className="home">
        <Row className="content">
          <Col xs lg="4">
            <span id = "first_landing_text"></span> <br/>
            <span id = "second_landing_text"></span>
              {lines.map((line, _) => (
              <p>
                {line}
              </p>
            ))}
          </Col>
        </Row>
        <img src={process.env.PUBLIC_URL+"dna.png"} className="App-logo" alt="logo"/>
      </div>
    </>
  );
}
 
export default Home;