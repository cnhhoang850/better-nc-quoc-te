const axios = require('axios')
const JSSoup = require('jssoup').default
const url = 'http://nghiencuuquocte.org'


const getQueryLink = (url, query, pageNum) => {
    let queryUrl = `${url}/${pageNum === 0 ? "" : "page" + pageNum}/?s=${query}`
    return queryUrl
}


const findArticles = async (url) => {
    const response = await axios.get(url)

    if(response.error) {
        console.error(response.error)

        return
    }

    const soup = new JSSoup(response.data)

    const articles = soup.findAll('article') 
    


}


findArticles(getQueryLink(url, 'obama', 2)).then(result => console.log(result))    
