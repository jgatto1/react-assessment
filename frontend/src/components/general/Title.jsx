// Creating reusable title component to avoid repeating code. We should do the same for other components.
const Title = ({ children }) => {
  return <h2 className="text-xl font-bold mb-4 text-gray-900">{children}</h2>;
};

export default Title;
