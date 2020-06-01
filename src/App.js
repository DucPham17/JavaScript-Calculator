import React from 'react';
import './App.css';
import Button from "./button.js"
import isOperator from "./variable"
class App extends React.Component {
 constructor(props){
   super(props)
   this.state = {
    currentVal: "0",
    formula: "",
    prevVal : "0",
    currentSign: "pos",
    evaluated : false
   }
   this.handleNumber = this.handleNumber.bind(this)
   this.handleEvaluate = this.handleEvaluate.bind(this)
   this.handleDecimal = this.handleDecimal.bind(this)
   this.handleClear = this.handleClear.bind(this)
   this.handleOperactor = this.handleOperactor.bind(this)
 }

 handleNumber(event){
   const value = event.target.value;
   const formu = this.state.formula;
   const cur = this.state.currentVal
   this.setState({ evaluated: false });
   
    if(!this.state.evaluated){
      this.setState({
      currentVal : ((cur.charAt(0) === "0" || cur.charAt(0) === "+" || cur.charAt(0) === "-" || cur.charAt(0) === "*" || cur.charAt(0) === "/")  &&!cur.includes("."))? cur.substring(1,cur.length) + value :cur + value,
      formula: formu + value
      })
    }
    else{
      this.setState({
        currentVal: value,
        formula: value !== "0" ? value : "" });
    }
     
 }

 handleEvaluate(){
  let formu = this.state.formula
  for(var i = formu.length - 1; i > 0;i--){
    if(isOperator.test(formu.charAt(i))){
      if(formu.charAt(i) != "-"){
        console.log("a")
        if(isOperator.test(formu.charAt(i-1))){
          console.log(formu.slice(0,i-1))
          console.log(formu.slice(i))
          formu = formu.slice(0,i-1) + formu.slice(i)
        }
      }
    }
  }

 
   
   const result = eval(formu)
   
   this.setState({
     currentVal : result,
     formula : `${formu}=${result}`,
     prevVal : result,
     evaluated : true
   })

 }

 handleDecimal(){
   const cur = this.state.currentVal;
   const formu = this.state.formula;
    if(this.state.evaluated == true){
      this.setState({
        currentVal: "0.",
        formula: "0.",
        evaluated: false });
    }
    else {
      if(!cur.includes(".")){
        console.log("a")
        this.setState({
          currentVal : cur + ".",
          formula: `${formu}.`
        })
      }
    }
 }
 handleClear(){
   this.setState({
  currentVal: "0",
  formula: "",
  currentSign: "pos",
  evaluated : false,
  prevVal : ""
 }) 
 }

 handleOperactor(event){
   const operator  = event.target.value;
   const formu = this.state.formula;
   const pre = this.state.prevVal
   if(!this.state.evaluated){
    this.setState({
      currentVal : operator,
      formula: `${formu}${operator}`
    })
  }
  else{
    this.setState({
      currentVal : operator,
      formula : `${pre}${operator}`,
      evaluated : false
    })
  }
 }

 render(){
   return (
     <div>
       <Button id={"zero"} value={"0"} handleNumber={this.handleNumber}/>
       <Button id={"one"} value={"1"} handleNumber={this.handleNumber}/>
       <Button id={"two"} value={"2"} handleNumber={this.handleNumber}/>
       <Button id={"three"} value={"3"} handleNumber={this.handleNumber}/>
       <Button id={"four"} value={"4"} handleNumber={this.handleNumber}/>
       <Button id={"five"} value={"5"} handleNumber={this.handleNumber}/>
       <Button id={"six"} value={"6"} handleNumber={this.handleNumber}/>
       <Button id={"seven"} value={"7"} handleNumber={this.handleNumber}/>
       <Button id={"eight"} value={"8"} handleNumber={this.handleNumber}/>
       <Button id={"nine"} value={"9"} handleNumber={this.handleNumber}/>
       <div> <button id="equals" onClick={this.handleEvaluate}>=</button> </div>
       <div> <button id="add" value="+" onClick={this.handleOperactor}>+</button> </div>
       <div> <button id="subtract" value="-" onClick={this.handleOperactor}>-</button> </div>
       <div> <button id="multiply" value="*" onClick={this.handleOperactor}>*</button> </div>
       <div> <button id="divide" value="/" onClick={this.handleOperactor}>/</button> </div>
       <div> <button id="decimal" value="." onClick={this.handleDecimal}>.</button> </div>
       <div> <button id="clear" onClick={this.handleClear}> AC</button></div>
       <div >
         {this.state.formula}
         <br/>
         <div id="display">
        { this.state.currentVal}
        </div>
         </div>
       </div>
   )
 }
}

export default App;
