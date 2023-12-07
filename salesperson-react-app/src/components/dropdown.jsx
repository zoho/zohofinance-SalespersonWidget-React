import Select from 'react-select';

const DropDown = (props) => {
    let customStyles = {

        control: (provided,state) => {

            return {
                    ...provided,
                    width:"100%",
                    border: "1px solid #DEE1EE ",
                    'box-shadow': "none",
                    "cursor": "pointer",
                    "&:hover":{
                        borderColor: state.isFocused ? " #408dfb" : "#408dfb"
                    },
            };

        },
        
        placeholder: (provided) => {
            return { ...provided, "margin-left": "5px", "color": "#666666", cursor: 'pointer' };
        },
        menuList: (provided) => {
            return { ...provided, 'max-height': '180px' }
          },
          dropdownIndicator: (provided, state) => {
            return {
              ...provided,
              color: state.isFocused ? '#616E86 !important' : '#616E86',
              cursor: 'pointer',
            }
          },
        
        
    };
    return (
        <div class="col-sm-5">
         <Select 
         styles={customStyles}
         value={props.value}
         options={props.options}
         onChange={props.handleOptionChange}
         getOptionLabel={(option)=>option[props.OptionLabelPath]}
         getOptionValue={(option)=>option[props.OptionValuePath]}
        />


    </div>
    );
  }
  
  export default DropDown;