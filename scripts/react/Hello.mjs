import { AppSearchContext } from "./AppSearchContext";
const { useEffect, useState, useCallback, useContext } = React;

export const Hello = () => {
  const [items, setItems] = useState([]);
  const { list, setList } = useContext(AppSearchContext);
  const handleNewItem = useCallback((newItem) => {
    setItems(items => [...items, newItem]);
  }, [setItems]);

  useEffect(() => {
    //register test event
    return () => {
      //unregister test event
    }
  })

  return <div>Hello React!</div>;
}
// class Hello extends React.Component {
//     render() {
//       return <div>Hello React!</div>;
//     }
//   }
//   export default Hello;
  