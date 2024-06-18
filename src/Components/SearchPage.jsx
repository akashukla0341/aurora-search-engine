import React, { useContext, useState, useEffect } from 'react';
import Functionality from './Functionality';
import { Logincontext } from '../App';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const SearchPage = ({query,setIsAuthenticated}) => {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState();
  const [search, setSearch] = useState();
  const [loader, setLoader] = useState(null);
  const [start, setStart] = useState(1);
  const [num, setNum] = useState(10);
  const [data, setData] = useState([]);
  const logindata = useContext(Logincontext);

  useEffect(() => {
    if (logindata) {
      const firstName = logindata.email ? logindata.email.charAt(0).toUpperCase() : '';
      setFname(firstName);
      setEmail(logindata.email);
    }else{
      let key = localStorage.key(1)
      let data = localStorage.getItem(key);
      let existData = JSON.parse(data)
      setEmail(existData.email)
      setFname(existData.email.split("@")[0].charAt(0).toUpperCase())
    }
  }, [logindata]); 

  

  useEffect(()=>{
    setLoader(true)
    setTimeout(()=>{
      fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY1}&cx=${process.env.REACT_APP_API_KEY2}&q=${query}`)
    .then((res) => res.json()) 
    .then((data) => {
    setResult(data.searchInformation)
    setData(data.items)})
    .catch((error) => console.error('Error fetching data:', error)); 
      setSearch(query)
      setLoader(false)
    },1000)
  },[query])


  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const searchByVoice = () => {
    let speechSynthesis = window.speechSynthesis;
    let utterance = new SpeechSynthesisUtterance();
    utterance.text = "Speak";
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
    const recognition = new (window.webkitSpeechRecognition || window.SpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                const transcript = event.results[i][0].transcript;
                setSearch(transcript)
            } else {
                const interimTranscript = event.results[i][0].transcript;
                console.log('Interim result:', interimTranscript);
            }
        }
    };
    recognition.onerror = (event) => {
        console.error('Error occurred in recognition:', event.error);
    };
    recognition.start();
};

  const moreBtnSubmit = () => {
    const count = start + 10;
    setStart(count);
    setLoader(true); 
    setTimeout(() => {
        fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY1}&cx=${process.env.REACT_APP_API_KEY2}&q=${search}&start=${count}&num=${num}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.items);
              })
              .catch((error) => console.error('Error fetching data:', error));
              setLoader(false); 
    }, 1000);
};

const prevBtnSubmit = () => {
    const count = start - 10;
    setStart(count);
    setLoader(true); 
    setTimeout(() => {
        fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY1}&cx=${process.env.REACT_APP_API_KEY2}&q=${search}&start=${count}&num=${num}`)
            .then((res) => res.json())
            .then((data) => {
                setData(data.items);
              })
              .catch((error) => console.error('Error fetching data:', error));
              setLoader(false); 
    }, 1000);
};

  const handleSubmit = () => {
    setLoader(true)
    setTimeout(()=>{
      fetch(`https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY1}&cx=${process.env.REACT_APP_API_KEY2}&q=${search}`)
    .then((res) => res.json()) 
    .then((data) => setData(data.items))
    .catch((error) => console.error('Error fetching data:', error)); 
    setLoader(false)
    },1000)
}


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className='col-lg-2 col-md-2 col-12 text-end d-flex justify-content-end mb-3'>
            <Functionality fname={fname} email={email} setIsAuthenticated={setIsAuthenticated}/>
          </div>
          <div className='col-lg-2 col-md-2 col-12 text-center align-items-center mb-3 '>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPofIU2OXaHk_DNxD03UzPuZFgGUcIlHwDCQ&usqp=CAU" alt="Aurora" style={{ maxWidth: '80%', height: '70px',marginTop:"10px", mixBlendMode:"darken",cursor:"pointer" }} />
          </div>
          <div className='col-lg-6 col-md-6 col-12 d-flex align-items-center mb-3'>
            <input className="form-control shadow-none px-2" type="search" placeholder="enter your search" aria-label="Search" value={search} onChange={handleChange} style={{ backgroundColor: "#A3C9AA", border: "1px solid #294B29", borderRadius: "20px"}}/>
            <i className="fa-solid fa-magnifying-glass font-icons" onClick={handleSubmit} style={{cursor:"pointer"}}></i>
            <i className="fa-solid fa-microphone font-icons2" onClick={searchByVoice} style={{cursor:"pointer"}}></i>
          </div>
          <div className='col-lg-2 col-md-2 col-12 text-end d-flex justify-content-end mb-3'></div>
        </div>
      </div>
      <div className='container'>
          <div className='row custom-div align-items-center '>
            <div className='col-lg-8 col-md-10 col-sm-12 align-items-center text-justify'>
              {loader?<Loader/>:null}
              <div style={{marginBottom:"10px"}}>
              {result?`About ${result.formattedTotalResults} Results (${result.formattedSearchTime} seconds)`:""}
              </div>
            {data ? data.map((val, i) => (
              <div key={i}>
                <div>
                  {(val.pagemap && val.pagemap.cse_image && val.pagemap.cse_image[0]) || val.pagemap ? (
                    <img
                      src={val.pagemap && val.pagemap.cse_image && val.pagemap.cse_image[0] && val.pagemap.cse_image[0].src ? val.pagemap.cse_image[0].src : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPofIU2OXaHk_DNxD03UzPuZFgGUcIlHwDCQ&usqp=CAU"}
                      alt="site"
                      style={{ width: "30px", height: "30px", borderRadius: "20px" }}
                    />
                  ) : null}

                  {val.pagemap && val.pagemap.metatags && val.pagemap.metatags[0] && (
                    <span style={{color:"#EEEDEB"}}>
                      {val.pagemap.metatags[0]['og:site_name'] ?
                        val.pagemap.metatags[0]['og:site_name'] :
                        (val.pagemap.metatags[0]['og:title'] ? val.pagemap.metatags[0]['og:title'].substring(0, 20) : val.pagemap.metatags[0]['title'])
                      }
                    </span>
                  )}

                  {val.displayLink && (
                    <p style={{color:"#EEEDEB",marginLeft:"30px",marginTop:"-10px"}}>{val.displayLink}</p>
                  )}
                </div>
                <div style={{marginTop:"-10px"}}>
                  {val.formattedUrl && (
                    <Link to={val.formattedUrl} className='custom-link' target='_blank'>
                      {val.title && (
                        <h6 className='underline-hover'>{val.title}</h6>
                      )}
                    </Link>
                  )}
                  {val.snippet && <p style={{marginTop:"-5px"}}>{val.snippet}</p>}
                </div>
              </div>
            )):<Loader/>}
            </div>
          </div>
          </div>
          <div className="container-fluid">
    <div className="row justify-content-end" style={{ position: 'fixed', bottom: '0', right: '0', marginBottom: '10px', marginRight: '10px' }}>
        <div className='col-lg-12 col-md-12 col-sm-12'>
            <button type='button' className='btn btn-success btn-sm' onClick={prevBtnSubmit} disabled={start <= 1}>-10 Previous</button>
            <button type='button' className='btn btn-success btn-sm more' onClick={moreBtnSubmit} style={{marginLeft:"5px"}}>+10 More</button>
        </div>
    </div>
</div>

    </>
  );
};

export default SearchPage;
