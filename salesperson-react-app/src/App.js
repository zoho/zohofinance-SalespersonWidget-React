import React, { PureComponent } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import { Loader } from './components/loader';

class App extends PureComponent {
  state = {
    connection_link_name: 'salesperson_commission_books',
    isLoading: false,
    orgVariablePlaceholder: 'vl__u76nt_data_store',
    status: 'sent',
    type: 'Percentage',
    specification_type: 'SubTotal'

  };

  async componentDidMount() {
    this.setState(state => ({ ...state, isLoading: true }))
    let { organization } = await window.ZFAPPS.get("organization");
    let domainURL = organization.api_root_endpoint;

    this.setState(state => ({ ...state, organization, domainURL }))

    // GET Paid Through Account
    try {
      let getPaidThroughAccount = await window.ZFAPPS.request({
        url: `${domainURL}/autocomplete/paidthroughaccountslist`,
        method: 'GET',
        url_query: [
          {
            key: 'organization_id',
            value: organization.organization_id,
          },
        ],
        connection_link_name: this.state.connection_link_name,
      });

      let { data: { body } } = getPaidThroughAccount;
      let { results } = JSON.parse(body);
      this.setState(state => ({ ...state, paidThroughArray: results }));

    } catch (err) {
      console.error(err);
    }
    // GET Expense Account
    let getExpenseAccount = {
      url: `${domainURL}/autocomplete/expenseaccountslist`,
      method: 'GET',
      url_query: [
        {
          key: 'organization_id',
          value: organization.organization_id,
        },
      ],
      connection_link_name: this.state.connection_link_name,
    };

    try {
      let { data: { body } } = await window.ZFAPPS.request(getExpenseAccount);
      let { results } = JSON.parse(body);
      this.setState(state => ({ ...state, expenseArray: results }));

    } catch (err) {
      console.error(err);
    }
    try {
      // GET Global Field Values
      let getOrgVariable = {
        url: `${domainURL}/settings/orgvariables/${this.state.orgVariablePlaceholder}`,
        method: 'GET',
        url_query: [
          {
            key: 'organization_id',
            value: organization.organization_id,
          },
        ],
        connection_link_name: this.state.connection_link_name,

      }
      let { data: { body }, } = await window.ZFAPPS.request(getOrgVariable)
      let { orgvariable: { value } } = JSON.parse(body);
      if (value !== "") {
        value = JSON.parse(value);
        let { status, expense_account, paid_through_account, type, commission, specification_type } = value
        this.setState(state => ({
          ...state, status,
          expense_account,
          paid_through_account,
          type,
          commission,
          specification_type,
        }))
      }
    }
    catch (e) {
      console.error(e);
    }

    this.setState({ isLoading: false })
  }

  render() {
    return (
      <>
        {this.state.isLoading ? <div class="w-100" Style="margin-top: 150px;"><Loader /></div> :
          <Router>
            <div className="App">
              <Routes >
                <Route exact path="/" element={<Home defaultOptions={this.state} />} />
              </Routes>
            </div>
          </Router>}
      </>
    );
  }
}

export default App;

