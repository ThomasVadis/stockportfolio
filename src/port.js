class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      portfolio: [
        {
          name: 'Feetbook',
          shares_owned: 20,
          cost_per_share: 50,
          market_price: 130
        },{
          name: 'Yamazon',
          shares_owned: 5,
          cost_per_share: 200,
          market_price: 500
        },{
          name: 'Snoozechat',
          shares_owned: 100,
          cost_per_share: 20,
          market_price: 3
        }
      ],
      name:'',
      shares:'',
      cost:'',
      marketPrice:''
    };

    this.removeStock = this.removeStock.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
    this.addStock = this.addStock.bind(this);

  }

  removeStock(index){
    const portfolio = this.state.portfolio.slice();
    portfolio.splice(index,1);
    this.setState({portfolio})
  }

  handleChange(event, index) {

    const portfolio = this.state.portfolio.slice();
    const { name, value } = event.target;
    portfolio[index][name] = value;
    this.setState({ portfolio });
  }

  handleFormChange(event){
    const {name, value} = event.target;
    this.setState({ [name] : value })

  }
  addStock(event){
    event.preventDefault();
    const { portfolio, name, shares, cost, marketPrice } = this.state;
    portfolio.push(
      {
        name: name,
        shares_owned: shares,
        cost_per_share: cost,
        market_price: marketPrice
      });

      this.setState({
        portfolio,
        name:'',
        shares:'',
        cost:'',
       marketPrice:''
      })
  }

  render() {
    const { portfolio, name, shares, cost, marketPrice } = this.state;
    const portfolio_market_value = portfolio.reduce((sum, stock) => stock.shares_owned * stock.market_price + sum, 0);
    const portfolio_cost = portfolio.reduce((sum, stock) => stock.shares_owned * stock.cost_per_share + sum, 0);
    const portfolio_gain_loss = portfolio_market_value - portfolio_cost;

    return (
      <div className="container">
        <h1 className="text-center my-4">Stock Portfolio</h1>
        <div className="row">
          <div className="col-12">
            <table className="table table-responsive">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Shares Owned</th>
                  <th scope="col">Cost per share ($)</th>
                  <th scope="col">Market Price ($)</th>
                  <th scope="col">Market Value ($)</th>
                  <th scope="col">Unrealized Gain/Loss ($)</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((stock, index) => {
                  const {
                    name,
                    shares_owned,
                    cost_per_share,
                    market_price,
                  } = stock;

                  const market_value = shares_owned * market_price;
                  const unrealized_gain_loss = market_value - shares_owned * cost_per_share;

                  return (
                    <tr key={index}>
                      <td>{name}</td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="shares_owned" value={shares_owned} /></td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="cost_per_share" value={cost_per_share} /></td>
                      <td><input onChange={e => this.handleChange(e, index)} type="number" name="market_price" value={market_price} /></td>
                      <td>{market_value}</td>
                      <td>{unrealized_gain_loss}</td>
                      <td><button className="btn btn-light btn-sm" onClick={() => this.removeStock(index)}>remove</button></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
            <div className="col-12">
              <form className="col-12 mt-2 mb-4" onSubmit={this.addStock}>
              <input className="mx-2" name="name" type="text" placeholder="Name" required value={name} onChange={this.handleFormChange}/>
              <input className="mx-2" name="shares" type="number" placeholder="Shares" value={shares} onChange={this.handleFormChange}/>
              <input className="mx-2" name="cost" type="number" placeholder="Cost" value={cost} onChange={this.handleFormChange}/>
              <input className="mx-2" name="marketPrice" type="number" placeholder="Price" value={marketPrice} onChange={this.handleFormChange}/>
              <button className="btn btn-primary btn-sm">add</button>
              </form>
            </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio value: $ {portfolio_market_value}</h4>
          </div>
          <div className="col-12 col-md-6">
            <h4 className="mb-3">Portfolio gain/loss: $ {portfolio_gain_loss}</h4>
          </div>

          <div className="col-12">

          </div>
        </div>
      </div>
    );
  }
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Portfolio />);