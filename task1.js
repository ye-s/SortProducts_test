// Task 1

//  Main function in this task should be called for testing.
const sortProductsByPrice = (products, options = { size: 5 }) => {
  let result = {
    highest: null,
    lowest: null,
  };
  // I assumed that we can't have array length lower than size option.
  if (!products || products.length < options.size) {
    return result;
  }
  const optionsSize = options.size;
  const productsLength = products.length;
  result = {
    highest: optionsSize <= productsLength ? [] : null,
    lowest: optionsSize <= productsLength ? [] : null,
  };
  //
  let i = 0;
  // sorting array
  const sortedProducts = products.sort((prevItem, nextItem) => (prevItem.price - nextItem.price));
  while (i < options.size) {
    result.lowest.push(sortedProducts[i]);
    // substruct - 1 because arrays starts from 0 index
    result.highest.push(sortedProducts[productsLength - i - 1]);
    i++
  }

  return result;
};

const copmareTwoArrays = (first, second) => {
  for(let i = 0; i < first.length; i++) {
    if (first[i].id !== second[i].id || first[i].price !== second[i].price) {
        return false;
    }
  }
  return true;
}

const accertObjectEquals = (message, returned, expected) => {
  const failMessage = () => {console.error(`Test fails ${JSON.stringify(message)}, expected ${JSON.stringify(expected)}, returned ${JSON.stringify(returned)}`)};
  const successMessage = () => { console.log(`Test passed: ${message}.`)};
  const returnedHigh = returned.highest;
  const returnedLow = returned.lowest;
  const expectedHigh = expected.highest;
  const expectedLow = expected.lowest;
  if (((returnedHigh === null && expectedHigh === null) && (returnedLow === null && expectedLow === null))
        || ((returnedHigh !== null && expectedHigh !== null) && (returnedHigh.length === expectedHigh.length))
        || ((returnedLow !== null && expectedLow !== null) && (returnedLow.length === expectedLow.length))) {
  
    try {
      let isLowArrayEqual = true;
      let isHighArrayEqual = true;
      if (returnedHigh !== null && returnedHigh.length) {
        isHighArrayEqual = copmareTwoArrays(returnedHigh, expectedHigh);
      }
      if (returnedLow !== null && returnedLow.length) {
        isLowArrayEqual = copmareTwoArrays(returnedLow, expectedLow);
      }
      if (isHighArrayEqual && isLowArrayEqual) {
        successMessage();
      } else {
        failMessage();
        return;
      }
    } catch (e) {
      console.error(e.message);
      failMessage();
      return;
    }
  } else {
    failMessage();
    return;
  }
};
// const accertObjectEquals = (message, returned, expected) => {
//   let isEqual = true;
//   const failMessage = () => {console.error(`Test fails ${JSON.stringify(message)}, expected ${JSON.stringify(expected)}, returned ${JSON.stringify(returned)}`)};
//   if ((!returned && !expected) || (returned.length !== expected.length)) {
//     failMessage();
//     return;
//   } else if (returned.length > 0) {
//     for(let i = 0; i < returned; i++) {
//       const newProductKeys = Object.keys(returned[i]);
//       const expectedProductsKeys = Object.keys(expected[i]);
//       for (let key in keys) {
//         if (newProductKeys[key] !== expectedProductsKeys[key]) {
//           isEqual = false;
//           isProductEqual = true;
//           failMessage();
//           return;
//         }
//       }
//     }
//   }
//   if (isEqual) {
//     console.log(`Test passed: ${message}.`);
//   } else {
//     failMessage();
//   }
// };

  const test = (func) => {
    const testData1 = [
      {id: 1, price: 10},
      {id: 2, price: 11},
      {id: 3, price: 1},
      {id: 4, price: 3},
      {id: 5, price: 1},
      {id: 6, price: 8},
      {id: 7, price: 3},
      {id: 8, price: 0},
      {id: 9, price: 4},
      {id: 10, price: 5},
      {id: 11, price: 9},
      {id: 12, price: 13},
    ];
    const testData2 = [
      {id: 1, price: 10},
      {id: 2, price: 11},
      {id: 3, price: 1},
      {id: 4, price: 3},
    ];
    const testData3 = [
      {id: 1, price: 10},
      {id: 2, price: 11},
      {id: 3, price: 1},
      {id: 4, price: 3},
      {id: 5, price: 1},
    ];
    const expectedData1 = {
      highest: [
        {id: 12, price: 13},
        {id: 2, price: 11},
        {id: 1, price: 10},
        {id: 11, price: 9},
        {id: 6, price: 8},
      ],
      lowest: [
        {id: 8, price: 0},
        {id: 3, price: 1},
        {id: 5, price: 1},
        {id: 4, price: 3},
        {id: 7, price: 3},
      ]
    };
    const expectedData2 = {
      highest: [
        {id: 2, price: 11},
        {id: 1, price: 10},
        {id: 4, price: 3},
        {id: 5, price: 1},
        {id: 3, price: 1},
      ],
      lowest: [
        {id: 3, price: 1},
        {id: 5, price: 1},
        {id: 4, price: 3},
        {id: 1, price: 10},
        {id: 2, price: 11},
      ]
    };

    const expectedResultForNull = {
      highest: null,
      lowest: null
    };
  
    accertObjectEquals('Should return null if array is empty', func([]), expectedResultForNull);
    accertObjectEquals('If Products array length is less than size of options (5), should return null', func(testData2), expectedResultForNull);
    accertObjectEquals('Should return 5 lowest and 5 highest priced products by default if length is more or equal 5', func(testData1), expectedData1);
    accertObjectEquals('Should return 5 lowest and 5 highest priced products when array length > options.size', func(testData3), expectedData2);
  };