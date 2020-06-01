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
     <div id="container">
       <div> <button className="btn-block btn-danger" id="clear" onClick={this.handleClear} className="col m 12"> AC</button></div>
       <div className="abc">
       <div className="btn"> <Button className={"btn-default"}  id={"seven"} value={"7"} handleNumber={this.handleNumber}/> </div>
       <div className="btn"> <Button className={"btn-default"}  id={"eight"} value={"8"} handleNumber={this.handleNumber}/> </div>
       <div className="btn"> <Button className={"btn-default"}  id={"nine"} value={"9"} handleNumber={this.handleNumber}/> </div>      
       <div className="btn"> <button className={"btn-default"} id="add" value="+" onClick={this.handleOperactor}>+</button> </div>
       </div>
       <div className="abc">
       <div className="btn"> <Button  className={"btn-default"} id={"four"} value={"4"} handleNumber={this.handleNumber}/></div>
       <div className="btn"><Button  className={"btn-default"} id={"five"} value={"5"} handleNumber={this.handleNumber}/></div>
       <div className="btn"><Button  className={"btn-default"} id={"six"} value={"6"} handleNumber={this.handleNumber}/></div>
       <div className="btn"> <button  className="btn-default" id="subtract" value="-" onClick={this.handleOperactor}>-</button> </div>
       </div>
       <div className="abc">
       <div className="btn"><Button className={"btn-default"} id={"one"} value={"1"} handleNumber={this.handleNumber}/></div>
       <div className="btn"><Button className={"btn-default"} id={"two"} value={"2"} handleNumber={this.handleNumber}/></div>
       <div className="btn"><Button className={"btn-default"} id={"three"} value={"3"} handleNumber={this.handleNumber}/></div>
       <div className="btn"> <button className="btn-default" id="multiply" value="*" onClick={this.handleOperactor}>*</button> </div>
         </div>
        <div className="abc">
       <div className="btn"> <Button className={"btn-default"} id={"zero"} value={"0"} handleNumber={this.handleNumber}/></div>
       <div className="btn"> <button className="btn-default" id="decimal" value="." onClick={this.handleDecimal}>.</button> </div>       
       <div className="btn"> <button className="btn-default" id="equals" onClick={this.handleEvaluate}>=</button> </div>    
       <div className="btn"> <button className="btn-default" id="divide" value="/" onClick={this.handleOperactor}>/</button> </div>
       </div>
       
       <div>
         <div id="formula"><h4>Your formula:</h4> {this.state.formula}</div>
         <br/>
         <div id="display">
         <h4>Your Value:</h4>{this.state.currentVal}
        </div>
         </div>
       </div>
   )
 }
}

export default App;
