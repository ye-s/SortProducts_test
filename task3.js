// Task 3

// Same function from task 2
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

const sortingProductsCacheHelper = (sortFunc) => {

  let savedProducts;

  return (products, options) => {
    let isNotModifiedProducts = false;

    if (!savedProducts) {
      savedProducts = products;
    } else {
      if (products !== null && products.length) {
        isNotModifiedProducts = copmareTwoArrays(products, savedProducts);
        products = isNotModifiedProducts ? [] : products;
      }
    }
    return sortFunc(products, options);
  }
};

 // Main function in this task should be called for testing.
let sortProducts = sortingProductsCacheHelper(sortProductsByHigherPrice);

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

const assertIsCalledSeveralTimesWithSameData = (message, func, funcArgs, numberOfCalls, expected) => {
  let result = func(...funcArgs);

  if (numberOfCalls > 1) {
    result = func(...funcArgs);
  }
  accertObjectEquals(message, result, expected);
}

const test = (func) => {
    console.log(func);
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

  const expectedResultForNull = {
      highest: null,
      lowest: null
  }

  assertIsCalledSeveralTimesWithSameData('Should return 5 lowest and 5 highest priced products by default if array is called first time', func, [testData1], 1, expectedData1);
  assertIsCalledSeveralTimesWithSameData('Should return null for both highest and lowest priced products if function was called twise with same products array', func, [testData1], 2, expectedResultForNull);
};
