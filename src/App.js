import logo from "./logo.svg";
import { useState } from "react";
import contactsData from "./contacts.json";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState(contactsData.slice(0, 5));

  function getRandom() {
    const random = Math.floor(Math.random() * contactsData.length);
    const randomItem = contactsData[random];
    return setContacts(prevState => ([... prevState, randomItem ]));
  }

  function sortByPopularity() {
    const sorted = contacts.sort((p1, p2) =>
      p1.popularity < p2.popularity ? 1 : p1.popularity > p2.popularity ? -1 : 0
    );
    return setContacts(() => [...sorted]);
  }

  function sortByName() {
    const sorted = contacts.sort((p1, p2) =>
      p1.name > p2.name ? 1 : p1.name < p2.name ? -1 : 0
    );
    return setContacts(() => [...sorted]);
  }

  function handleDeletedContacts(contactId) {
    const filtered = contacts.filter((contact) => {
        return contact._id !== contactId;
    })
    setContacts(filtered)
}

  function deleteContact(itemName) {
    const filtered = contacts.filter((item) => {
      return item.name !== itemName;
  });
  setContacts(filtered);
}

  return (
    <div className="App">
      <h1>IronContacts</h1>
      <button onClick={getRandom}>Add a random contact</button>
      <button onClick={sortByName}>Sort by name</button>
      <button onClick={sortByPopularity}>Sort by popularity</button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won Oscar</th>
          <th>Won Emmy</th>
          <th>Actions</th>
        </tr>

        {contacts.map((item) => {
          return (
            <tr>
              <td>
                <img src={item.pictureUrl} width="50px" />
              </td>
              <td>{item.name}</td>
              <td>{Number(item.popularity.toFixed(2))}</td>
              <td>{item.wonOscar ? "🏆" : null}</td>
              <td>{item.wonEmmy ? "🏆" : null}</td>
              <button onClick={() => deleteContact(item.name)}>Delete</button>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
