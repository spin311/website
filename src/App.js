import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import SidebarButtons from "./components/sidebar-buttons/SidebarButtons";

function App() {
  return (
    <div className="App">
      <Header />
      <SidebarButtons />
        <Main />
        <Footer />
    </div>
  );
}

export default App;
