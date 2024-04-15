/* eslint-disable react/prop-types */
export default function Button({ onClick, btnLabel }) {
  return (
    <button className="btn btn-secondary" onClick={onClick}>
      {btnLabel}
    </button>
  );
}
