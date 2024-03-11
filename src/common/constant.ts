const newRegime = (income: number) => {
  const conditionOne = income > 1500000;
  const conditionTwo = income > 1250000 && income <= 1500000;
  const conditionThree = income > 1000000 && income <= 1250000;
  const conditionFour = income > 750000 && income <= 1000000;
  const conditionFive = income > 500000 && income <= 750000;
  const conditionSix = income > 250000 && income <= 500000;

  switch (true) {
    case conditionOne:
      return 187500 + (income - 1500000) * 30 / 100;
    case conditionTwo:
      return 125000 + ((income - 1250000) * 25 / 100);
    case conditionThree:
      return 75000 + ((income - 1000000) * 20 / 100);
    case conditionFour:
      return 37500 + ((income - 750000) * 15 / 100);
    case conditionFive:
      return 12500 + ((income - 500000) * 10 / 100);
    case conditionSix:
      return (income - 250000) * 5 / 100;
    default:
      return 0;
  }
};

const oldRegime = (income: number) => {
  const conditionOne = income > 1500000;
  const conditionTwo = income <= 1500000 && income > 1250000;
  const conditionThree = income <= 1250000 && income > 1000000;
  const conditionFour = income <= 1000000 && income > 750000;
  const conditionFive = income <= 750000 && income > 500000;
  const conditionSix = income > 250000 && income <= 500000;
  const conditionSeven = income > 0 && income < 250000;

  switch (true) {
    case conditionOne:
      return 262500 + (income - 1500000) * 30 / 100;
    case conditionTwo:
      return 187500 + ((income - 1250000) * 30 / 100);
    case conditionThree:
      return 112500 + ((income - 1000000) * 30 / 100);
    case conditionFour:
      return 62500 + ((income - 750000) * 20 / 100);
    case conditionFive:
      return 12500 + ((income - 500000) * 20 / 100);
    case conditionSix:
      return ((income - 250000) * 5 / 100);
    case conditionSeven:
      return 0;
    default:
      return 0;
  }
};

const blockInvalidChar = (e: any) => {
  const { keyCode } = e;
  if (((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57))
    && (e.keyCode < 96 || e.keyCode > 105)) && e.keyCode !== 8) {
    e.preventDefault();
  }
  return keyCode;
};

const eightycAmountLimit = (value: any) => {
  return parseInt(((value.ppf) + (value.pf)
    + (value.elss) + (value.homePrincipal)));
};

const getInputsData = (data: object) => {
  const myPromise = new Promise((myResolve, myReject) => {
    myResolve(data);
    myReject(Error);
  });

  myPromise.then(
    (d: any) => {
      // eslint-disable-next-line no-console
      return d.inputs;
    },
    (error) => {
      // eslint-disable-next-line no-console
      return error;
    }
  );
  return myPromise;
};

export {
  newRegime, oldRegime, blockInvalidChar, eightycAmountLimit, getInputsData
};
