const Footer = () => {
  return (
    <footer className="dark:bg-gray-900 bg-gray-100 dark:text-gray-300 shadow-xl border-t dark:border-gray-800 py-6 px-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Cardence. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
