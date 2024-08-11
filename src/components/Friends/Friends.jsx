const Friends = function ({ friend, Button, selectedFriend, onSelection }) {
  const { name: fullName, image, balance } = friend;
  const isSelected = friend.id === selectedFriend?.id;

  const name = fullName.split(' ')[0];

  return (
    <li className={isSelected ? 'selected' : ''}>
      <img src={image} alt={name} />

      <h3>{fullName}</h3>

      {balance < 0 && (
        <p className='red'>
          You owe {name} {Math.abs(balance)} bucks
        </p>
      )}
      {balance > 0 && (
        <p className='green'>
          {name} owes you {Math.abs(balance)} bucks
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}

      <Button
        text={isSelected ? 'Close' : 'Select'}
        // callBackFn={() => onSelection(isSelected ? null : friend)}
        callBackFn={() => onSelection(friend)}
      />
    </li>
  );
};

export default Friends;
