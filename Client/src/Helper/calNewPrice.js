function calNewPrice(oldPrice, offer) {
  if (offer) {
    let price = oldPrice - (oldPrice * offer.percentage) / 100;
    return price;
  } else {
    return oldPrice;
  }
}

export default calNewPrice;
