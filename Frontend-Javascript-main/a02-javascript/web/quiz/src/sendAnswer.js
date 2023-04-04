// Similar to question but we Post instead of Get and add method and header.
const sendAnswer = {
  postQuestion: async function (url, answer) {
    const send = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({answer: answer})
    }
    const response = await fetch(url, send)
    if (!response.ok) {
      const error = await response.json
      console.log(JSON.stringify(error, null, 3))
      // eslint-disable-next-line no-template-curly-in-string
      throw new Error('HTTP error! status: ${response.status}')
    }
    const val = await response.json()
    return val
  }
}
export {sendAnswer}
