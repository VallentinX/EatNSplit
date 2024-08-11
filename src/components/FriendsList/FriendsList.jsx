const FriendsList = function ({ Friends, dataBase, Button, selectedFriend, onSelection }) {
  return (
    <ul>
      {dataBase.map((friend, index) => (
        <Friends
          key={index}
          friend={friend}
          Button={Button}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        />
      ))}
    </ul>
  );
};

export default FriendsList;
