
import companies from './data/time-slots.json';
import './App.css'
import Company from './components/Company';

const App = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Choose time slot</h1>
      <div>
        {companies.map((company) => <Company key={company.id} company={company} />)}
      </div>
    </div>
  )
};
export default App
