const axios = require('axios')

const url = 'https://young-savannah-41699.herokuapp.com/http://nghiencuuquocte.org/?s=obama'

async function makeCon () {
    const response = await axios.get(url)

    return response
}

