import { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const api = async () => {
      setLoading(true);
      const res = await axios.get(`https://dummyjson.com/users`);
      console.log(res.data.users);
      setPost(res.data.users);
      setLoading(false);
    };
    api();
  }, []);

  return (
    <div className="App">
      <h1>Search filter</h1>

      <input
        type="text"
        placeholder="Start typing.... "
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        post
          .filter((value) => {
            if (search === "") {
              return value;
            } else if (
              value.firstName.toLowerCase().includes(search.toLowerCase())
            ) {
              return value;
            }
          })

          .map((item) => <h3 key={item.id}>{item.firstName}</h3>)
      )}
    </div>
  );
}

export default App;
