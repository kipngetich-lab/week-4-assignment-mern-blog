import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Header title="MERN Blog" />
      <main className="flex-grow container py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;