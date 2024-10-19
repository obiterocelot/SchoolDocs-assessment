import SchoolList from './components/schoolList';
import SchoolSingular from './components/schoolSingular';
import SchoolCreate from './components/schoolCreate';
import UpdateSchool from './components/schoolUpdate';
import DeleteSchool from './components/schoolDelete';

import './App.css';

function App() {
    return (
        <>
            <SchoolList />
            <SchoolSingular />
            <SchoolCreate />
            <UpdateSchool />
            <DeleteSchool />
        </>
    )
}
export default App;
