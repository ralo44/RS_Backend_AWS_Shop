import products from "./mocks/products.mock"

export const getProductsList = async (event, context, callback) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    "Content-Type": "application/json",
  }
  let response

  const productsPromise = new Promise((res, req) => {
    res(products)
  })

  const uploadedProducts = await productsPromise

  try {
    response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(uploadedProducts),
      isBase64Encoded: false,
    }
    callback(null, response)
  } catch (error) {
    response = {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: `Error, ${error.message}` }),
      isBase64Encoded: false,
    }
    callback(error, response)
  }
};
