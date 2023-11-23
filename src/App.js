import React, { useState } from 'react';
import * as math from 'mathjs';

const Calculator = () => {
  const [history, setHistory] = useState([]); 
  const [isDarkModeActive, setDarkMode] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  

  const handleHistory = () => {
    setShowHistory((prev)=>!prev)
  };
  const handleDarkMode = () => {
    setDarkMode(true);
  };
  const handleLightMode = () => {
    setDarkMode(false);
  };
  const handleButtonClick = (value) => {
    if(input.endsWith('.') && value === '.')
      return
    if(input.endsWith(')') && value !== '×')
      setInput((prevInput)=>prevInput+'×'+ value);
    else
      setInput((prevInput) => prevInput + value);
  };

  const clearHistory = () => {setHistory([]);}

  const handleCalculate = () => {
    try {
      let prevInput=input;
      setResult(prevInput);
      let result =math.evaluate(input.replace('×','*').replace('÷','/')).toString();
      setInput(result);
      if(prevInput !== result) {
        if(history.length === 3){
          history.shift();
          history.push([prevInput,result]);
        }
        else{
          history.push([prevInput,result]);
        }
      }
    } catch (error) {
      setResult('Error');
    }
  };

  const handleParenthesis = () => { 
    if(input.endsWith('('))
      setInput((prevInput)=>prevInput+'(');
    else if(input.split("(").length - 1 > input.split(")").length - 1)
      setInput((prevInput)=>prevInput+')');
    else if(input.endsWith(')') || ['0','1','2','3','4','5','6','7','8','9'].includes(input.charAt(input.length-1)))
      setInput((prevInput)=>prevInput+'×(');
    else
      setInput((prevInput)=>prevInput+'(');

  };    
  
  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleBackspace = () => {
    setInput((prevInput) => prevInput.substring(0,prevInput.length-1));
  };

  const handleKeyDown = (event) => {
    const key = event.key;

    if ((key >= '0' && key <= '9') || ['+', '(', ')', '-', '*', '/', '.', 'Enter', 'Backspace'].includes(key)) {
      switch(key){
        case 'Enter':
          handleCalculate();
          break;
        case 'Backspace':
          handleBackspace();
          break;
        case '(' || ')':
          handleParenthesis();
          break;
        case '*':
          handleButtonClick('×');
          break;
        case '/':
          handleButtonClick('÷');
          break;
        default:
          handleButtonClick(key);
          break;
      }
    } else if (key === 'Escape') {
      handleClear();
    }
  };

 
  return (
    
    <div className={`container ${isDarkModeActive ? "dark-mode" : ""}`} onKeyDown={(key)=>handleKeyDown(key)}>
        <div className="light-svg">
        <svg width="390" height="490" viewBox="0 0 423 507" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_f_2_13)">
        <path d="M697.404 -24.1603C819.447 325.921 820.325 583.616 315.636 503.575C-7.67762 350.43 -155.022 587.082 -481.876 488.638C-246.465 -103.199 -160.092 354.76 45.0564 266.06C300.809 155.48 136.128 -793.125 697.404 -24.1603Z" fill="url(#paint0_linear_2_13)"/>
        </g>
        <defs>
        <filter id="filter0_f_2_13" x="-845.876" y="-686.261" width="1974.7" height="1568.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="182" result="effect1_foregroundBlur_2_13"/>
        </filter>
        <linearGradient id="paint0_linear_2_13" x1="641.33" y1="-233.083" x2="-123.056" y2="690.561" gradientUnits="userSpaceOnUse">
        <stop offset="0.0238694" stop-color="#9EE8FF"/>
        <stop offset="0.277847" stop-color="#5ACEFF"/>
        <stop offset="0.650876" stop-color="#79AFFF"/>
        <stop offset="1" stop-color="#2D5FDE"/>
        </linearGradient>
        </defs>
        </svg>
        </div>
        <div className="dark-svg"><svg width="390" height="490" viewBox="0 0 423 507" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_2_78)">
          <path d="M697.404 -24.1603C819.447 325.921 820.325 583.616 315.636 503.575C-7.67762 350.43 -155.022 587.082 -481.876 488.638C-246.465 -103.199 -160.092 354.76 45.0564 266.06C300.809 155.48 136.128 -793.125 697.404 -24.1603Z" fill="url(#paint0_linear_2_78)"/>
          </g>
          <defs>
          <filter id="filter0_f_2_78" x="-845.876" y="-686.261" width="1974.7" height="1568.5" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feGaussianBlur stdDeviation="182" result="effect1_foregroundBlur_2_78"/>
          </filter>
          <linearGradient id="paint0_linear_2_78" x1="641.33" y1="-233.083" x2="-123.056" y2="690.561" gradientUnits="userSpaceOnUse">
          <stop offset="0.0238694" stop-color="#42869B"/>
          <stop offset="0.277847" stop-color="#2A7DA1"/>
          <stop offset="0.650876" stop-color="#224E91"/>
          <stop offset="1" stop-color="#00123F"/>
          </linearGradient>
          </defs>
          </svg>
        </div>
      <div className="top-nav">
        <div className="toggle">
          <div className="current-mode"></div>
          <div>
            <button onClick={handleLightMode} className="light-mode-button"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2_59)">
            <path d="M14.8687 20.4445C13.39 20.4445 11.9717 19.8571 10.9261 18.8114C9.88041 17.7658 9.29297 16.3475 9.29297 14.8687C9.29297 13.39 9.88041 11.9717 10.9261 10.9261C11.9717 9.88041 13.39 9.29297 14.8687 9.29297C16.3475 9.29297 17.7658 9.88041 18.8114 10.9261C19.8571 11.9717 20.4445 13.39 20.4445 14.8687C20.4445 16.3475 19.8571 17.7658 18.8114 18.8114C17.7658 19.8571 16.3475 20.4445 14.8687 20.4445ZM14.8687 22.3031C16.8405 22.3031 18.7314 21.5199 20.1256 20.1256C21.5199 18.7314 22.3031 16.8405 22.3031 14.8687C22.3031 12.897 21.5199 11.0061 20.1256 9.61185C18.7314 8.21764 16.8405 7.43437 14.8687 7.43437C12.897 7.43437 11.0061 8.21764 9.61185 9.61185C8.21764 11.0061 7.43437 12.897 7.43437 14.8687C7.43437 16.8405 8.21764 18.7314 9.61185 20.1256C11.0061 21.5199 12.897 22.3031 14.8687 22.3031ZM14.8687 0C15.1152 0 15.3516 0.0979078 15.5259 0.272185C15.7001 0.446462 15.798 0.682832 15.798 0.929297V4.64648C15.798 4.89295 15.7001 5.12932 15.5259 5.3036C15.3516 5.47787 15.1152 5.57578 14.8687 5.57578C14.6223 5.57578 14.3859 5.47787 14.2116 5.3036C14.0374 5.12932 13.9395 4.89295 13.9395 4.64648V0.929297C13.9395 0.682832 14.0374 0.446462 14.2116 0.272185C14.3859 0.0979078 14.6223 0 14.8687 0V0ZM14.8687 24.1617C15.1152 24.1617 15.3516 24.2596 15.5259 24.4339C15.7001 24.6082 15.798 24.8445 15.798 25.091V28.8082C15.798 29.0547 15.7001 29.291 15.5259 29.4653C15.3516 29.6396 15.1152 29.7375 14.8687 29.7375C14.6223 29.7375 14.3859 29.6396 14.2116 29.4653C14.0374 29.291 13.9395 29.0547 13.9395 28.8082V25.091C13.9395 24.8445 14.0374 24.6082 14.2116 24.4339C14.3859 24.2596 14.6223 24.1617 14.8687 24.1617ZM29.7375 14.8687C29.7375 15.1152 29.6396 15.3516 29.4653 15.5259C29.291 15.7001 29.0547 15.798 28.8082 15.798H25.091C24.8445 15.798 24.6082 15.7001 24.4339 15.5259C24.2596 15.3516 24.1617 15.1152 24.1617 14.8687C24.1617 14.6223 24.2596 14.3859 24.4339 14.2116C24.6082 14.0374 24.8445 13.9395 25.091 13.9395H28.8082C29.0547 13.9395 29.291 14.0374 29.4653 14.2116C29.6396 14.3859 29.7375 14.6223 29.7375 14.8687ZM5.57578 14.8687C5.57578 15.1152 5.47787 15.3516 5.3036 15.5259C5.12932 15.7001 4.89295 15.798 4.64648 15.798H0.929297C0.682832 15.798 0.446462 15.7001 0.272185 15.5259C0.0979078 15.3516 0 15.1152 0 14.8687C0 14.6223 0.0979078 14.3859 0.272185 14.2116C0.446462 14.0374 0.682832 13.9395 0.929297 13.9395H4.64648C4.89295 13.9395 5.12932 14.0374 5.3036 14.2116C5.47787 14.3859 5.57578 14.6223 5.57578 14.8687ZM25.3828 4.35468C25.557 4.52895 25.6549 4.76528 25.6549 5.0117C25.6549 5.25811 25.557 5.49444 25.3828 5.66871L22.7548 8.29862C22.6684 8.3849 22.5658 8.45332 22.453 8.49997C22.3401 8.54661 22.2192 8.57058 22.0971 8.57049C21.8505 8.57032 21.6141 8.47219 21.4398 8.29769C21.3535 8.21129 21.2851 8.10874 21.2385 7.9959C21.1918 7.88305 21.1679 7.76213 21.1679 7.64002C21.1681 7.39342 21.2662 7.15699 21.4407 6.98274L24.0688 4.35468C24.2431 4.18047 24.4794 4.0826 24.7258 4.0826C24.9722 4.0826 25.2085 4.18047 25.3828 4.35468ZM8.29676 21.4407C8.47098 21.615 8.56885 21.8513 8.56885 22.0977C8.56885 22.3442 8.47098 22.5805 8.29676 22.7548L5.66871 25.3828C5.49344 25.5521 5.2587 25.6458 5.01504 25.6436C4.77138 25.6415 4.5383 25.5438 4.36601 25.3715C4.19371 25.1992 4.09597 24.9661 4.09386 24.7225C4.09174 24.4788 4.18541 24.2441 4.35468 24.0688L6.98274 21.4407C7.15701 21.2665 7.39333 21.1687 7.63975 21.1687C7.88617 21.1687 8.12249 21.2665 8.29676 21.4407ZM25.3828 25.3828C25.2085 25.557 24.9722 25.6549 24.7258 25.6549C24.4794 25.6549 24.2431 25.557 24.0688 25.3828L21.4407 22.7548C21.2715 22.5795 21.1778 22.3448 21.1799 22.1011C21.182 21.8574 21.2798 21.6244 21.4521 21.4521C21.6244 21.2798 21.8574 21.182 22.1011 21.1799C22.3448 21.1778 22.5795 21.2715 22.7548 21.4407L25.3828 24.0688C25.557 24.2431 25.6549 24.4794 25.6549 24.7258C25.6549 24.9722 25.557 25.2085 25.3828 25.3828ZM8.29676 8.29862C8.12249 8.47284 7.88617 8.57071 7.63975 8.57071C7.39333 8.57071 7.15701 8.47284 6.98274 8.29862L4.35468 5.66871C4.26593 5.58299 4.19513 5.48044 4.14643 5.36706C4.09772 5.25369 4.07209 5.13174 4.07102 5.00835C4.06994 4.88496 4.09346 4.76259 4.14018 4.64839C4.18691 4.53418 4.25591 4.43042 4.34317 4.34317C4.43042 4.25591 4.53418 4.18691 4.64839 4.14018C4.76259 4.09346 4.88496 4.06994 5.00835 4.07102C5.13174 4.07209 5.25369 4.09772 5.36706 4.14643C5.48044 4.19513 5.58299 4.26593 5.66871 4.35468L8.29676 6.98274C8.3833 7.06906 8.45197 7.17161 8.49881 7.28451C8.54566 7.39741 8.56978 7.51844 8.56978 7.64068C8.56978 7.76291 8.54566 7.88395 8.49881 7.99685C8.45197 8.10975 8.3833 8.2123 8.29676 8.29862Z" fill-opacity="0.8" />
            </g>
            <defs>
            <clipPath id="clip0_2_59">
            <rect width="29.7375" height="29.7375" fill="white"/>
            </clipPath>
            </defs>
            </svg>
            </button>
          </div>
          <div>
            <button onClick={handleDarkMode} className="dark-mode-button"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.1166 15.973C24.2769 16.196 23.4119 16.3088 22.5431 16.3088C19.8977 16.3088 17.4134 15.2803 15.5473 13.4143C14.322 12.1819 13.441 10.6498 12.9923 8.97077C12.5436 7.29175 12.5427 5.52445 12.9899 3.84502C13.0458 3.63504 13.0454 3.41407 12.9889 3.20427C12.9324 2.99447 12.8217 2.80322 12.6679 2.6497C12.5141 2.49619 12.3227 2.38581 12.1128 2.32963C11.9029 2.27346 11.6819 2.27346 11.4721 2.32965C9.36956 2.88993 7.45137 3.99325 5.90991 5.52891C1.08004 10.3588 1.08004 18.2206 5.90991 23.053C7.05793 24.2074 8.42351 25.1227 9.92761 25.7458C11.4317 26.369 13.0445 26.6877 14.6726 26.6834C16.3002 26.688 17.9126 26.3696 19.4163 25.7466C20.92 25.1236 22.2852 24.2085 23.4327 23.0542C24.9695 21.5124 26.0734 19.5932 26.6332 17.4896C26.6888 17.2797 26.6884 17.0589 26.6319 16.8492C26.5754 16.6396 26.4649 16.4484 26.3113 16.2949C26.1578 16.1413 25.9666 16.0308 25.757 15.9743C25.5473 15.9178 25.3265 15.9174 25.1166 15.973ZM21.6819 21.3022C20.7637 22.2254 19.6716 22.9573 18.4686 23.4557C17.2657 23.954 15.9759 24.2088 14.6738 24.2053C13.3713 24.2085 12.081 23.9535 10.8777 23.455C9.67437 22.9565 8.5818 22.2243 7.66318 21.3009C3.79978 17.4363 3.79978 11.1468 7.66318 7.28218C8.40972 6.53648 9.2716 5.91601 10.2156 5.44465C10.0775 7.22774 10.3259 9.01964 10.9439 10.6979C11.5619 12.3761 12.5349 13.9012 13.7965 15.1688C15.0614 16.4344 16.586 17.4101 18.2649 18.0286C19.9439 18.6471 21.7371 18.8935 23.5207 18.7509C23.0468 19.6934 22.4261 20.5545 21.6819 21.3022Z" fill-opacity="0.8"/>
            </svg>
            </button>
          </div>
        </div>
        <button onClick={handleHistory} className={`history-button ${showHistory ? "history-button-pressed" : ""}`}><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.7061 7.99805H14.2969C14.168 7.99805 14.0625 8.10352 14.0625 8.23243V16.2979C14.0625 16.374 14.0977 16.4443 14.1592 16.4883L19.002 20.0244C19.1074 20.1006 19.2539 20.0801 19.3301 19.9746L20.168 18.832C20.2471 18.7236 20.2236 18.5772 20.1182 18.5039L15.9404 15.4834V8.23243C15.9404 8.10352 15.835 7.99805 15.7061 7.99805ZM22.1455 10.2012L26.7393 11.3232C26.8857 11.3584 27.0293 11.2471 27.0293 11.0977L27.0527 6.36622C27.0527 6.16993 26.8272 6.0586 26.6748 6.18165L22.0576 9.78809C22.0227 9.81509 21.9962 9.85138 21.981 9.89281C21.9658 9.93423 21.9626 9.97909 21.9718 10.0222C21.981 10.0654 22.0021 10.1051 22.0329 10.1367C22.0636 10.1684 22.1026 10.1907 22.1455 10.2012ZM27.0586 19.0225L25.3975 18.4512C25.3396 18.4313 25.2762 18.4349 25.2209 18.4612C25.1656 18.4875 25.1227 18.5344 25.1016 18.5918C25.0459 18.7412 24.9873 18.8877 24.9258 19.0342C24.4043 20.2676 23.6572 21.3779 22.7022 22.3301C21.7577 23.2775 20.6384 24.0327 19.4063 24.5537C18.1299 25.0934 16.7579 25.3704 15.3721 25.3682C13.9717 25.3682 12.6152 25.0957 11.3379 24.5537C10.1058 24.0327 8.98647 23.2775 8.042 22.3301C7.08985 21.3779 6.34278 20.2676 5.81836 19.0342C5.28169 17.7571 5.00673 16.3853 5.00977 15C5.00977 13.5996 5.28223 12.2402 5.82422 10.9629C6.34571 9.7295 7.09278 8.61915 8.04785 7.667C8.99233 6.71959 10.1116 5.96443 11.3438 5.44336C12.6152 4.90137 13.9746 4.62891 15.375 4.62891C16.7754 4.62891 18.1318 4.90137 19.4092 5.44336C20.6413 5.96443 21.7606 6.71959 22.7051 7.667C23.0039 7.96876 23.2852 8.28223 23.543 8.61329L25.2949 7.24219C22.9893 4.29493 19.4004 2.39942 15.3691 2.40235C8.34961 2.40528 2.71289 8.10645 2.78321 15.1289C2.85352 22.0283 8.46387 27.5977 15.375 27.5977C20.8096 27.5977 25.4385 24.1524 27.2022 19.3272C27.2461 19.2041 27.1816 19.0664 27.0586 19.0225Z" fill-opacity="0.8"/>
        </svg>
        </button>
      </div>
      <div className="output">
        <div className="current-output" name="current"><input value={input} type="text"/></div>
        <div className="previous-output" name="prev"><input value={result} type="text" readOnly/></div>
      </div>
      <div className="keyboard-container">  
        <div className={`keyboard-grid ${showHistory ? "keyboard-hidden" : ""}`}>
        <button onClick={handleBackspace} className="delete-button">
        <svg xmlns="http://www.w3.org/2000/svg"   viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-delete"><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></svg>
        </button> 
        <div className="span-three">
          <button onClick={handleClear}>AC</button>
          <button onClick={handleParenthesis}>( )</button>
          <button onClick={() => handleButtonClick('%')}>%</button>
        </div>
        <button onClick={() => handleButtonClick('7')}>7</button>
        <button onClick={() => handleButtonClick('8')}>8</button>
        <button onClick={() => handleButtonClick('9')}>9</button>
        <button onClick={() => handleButtonClick('4')}>4</button>
        <button onClick={() => handleButtonClick('5')}>5</button>
        <button onClick={() => handleButtonClick('6')}>6</button>
        <button onClick={() => handleButtonClick('1')}>1</button>
        <button onClick={() => handleButtonClick('2')}>2</button>
        <button onClick={() => handleButtonClick('3')}>3</button>
        <button onClick={() => handleButtonClick('.')}>.</button>
        <button onClick={() => handleButtonClick('0')}>0</button>
        <button onClick={() => handleButtonClick('00')}>00</button>
        <div className="span-row-five">
          <button onClick={() => handleButtonClick('÷')}>÷</button>
          <button onClick={() => handleButtonClick('×')}>×</button>
          <button onClick={() => handleButtonClick('-')}>-</button>
          <button onClick={() => handleButtonClick('+')}>+</button>
        <button id="equal" onClick={handleCalculate}>=</button></div>
        </div>
        <div className={`history-container ${showHistory ? "history-show" : ""}`}>
          <button onClick={clearHistory}>TEMİZLE</button>
          <ul>
          {history.map(item=> (
          <li>
            <span className='history-prev'>{item[0]}</span>
            <span className='history-result'>= {item[1]}</span>
          </li>
          ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


function App() {
  return (
    <Calculator/>
    
  );
}

export default App;
