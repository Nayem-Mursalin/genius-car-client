import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Router/Routes/Routes';

function App() {


  return (
    <div className="App">
      <button className="btn btn-outline btn-success">Success</button>
      <button className="btn btn-outline btn-warning">Warning</button>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
