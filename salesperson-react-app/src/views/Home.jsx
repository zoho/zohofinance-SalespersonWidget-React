import React, { Component, Fragment } from 'react';
import RadioButton from '../components/radioButton';
import Input from '../components/input';
import DropDown from '../components/dropdown';

class Home extends Component {
  state = {
    status: 'sent',
    type: 'Percentage',
    specification_type: 'SubTotal'

  }
  constructor(props) {
    super(props);
    this.props_option = this.props?.defaultOptions;
  }
  async componentDidMount() {
    
    let { status, expense_account, paid_through_account, type, commission, specification_type } = this.props_option
    await this.setState(state => ({
      ...state, status,
      type,
      commission,
      expense_account,
      specification_type,
      paid_through_account
    }))
    this.eventListenerSetup = false;
  
    // ON PRE SAVE CHECK
    window.Zapp.instance.on("ON_SETTINGS_WIDGET_PRE_SAVE", async () => {
      this.eventListenerSetup = true;

      if (this.state.commission !== "" && this.state.commission !== undefined) {
        if (this.state.status === 'paid') {
          let isError = await checkAccount("paid")
          if (isError) {
            return {
              "prevent_save": true
            };
          }
          else {
            await updateOrgVariable();
          }
        }
        else {
          let isError = await checkAccount("sent")
          if (isError) {
            return {
              "prevent_save": true
            };
          }
          else {
            await updateOrgVariable();
          }
        }
      }
    })

    //
    let checkAccount = async (status) => {

      if (this.state.expense_account === undefined) {
        await this.showErrorNotification("Please select the Expense Account")
        return true
      }
      if (status !== "paid" && this.state.paid_through_account === undefined) {
        await this.showErrorNotification("Please select the Paid Through Account")
        return true
      }


    }
    // UPDATE Global Fields
    let updateOrgVariable = async () => {
      let data = { "value": { ...this.state } }
      window.ZFAPPS.request({
        url: `${this.props_option.domainURL}/settings/orgvariables/${this.props_option.orgVariablePlaceholder}`,
        method: 'PUT',
        url_query: [
          {
            key: 'organization_id',
            value: this.props_option.organization.organization_id,
          },
        ],
        body: {
          mode: 'formdata',
          formdata: [
            {
              key: 'JSONString',
              value: JSON.stringify(data),
            },
          ],
        },
        connection_link_name: this.props_option.connection_link_name,
      })


    };
  }

  async delay()
	{
		return new Promise(resolve=>setTimeout(resolve,500));
	}
    // Error Notification 
  async showErrorNotification(msg){
    await window.ZFAPPS.invoke("SHOW_NOTIFICATION", { type: "error", message: msg });
  }
  //PaidThroughSelectionChange
  paidThroughSelectChange = (data) => {
    this.setState(state => ({ ...state, paid_through_account: data }), () => {

    });

  }
  //ExpenseSelectionChange
  expenseSelectChange = (data) => {
    this.setState(state => ({ ...state, expense_account: data }), () => {

    });

  }

  render() {
    return (
      <div>
        <h4 className='heading'>When do you wish to create the expenses Sales Person Commissions ?</h4>
        <div className='flex-row'>
          <RadioButton id="sent-radio" value="sent" label="When an Invoice is Sent" name="invoiceStatusGroup" handleOptionChange={(event) => { this.setState(state => ({ ...state, status: event.target.value })); }} checked={this.state.status === 'sent'}></RadioButton>
          <RadioButton id="paid-radio" value="paid" label="When an Invoice is Paid" name="invoiceStatusGroup" handleOptionChange={(event) => { this.setState(state => ({ ...state, status: event.target.value })) }} checked={this.state.status === 'paid'}></RadioButton>
        </div>

        <Fragment>
          <div className='container '>
            <div className='container '>
              <h5 className='sideheading'>Commission Type</h5>
              <div className="flex-row">

                <RadioButton id="percentage-radio" value="Percentage" name="comissionTypeGroup" label="Percentage" handleOptionChange={(event) => { this.setState(state => ({ ...state, type: event.target.value })) }} checked={this.state.type === 'Percentage'}></RadioButton>
                <RadioButton id="amount-radio" value="Amount" name="comissionTypeGroup" label="Amount" handleOptionChange={(event) => { this.setState(state => ({ ...state, type: event.target.value }),) }} checked={this.state.type === 'Amount'}></RadioButton>
              </div>
            </div>
            <div className='container'>
              <h5 className='sideheading'>Commission Rate </h5>

              <Input id="number-field" value={this.state.commission} placeholder={this.state.type} handleInputChange={(event) => { this.setState(state => ({ ...state, commission: event.target.value })) }}></Input>

            </div>
            {this.state.status === 'sent' &&

              <div className='container'>
                <h5 className='sideheading'>Select the paid through account for expense created</h5>
                <DropDown id="paidthroughAccount-dropdown" value={this.state.paid_through_account} options={this.props_option.paidThroughArray} OptionValuePath="id" OptionLabelPath="text" handleOptionChange={(option) => this.paidThroughSelectChange(option)}></DropDown>
              </div>
            }
            <div className='container'>

              <h5 className='sideheading'>Select the expense account</h5>

              <DropDown id="expenseAccount-dropdown" value={this.state.expense_account} options={this.props_option.expenseArray} OptionValuePath="id" OptionLabelPath="text" handleOptionChange={(option) => this.expenseSelectChange(option)}></DropDown>
            </div>
            <div className='container'>
              <h5 className='sideheading'>Commission Specification</h5>
              <div className="flex-row">

                <RadioButton id="subtotal-radio" value="SubTotal" name="specificationGroup" label="Commission on SubTotal" handleOptionChange={(event) => { this.setState(state => ({ ...state, specification_type: event.target.value })) }} checked={this.state.specification_type === 'SubTotal'}></RadioButton>
                <RadioButton id="total-radio" value="Total" name="specificationGroup" label="Commission on Total" handleOptionChange={(event) => { this.setState(state => ({ ...state, specification_type: event.target.value })) }} checked={this.state.specification_type === 'Total'}></RadioButton>
              </div>

            </div>
          </div>
        </Fragment>
      </div>
    );
  }
}

export default Home;
