import { View, Text, TextInput, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

const Test = () => {
  const [users, setUsers] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return Error("Oh no");
        }
        return res.json();
      })
      .then((data) => setUsers(data));
  }, []);

  const handler = (e) => {
    setUsers(
      users.filter(
        // (user) => user.name.toUpperCase().includes(e.toUpperCase())
        (user) => user.name.includes(e)
        // user.name.includes(searchUser)
      )
    );
  };

  return (
    <ScrollView>
      <TextInput
        onChangeText={(e) => handler(e)}
        placeholder="search"
        style={{ height: 40, margin: 12, borderWidth: 1, padding: 10 }}
      />
      {users.map((post) => (
        <View
          key={post.id}
          style={{ marginBottom: 20, backgroundColor: "pink" }}
        >
          <Text>{post.id}</Text>
          <Text style={{ paddingLeft: 20 }}>{post.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default Test;
