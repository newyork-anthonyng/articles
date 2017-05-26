it('should have useless snapshot', () => {
  const a = () => 0;

  expect(a).toMatchSnapshot();
});
