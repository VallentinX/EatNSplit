import { useState, useEffect } from 'react';
import FriendsList from './FriendsList/FriendsList';
import Friends from './Friends/Friends';
import Button from './Button/Button';
import Form from './Form/Form';
import LabelInput from './LabelInput/LabelInput';
// import db from '../db/db';
import './App.css';

const getDataBaseFromLocalStorage = () => {
  const savedData = localStorage.getItem('friends');

  return savedData ? JSON.parse(savedData) : [];
};

const App = function () {
  const [dataBase, setDataBase] = useState(getDataBaseFromLocalStorage);
  const [showAddFriendForm, setShowAddFriendForm] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(dataBase));
  }, [dataBase]);

  const displayAddFriendForm = () => {
    setShowAddFriendForm(!showAddFriendForm);
    setSelectedFriend(null);
  };

  const handleSelectFriend = friend => {
    setSelectedFriend(frnd => (frnd?.id === friend.id ? null : friend));
    setShowAddFriendForm(false);
    clearFields();
  };

  const handleAddFriend = function (e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = `${Math.random()}`.slice(4, 10);
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    const updatedDataBase = [...dataBase, newFriend];

    setDataBase(updatedDataBase);
    displayAddFriendForm();
    clearFields();
  };

  const splitBill = function (e) {
    e.preventDefault();

    if (!bill || !paidByUser || !selectedFriend) return;

    const updatedDataBase = dataBase.map(friend => {
      if (friend.id === selectedFriend.id) {
        return {
          ...friend,
          balance:
            whoIsPaying === 'user'
              ? friend.balance + Number(bill - paidByUser)
              : friend.balance - Number(paidByUser),
        };
      }

      return friend;
    });

    setDataBase(updatedDataBase);
    setSelectedFriend(null);
    clearFields();
  };

  const clearFields = function () {
    setName(() => '');
    setImage(() => 'https://i.pravatar.cc/48');
    setBill(() => 0);
    setPaidByUser(() => 0);
    setWhoIsPaying(() => 'user');
  };

  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList
          Friends={Friends}
          dataBase={dataBase}
          Button={Button}
          selectedFriend={selectedFriend}
          onSelection={handleSelectFriend}
        />

        {showAddFriendForm && (
          <Form
            className='form-add-friend'
            Button={Button}
            LabelInput={LabelInput}
            name={name}
            image={image}
            setName={setName}
            setImage={setImage}
            callBackFnAddFriend={handleAddFriend}
          />
        )}

        <Button
          text={showAddFriendForm ? 'Close' : 'Add Friend'}
          callBackFn={displayAddFriendForm}
        />
      </div>

      {selectedFriend && (
        <Form
          className='form-split-bill'
          selectedFriend={selectedFriend}
          Button={Button}
          LabelInput={LabelInput}
          bill={bill}
          setBill={setBill}
          paidByUser={paidByUser}
          setPaidByUser={setPaidByUser}
          whoIsPaying={whoIsPaying}
          setWhoIsPaying={setWhoIsPaying}
          callBackFnSpliBill={splitBill}
        />
      )}
    </div>
  );
};

export default App;
