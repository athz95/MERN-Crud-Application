import './App.css';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddUserScreen from './screens/addUserScreen';
import UserListScreens from './screens/userListScreen';
import UserEditScreen from './screens/userEditScreen';


const App = () =>  {
  return (
    <Router>
    <Header />
    <main className="py-3">
      <Container>
           <Route path="/addUser" component={AddUserScreen} />
           <Route path="/user/:id/edit" component={UserEditScreen} />
           <Route path="/" component={UserListScreens} exact/>
      </Container>
    </main>
    <Footer /> 
    </Router>
   
  );
}

export default App;
