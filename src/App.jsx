/* for build use this:
import React from "react";
import ReactDOM from "react-dom"; */

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

class DisplayRoman extends React.Component {
    render() {
        return(
        <h2>{this.props.romanNumber}</h2>
        );
    }
}

class GetArabicNumber extends React.Component {
    constructor() {
        super();

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.getArabicNumber;
        console.log("Input: ", form.Number.value);
        this.props.setNumber(form.Number.value);
        form.Number.value = "";
        form.Number.focus();
    }

    render() {
        return(
            <form name="getArabicNumber" onSubmit={this.handleSubmit}>
                <input name="Number"
                    type="text" placeholder="Enter a number"></input>
                <button type="submit">Convert</button>
            </form>
        );

    }
}

class ConverterToRoman extends React.Component {
    constructor() {
        super();
        this.state = { 
            romanNumber: "RomanNumber",
            arabicNumber: 0
        };
    this.setNewNumber = this.setNewNumber.bind(this);
    }

    setNewNumber(number) {
        console.log("SetNumber to: " + number);
        let romanStr;
        if (number.match(/\D/)) {
            romanStr = "Only digits allowed";
        } else {
        romanStr = convertToRoman(number);
        }
        console.log('Roman string: ', romanStr);
        console.log(this);
        this.setState({
            romanNumber: romanStr,
            arabicNumber: number
        });
    }

    render() {
        return(
            <div className="ArabicConverter">
                <h1>Convert Arabic to Roman number</h1>
                <DisplayRoman romanNumber={this.state.romanNumber}/>
                <GetArabicNumber setNumber={this.setNewNumber} />
            </div>
        );
    }

}

ReactDOM.render(<ConverterToRoman />, document.getElementById('content'));