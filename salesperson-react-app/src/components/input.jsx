const Input = (props) => {
    return (
      <div class="col-sm-5">
        	 <input type="number" class="form-control text" id={props.id} value={props.value} 
             placeholder={props.placeholder} onInput={props.handleInputChange} />
      </div>
    );
  }
  
  export default Input;