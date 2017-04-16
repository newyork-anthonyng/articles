export let sumArray = [];

function sum() {
  const args = Array.prototype.slice.call(arguments);
  sumArray = sumArray.concat(args);

  const result = sumArray.reduce((prev, current) => {
    return prev + current;
  }, 0);
  sumArray = [];

  return result;
};

export default sum;
