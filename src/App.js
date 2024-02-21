import EventList from './components/EventList';
import CitySearch from './components/CitySearch';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
    </div>
  );
}

export default App;
