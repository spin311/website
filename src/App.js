import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import SidebarButtons from "./components/sidebar-buttons/SidebarButtons";
import SidebarMenu from "./components/sidebar-menu/SidebarMenu";

function App() {
  return (
    <div className="App">
        <SidebarMenu className="SidebarMenu"  />
      <SidebarButtons />
        <div className="Content">
            <Header />
            <Main  className="Main" />
            <Footer />
        </div>
    </div>
  );
}

export default App;
