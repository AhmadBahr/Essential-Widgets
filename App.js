import './App.css';
import Bookmark from './Components/Bookmark Extension/Bookmarks'
import Todo from './Components/Todo Extension/Todo';
import Crypto from './Components/Crypto Extension/Crypto';
import Weather from './Components/Weather Extension/Weather';
import Greeting from './Components/Greeting Extension/Greeting';
import Time from './Components/Time Extension/Time';

function App() {
  return (
    <div className="app-wrapper">
      <div className="App">
        <div className="item1">
          <Bookmark />
        </div>
        <div className="item2">
          <Time />
        </div>
        <div className="item3">
          <Greeting />
        </div>
        <div className="item4">
          <Weather />
        </div>
        <div className="item5">
          <Todo />
        </div>
        <div className="item6">
          <Crypto />
        </div>
      </div>
    </div>
  );
}

export default App;