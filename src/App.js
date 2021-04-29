import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      list: list,
      searchTerm: 'search..',
    };
  }

  // JS ES6 arrow function autobinds automatically method to constructor
  deleteListItem = (id) => {
    console.log(id);
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    console.log(updatedList)
    this.setState({list: updatedList});
  }

  filterList = (search) => {
    console.log('search: ' +  search);

    if (search == ''){
      console.log('empty')
      console.log(list)
      this.setState({list}); // refresh
    }
    else {
      let updatedList = [];
      this.state.list.map(item => {
        if (item.author.toLowerCase().includes(search.toLowerCase()) ||
            item.title.toLowerCase().includes(search.toLowerCase())
        ){
          console.log('found')
          updatedList.push(item);
        }
      });

      console.log('updated: ' + updatedList)
      this.setState({list: updatedList});
    }
  }

  onSearchChange = (event) => {
    console.log('event: ' + event.target.value)
    this.setState({
      searchTerm: event.target.value
    }, ()=>{
      this.filterList(this.state.searchTerm);
    });
  }
  onSearchFocus = (event) => {
    this.setState({
      searchTerm: ''
    });
  }

  render(){
    const {list, searchTerm} = this.state;
    return(
      <div className='App'>
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onFocus={this.onSearchFocus}
        />
        <Table
          list={list}
          deleteListItem={this.deleteListItem}
        />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange, onFocus} = this.props;
    return (
      <form>
        <input
        type="text"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        />
      </form>
    );
  }
}

class Table extends Component {
  render(){
    const {list, deleteListItem} = this.props;
    return(
      <div>
      {list.map(item =>
        <div key={item.objectID}><span><a href={item.url}>{item.title}</a></span>
            <span>{item.author}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={()=>deleteListItem(item.objectID)}
                type='button'
              >Delete</button>
            </span>
        </div>
      )}
      </div>
    );
  }
}

export default App;
