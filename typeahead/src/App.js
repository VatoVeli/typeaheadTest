import "../App.css";
import useGetUsers from "../fetch/useGetUsers";
import { useState, useEffect, useRef } from "react";

function App() {
  const userListRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const { users, setUsers, isLoading, error } = useGetUsers(searchText);

  const handleClickOutside = (event) => {
    if (userListRef.current && !userListRef.current.contains(event.target)) {
      setUsers([]);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="container">
      <h1>Github Typeahead</h1>
      <div className="wrapper" ref={userListRef}>
        <input
          type="text"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          placeholder="Search for users..."
          spellCheck={false}
        />
        {error && <p className="errorText">{error.message}</p>}
        {isLoading ? (
          <p className="loadingText">Loading...</p>
        ) : (
          <ul className="user-list">
            {users &&
              users.map((user) => (
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noreferrer"
                  key={user.id}
                >
                  <li>
                    <img src={user.avatar_url} alt={user.login} />
                    <span>{user.login}</span>
                  </li>
                </a>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
