const Form = function ({
  Button,
  className,
  LabelInput,
  name,
  setName,
  image,
  setImage,
  callBackFnAddFriend,
  selectedFriend,
  bill,
  setBill,
  paidByUser,
  setPaidByUser,
  whoIsPaying,
  setWhoIsPaying,
  callBackFnSpliBill,
}) {
  return (
    <form
      className={className}
      onSubmit={className === 'form-split-bill' ? callBackFnSpliBill : callBackFnAddFriend}
    >
      {className === 'form-add-friend' && (
        <>
          <LabelInput
            type='text'
            labelText="Friend's Name"
            value={name}
            setState={setName}
            disabled={false}
          />
          <LabelInput
            type='text'
            labelText='Image URL'
            value={image}
            setState={setImage}
            disabled={false}
          />

          <Button text='Add' callBackFn={() => {}} />
        </>
      )}

      {className === 'form-split-bill' && (
        <>
          <h2>Split a bill with {selectedFriend.name.split(' ')[0]}</h2>

          <LabelInput
            type='number'
            labelText='Bill Value'
            value={Number(bill)}
            setState={setBill}
            disabled={false}
          />
          <LabelInput
            type='number'
            labelText='Your expense'
            value={paidByUser}
            setState={value => setPaidByUser(Math.min(value, bill))}
            disabled={false}
          />
          <LabelInput
            type='number'
            labelText={`${selectedFriend.name.split(' ')[0]}'s expense`}
            value={bill - paidByUser}
            disabled={true}
          />

          <label>Who's paying the bill?</label>
          <select name='' id='' value={whoIsPaying} onChange={e => setWhoIsPaying(e.target.value)}>
            <option value='user'>You</option>
            <option value='friend'>{selectedFriend.name.split(' ')[0]}</option>
          </select>

          <Button text='Split Bill' callBackFn={() => {}} />
        </>
      )}
    </form>
  );
};

export default Form;
