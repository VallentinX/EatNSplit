import { values } from 'lodash';

const LabelInput = function ({ type, labelText, value, setState, disabled }) {
  return (
    <>
      <label>{labelText}</label>
      <input
        type={type}
        value={value}
        onChange={e => setState(e.target.value)}
        disabled={disabled ? true : false}
      />
    </>
  );
};

export default LabelInput;
