import "./App.css";
import React from "react";
import web3 from "./web3";
import lottery from "./lottery";

interface IState {
  manager: any, players: any, balance: any, value: any, userFeedback: string
}
class App extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { manager: "" , players: [], balance: "", value: "", userFeedback:''} ;
  }
  async componentDidMount(): Promise<void> {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address as string);
    this.setState({ manager, players, balance }); 
 

  }
  onSubmit = async (event: any) => {
     event.preventDefault();
     this.setState({userFeedback: 'Waiting on transaction success...'});
      const accounts = await web3.eth.getAccounts();
      await lottery.methods.enter().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
      this.setState({userFeedback: 'You have been entered!'});
      
  }
  onPickWinner = async () => {
    this.setState({userFeedback: 'Waiting on transaction success...'});
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.getWinner().send({
      from: accounts[0]
    });
    this.setState({userFeedback: 'A winner has been picked!'});
  }
  render() {
   
    return (
      <div className="App">
        <p>
            this contract is managed by {this.state.manager}
          </p>
          <p>There are {this.state.players.length} players, </p>
          <p>with a balance: {web3.utils.fromWei(this.state.balance,'ether')} ether!</p>
          <hr/>
          <form onSubmit={this.onSubmit}>
            <h4>Want to try your luck?</h4>
            <div>
              <label>Amount of ether to enter</label>
              <input value={this.state.value} onChange={event => this.setState({value: event.target.value})}/>
            </div>
            <button type="submit">Enter</button>
            </form>
            <hr/>
            <h1>{this.state.userFeedback}</h1>

            <hr/>
            <h4>Ready to pick a winner?</h4>
            <button onClick={this.onPickWinner}>Pick a winner!</button>
            <hr/>
      </div>
    );
  }
}
export default App;
