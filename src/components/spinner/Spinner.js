const Spinner = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="200" height="200" style={{ shapeRendering: 'auto', display: 'block', background: 'rgb(255, 255, 255)', margin: '0 auto', }}><g>
      <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#000000" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
    <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"></animateTransform>
    </circle>
    <circle cx="50" cy="50" r="23" strokeWidth="8" stroke="#be0027" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"></animateTransform>
    </circle><g></g></g></svg>
  )
}
export default Spinner