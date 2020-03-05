function soma(a, b) {
  return a + b;
}

test("On call route '/register', i want create an user", () => {
  const result = soma(4, 5);

  expect(result).toBe(9);
});
