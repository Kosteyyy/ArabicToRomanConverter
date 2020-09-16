function digitToRoman(base, digit, thousands = false) {
    //convert digit to roman 
    //base is array [1,5,10] in roman accoding to the category of number
    let romanStr = '';
    let overline = '';
    if (thousands) {
        overline = '\u0305';
    }
  
    //Rules
    if (digit > 0 && digit < 4) {
      for (let i = 1; i <= digit; i++) {
          romanStr += base[0] + overline;
      } 
    } else if (digit == 4) {
        romanStr = base[0] + overline + base [1] + overline;
    } else if (digit >= 5 && digit < 9) {
        romanStr = base[1] + overline
      for (let i = 6; i <= digit; i++) {
          romanStr += base[0] + overline;
      }
    } else if (digit == 9) {
        romanStr = base[0] + overline + base[2] + overline;
    }
    
    return romanStr;
}
  
function convertToRoman(num) {
    //this works correctly up to 3999. Greater numbers require underlined symbols.
    //bases 1,5,10 for categories
    const BASES = {units: ['I', 'V', 'X'], tens: ['X', 'L', 'C'], hundreds: ['C', 'D', 'M'], thousands: ['M', 'A', 'K']};
    //finding categories
    let roman = '';
    if (num > 3999999) {
        roman = "Can't calculate greater than 3999999";
    } else if (num < 4000) {
        roman = digitToRoman(BASES.thousands, Math.floor(num%10000/1000)) + digitToRoman(BASES.hundreds, Math.floor(num%1000/100)) + digitToRoman(BASES.tens, Math.floor(num%100/10)) + digitToRoman(BASES.units, num%10);
    } else {
        let thousands = Math.floor(num/1000);
        //thousands are overlined
        roman = digitToRoman(BASES.thousands, Math.floor(thousands%10000/1000), true) 
            + digitToRoman(BASES.hundreds, Math.floor(thousands%1000/100), true) 
            + digitToRoman(BASES.tens, Math.floor(thousands%100/10), true) 
            + digitToRoman(BASES.units, thousands%10, true);
        roman += digitToRoman(BASES.hundreds, Math.floor(num%1000/100))
            + digitToRoman(BASES.tens, Math.floor(num%100/10)) 
            + digitToRoman(BASES.units, num%10);            
    }
    
  
   return roman;
}

class ConverterToRoman extends React.Component {
    constructor() {
        super();
        this.state = { 
            romanNumber: "RomanNumber",
            arabicNumber: 0
        };

        this.numberValue = this.numberValue.bind(this);
        this.setNewNumber = this.setNewNumber.bind(this);
    }

    numberValue(e) {
        this.setState({
            arabicNumber: e.target.value
        });
        console.log("number changed to: " + this.state.arabicNumber);
    }

    setNewNumber(e) {
        console.log("SetNumber to: " + this.state.arabicNumber);
        let romanStr;
        if (this.state.arabicNumber.match(/\D/)) {
            romanStr = "Only digits allowed";
        } else {
        romanStr = convertToRoman(this.state.arabicNumber);
        }

        this.setState({
            romanNumber: romanStr
        });

        this._input.value = ""; // 3 Назначаем input value, поскольку мы назначили this._input ссылаться на input
        this._input.focus(); // 4 Фокус на инпут        
        e.preventDefault();
    }

    render() {
        return(
            <div className="ArabicConverter">
                <h1>Convert Arabic to Roman number</h1>
                <h2>{this.state.romanNumber}</h2>
                <form onSubmit={this.setNewNumber}>
                    <input 
                        ref={(el) => this._input = el}
                        onChange={this.numberValue} type="text" placeholder="Enter a number"></input>
                    <button type="submit">Convert</button>
                </form>
            </div>
        );
    }

}

ReactDOM.render(<ConverterToRoman />, document.getElementById('content'));