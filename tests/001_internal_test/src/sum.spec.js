import sum, { sumArray } from './sum';

it('should return correct sum for 2 + 3', () => {
  expect(sum(2, 3)).toEqual(5);
});

it('should reset the sumArray after every call', () => {
  expect(sumArray.length).toEqual(0);
  sum(2, 3);
  expect(sumArray.length).toEqual(0);
});
