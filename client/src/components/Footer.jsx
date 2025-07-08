const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} MERN Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;