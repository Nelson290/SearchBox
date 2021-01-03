import React from 'react';
import './App.css';
import SearchResults from './components/SearchResults';
import SearchHistory from './components/SearchHistory';
import axios from './axios.search';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';

class App extends React.Component {

  state = {
    names: [
      'Dassehra', 'Blackmail', 'Gali Guleiyan', 'AndhaDhun', 'Dhadak', 'Genius', 'Kaalakaandi', 'Jalebi', 
    ],
    searchTerm: '',
    SearchHistory : [],
    ShowHistory : false,
    isLoading : false,
    error: false
  }

  editSearchTerm = (e) => {
    
    this.setState({searchTerm: e.target.value});
  }

  componentDidMount()
  {
    this.fetchData();
  }

  fetchData()
  {
    axios.get('https://react-my-burger-96c85.firebaseio.com/movies.json').then(res => {
      this.setState({
        names : res.data["-MQ4Tqun9RPp8nyvfOSG"]
      });
    }).catch( error => {
      this.setState( { error: true } );
  } );
  }

  clearSearch = () =>
  {
    this.setState({searchTerm: ''});
    this.fetchData();
  }

  searchData = () =>
  {
      this.setState({isLoading: true});

      if(this.state.searchTerm === '')
      {
        this.fetchData();
        this.setState({isLoading: false});
        return;
      }
      let updatedHistory = [...this.state.SearchHistory];
      updatedHistory.push(this.state.searchTerm);
      updatedHistory = updatedHistory.slice(Math.max(updatedHistory.length - 5, 0))
      this.setState({SearchHistory : updatedHistory})
  
      let matchedResult = [...this.state.names];
      matchedResult = matchedResult.filter(name => name.toLowerCase().includes(this.state.searchTerm.toLowerCase()));
      console.log(matchedResult);
  
      this.setState({names: matchedResult, isLoading: false});
  }

  toggleHistory = () =>
  {
    this.setState(
      {
        ShowHistory : !this.state.ShowHistory
      }
    )
  }

    render(){
      let searchResult = null;
      let searchHistoryResult = null;

      if(this.state.ShowHistory)
      {
        searchHistoryResult = this.state.SearchHistory.map(data => {
          return <SearchHistory name = {data}/>
        })
      }

      if(this.state.names.length > 0)
      {
        searchResult = (
          <div> 
            <h3>These are the important names:</h3>
            <SearchResults names = {this.state.names} search = {(result) => this.clicked(result)}/>
        </div>);
      }
      else
      {
        searchResult = <div> No matching result Found </div>
      }
      return (
        <div style = {{textAlign: 'center', paddingTop: '30vh'}}>
          <input type= 'text' value = {this.state.searchTerm} onChange = {this.editSearchTerm} placeholder = 'Search for a name!'/>
          <input type = 'button' value = "Go"  disabled = {this.state.isLoading} onClick = {this.searchData} /> 
          <br></br>
          <h3>Search Result Title: {this.state.searchTerm} </h3>
          {searchResult} <br/>
          {searchHistoryResult} <br/>
          <input type = 'button' value = "History"  onClick = {this.toggleHistory} /> 
          <input type = 'button' value = "Reset"  onClick = {this.clearSearch} /> 
        </div>
      );
    }
}

export default  withErrorHandler( App, axios );