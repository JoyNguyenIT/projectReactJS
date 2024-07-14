import { Link, Outlet } from "react-router-dom";
import './App.scss';
import Header from './component/Header/Header';


const App = () => {


  return (
    <div className="app-container">
      <Header />
      <div>
        Test link
      </div>
      <div>

        <Link to="/users">
          <button className='btn btn-primary'>
            Go to user page
          </button>
        </Link>


        <br />

        <Link to="/admins">
          <button className='btn btn-danger'>Go to admin page
          </button>
        </Link>

      </div>

    </div>

  );
}

export default App;
