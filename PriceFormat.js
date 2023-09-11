function myFunction1() {
   var price1 = 1234.56;      // Format normally
  var price2 = 56789.01;    // Format in thousands
  var price3 = 1234567.89;  // Format in millions

  Logger.log(formatPrice(price1)); // Output: $1234.56
  Logger.log(formatPrice(price2)); // Output: $56.79K
  Logger.log(formatPrice(price3)); // Output: $1.23M
}


function formatPrice(price) {
  price = price/100;
  /*if (price >= 1000000) {
    return Utilities.formatString('$%.2fM', price / 1000000); // Format in millions
  } else if (price >= 1000) {
    return Utilities.formatString('$%.2fK', price / 1000); // Format in thousands
  } else {
    return Utilities.formatString('$%.2f', price); // Format normally
  }*/
  return '$'+ price;
}
