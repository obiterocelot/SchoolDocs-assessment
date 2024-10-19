import SchoolList from './components/schoolList';
import SchoolCreate from './components/schoolCreate';

import './App.css';

function App() {
    return (
        <>
            <div className="app-container">
                <h1>Your Schools</h1>
                <SchoolList />
                <SchoolCreate />
            </div>
        </>
    )
}
export default App;
