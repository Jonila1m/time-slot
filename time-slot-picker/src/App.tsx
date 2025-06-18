
import companies from './data/time-slots.json';
import './App.css'
import Company from './components/Company';

const App = () => {
  return (
    <div style={{
      padding: '1rem'
    }}>
      <h1 style={{
        textAlign: 'center'
      }}
      >Choose time slot</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '3rem',
        }}
      >
        {companies.map((company) => (
          <div
            key={company.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'

            }}>
            <Company company={company} />
          </div>
        ))}
      </div>
    </div >
  )
};

export default App

