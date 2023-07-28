import React, { useEffect, useState, createContext } from "react";
import axios from "axios";
import "./App.css";
import Card from "./components/Card";
import CardFocus from "./components/CardFocus";

export const FocusContext = createContext(null);
function App() {
  const [data, setData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const onCardClick = (user) => {
    setSelectedCard(user);
  };
  const onBgClick = () => {
    setSelectedCard(null);
  };
  const getData = async () => {
    try {
      const [userResponse, photoResponse] = await Promise.all([
        axios.get("https://jsonplaceholder.typicode.com/users"),
        axios.get("https://picsum.photos/v2/list"),
      ]);

      const users = userResponse.data;
      const photos = photoResponse.data;
      const combinedData = users.map((user) => {
        const photo = photos.find((photo) => photo.id === user.id.toString());
        return {
          ...user,
          photoUrl: photo ? photo.download_url : "",
        };
      });
      setData(combinedData);
    } catch (err) {
      console.error("Error fetching data", err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <FocusContext.Provider value={{ onBgClick, onCardClick, selectedCard }}>
      <div className="App">
        {data.map((user, id) => {
          return <Card user={user} key={id} />;
        })}
        <CardFocus />
      </div>
    </FocusContext.Provider>
  );
}
export default App;
