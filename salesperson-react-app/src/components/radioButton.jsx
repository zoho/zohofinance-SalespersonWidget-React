
const RadioButton = (props) => {

  return (
    <div>
      <input class="form-check-input" type="radio" name={props.name} id={props.id} value={props.value}
        onChange={props.handleOptionChange} checked={props.checked} />
      <label class="form-check-label" htmlFor={props.id}>{props.label}</label>
    </div>
  );
}

export default RadioButton;