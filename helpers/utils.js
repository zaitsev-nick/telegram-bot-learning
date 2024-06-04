const btc = (price) => {
  return (price * 0.0000075);
};

const ltc = (price) => {
  return (price * 0.0046).toFixed(9);
};


export const Count = {
  btc,
  ltc,
};
