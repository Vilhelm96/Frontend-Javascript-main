const question = {

  /*
    Gets the question from the json.
  */
  getJson: async function (url) {
    const getQuestion = {
      method: 'Get'
    }

    const response = await fetch(url, getQuestion)

    if (!response.ok) {
      const error = response.json
      console.log(JSON.stringify(error, null, 3))
      // eslint-disable-next-line no-template-curly-in-string
      throw new Error('HTTP error! status: ${response.status} ')
    }
    // Wait for the response.json to assign the body to val.
    const val = await response.json()
    return val
  }
}
export {question}
