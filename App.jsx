import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components';
import { HomePage, QuizPage, DragAndDrop } from './pages';
import 'bootstrap/dist/css/bootstrap.min.css';
import './src/styles/App.css';


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="main-container">
        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/dnd" element={<DragAndDrop />} />
          </Routes>
        </div>
      </div>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}