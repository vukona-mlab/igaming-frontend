import React, { useState } from "react";

export default function FreelancerSearch() {
  const [query, setQuery] = useState("");

  const user = [{name:"Rea", age:22}, {name:"Motheo", age:21}, {name:"Tebogo", age:20}, {name:"Karlie", age:32}];

  const search = (data) => {
    return data.filter((item)=> item.name.toLowerCase().includes(query));
  }

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul className="list">
        {user.filter((user) => user.name.toLowerCase().includes(query)).map(
          (user) => (
            <li key={user.id} className="listItem">
              {user.name}
            </li>
          )
        )}
      </ul>
    </>
  );
}
