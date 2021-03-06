import products from "./mocks/products.mock";

export const getProductsById = async (event, context, callback) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Content-Type": "application/json",
  }
  let response

  try {
    const productId = event.pathParameters.productId

    const filteredProductPromise = new Promise((res, req) => {
      const filteredProduct = products.filter((product) => product.id === productId)[0]
      res(filteredProduct)
    })

    const filteredProduct = await filteredProductPromise

    response = filteredProduct
      ? {
        statusCode: 200,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify(filteredProduct),
      }
      : {
        statusCode: 404,
        headers: headers,
        isBase64Encoded: false,
        body: JSON.stringify({ message: 'Product not found' }),
      };
    callback(null, response)
  } catch (error) {
    response = {
      statusCode: 500,
      headers: headers,
      isBase64Encoded: false,
      body: JSON.stringify({ message: `Ooops, ${error.message}` }),
    }
    callback(error, response)
  }

};
