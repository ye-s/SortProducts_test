// Task 2

//  Main function in this task should be called for testing.
const sortProductsByHigherPrice = (products, options = { size: 5 }) => {
  let result = {
    highest: null,
    lowest: null,
  };
  if (!products || products.length < options.size) {
    return result;
  }
  const optionsSize = options.size;
  const productsLength = products.length;
  result = {
    highest: optionsSize <= productsLength ? [] : null,
    lowest: optionsSize < productsLength ? [] : null,
  };

  // sorting array
  const sortedProducts = products.sort((prevItem, nextItem) => {
    return prevItem.price - nextItem.price
  });

  for (let i = 0; i < optionsSize; i++) {
    // substruct - 1 because arrays starts from 0 index
    const currentHighesItem = sortedProducts[productsLength - i - 1];
      result.highest.push(currentHighesItem);
  }
  for (let j = 0; j < optionsSize && j < (productsLength - optionsSize); j++) {
    const currentLowestItem = sortedProducts[j];
      result.lowest.push(currentLowestItem);
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
      {id: 12, price: 13},
      {id: 2, price: 11},
      {id: 1, price: 10},
    ],
    lowest: [
      {id: 8, price: 0},
      {id: 3, price: 1},
      {id: 5, price: 1},
    ]
  };

  const expectedData3 = {
    highest: [
      {id: 2, price: 11},
      {id: 1, price: 10},
      {id: 4, price: 3},
      {id: 3, price: 1},
    ],
    lowest: null
  }

  const expectedData4 = {
    highest: [
      {id: 2, price: 11},
      {id: 1, price: 10},
      {id: 4, price: 3},
    ],
    lowest: [
      {id: 3, price: 1},
      {id: 5, price: 1},
    ]
  };


  const expectedResultForNull = {
    highest: null,
    lowest: null
  };

  accertObjectEquals('Should return null if array is empty', func([]), expectedResultForNull);
  accertObjectEquals('Should return null if array length is less than options.size', func(testData3, { size: 6 }), expectedResultForNull);
  accertObjectEquals('If Products array length is less than size of options, should return null', func(testData2), expectedResultForNull);
  accertObjectEquals('Should return 4 highest priced product even if there is number of product equals options.size', func(testData2, { size: 4 }), expectedData3);
  accertObjectEquals('Should return 3 highest priced product even if there is 5 product and options.size is 3', func(testData3, { size: 3 }), expectedData4);
  accertObjectEquals('Should return 5 lowest and 5 highest priced products by default', func(testData1), expectedData1);
  accertObjectEquals('Should return 3 lowest and 3 highest priced products when options.size equals 3', func(testData1,  { size: 3 }), expectedData2);
};