import './App.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Main from "./components/main/Main";
import SidebarButtons from "./components/sidebar-buttons/SidebarButtons";
import SidebarMenu from "./components/sidebar-menu/SidebarMenu";
import Contact from "./components/footer/contact/Contact";

function App() {
  return (
    <div className="App">
        <SidebarMenu className="SidebarMenu"  />
        <div className="Content">
            <Header />
            <Main  className="Main" />
            <Contact></Contact>
            <Footer />
        </div>
    </div>
  );
}

export default App;
