import './App.css';
import Books from './components/Books'
import BookPage from './components/BookPage'
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <>
        <Route exact path="/" component={Books} />
        <Route exact path="/book/:id" component={BookPage} />
      </>
    </Router>
  );
}

export default App;
