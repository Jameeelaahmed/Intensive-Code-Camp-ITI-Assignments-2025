import { useState } from 'react';
import './App.css';
import DisplayData from './Components/DisplayData/DisplayData';
import SignUp from './Components/SignUp/SignUp';

function App() {
  const [userData, setUserData] = useState(null);

  return (
    <>
      {!userData &&
        <SignUp onFormSubmit={setUserData} />
      }

      {userData &&
        <DisplayData data={userData} />}
    </>
  );
}

export default App;
