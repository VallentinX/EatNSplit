const Button = function ({ text, callBackFn }) {
  return (
    <button className='button' onClick={() => callBackFn()}>
      {text}
    </button>
  );
};

export default Button;
