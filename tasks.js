function createCalculator(num) {
  return {
    res: num,
    add: function (num) {
      this.res += num;
      return this;
    },
    sub: function (num) {
      this.res -= num;
      return this;
    },
    get: function () {
      return this.res;
    },
  };
}

const calculator = createCalculator(10).add(5);
calculator.add(3).sub(2).add(1);

console.log(calculator.get()); // Выведет 17