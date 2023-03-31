
import './App.css';
import List from './components/List/List';
import ListItem from './components/listitem/Listitem';

import Featured from './components/Navbar/Featured/Featured';
import Home from './home/Home';

function App() {
  return (
    <div className="App">
      <Home/>
      <Featured/>
      <List/>
      <ListItem/>
    </div>
  );
}

export default App;
