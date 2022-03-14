import ContactApp from './ContactApp';
import TodoContainer from './TodoContainer';
import {BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      {/* <ContactApp/> */}
      <TodoContainer/>
    </BrowserRouter>
  );
}

export default App;
