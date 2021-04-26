const JSSoup = require('jssoup').default
const axios = require('axios')


const updateService = {

  getBlogContent : async (url) => {
    const response = await axios.get(url)
    if (response.error) {
      return `Error fetching link's content: ${response.error}`
    }

    const soup = new JSSoup(response.data)
    const title = soup.find('h1')
    const content = soup.findAll('p')
    const date = soup.find('time')


    return {
      title: filterDash(title.getText()),
      link: url,
      date: date.getText(),
      content: content.map(val => {

        return filterDash(val.getText())
        
      
      }).slice(3, -4)
    }
  },

  getBlogLinks : async (url, index) => {
    const link = `${url}/${index === 0 ? "" : "page/" + index + "/"}`
    console.log(link)
    const response = await axios.get(link)
    if (response.error) {
      return `Error fetching data: ${response.error}`
    }

    const soup = new JSSoup(response.data)
    const heads = soup.findAll('header', 'entry-header')
    const result = []
    

    for (let i = 0; i < heads.length; i++) {
      let link = heads[i].contents[0].contents[0].attrs.href

      result.push(link)
    }

    return result
  },

  searchQuery : (url, query, pageNum) => {
    const processedQuery = query.split(' ').join('+')
    console.log(processedQuery)
    return `${url}/${ pageNum === 0 ? "" : "page" + pageNum}/?s=${processedQuery}`
  },
  
  getSearchLinks : async (query) => {
    const response = await axios.get(query)
    if (response.error) {
      console.error(response.error)
      return
    }

    const soup = new JSSoup(response.data)
    const heads = soup.findAll('header', 'entry-header')
    const result = []
    

    for (let i = 0; i < heads.length; i++) {
      let link = heads[i].contents[0].contents[0].attrs.href

      result.push(link)
    }

    return result
  }
}



function filterDash(str) {
  const words = str.split(' ')

  let result = words.map(val => {
    if (val.includes("&#8220;")) {
     return val.replace("&#8220;", '"')
    }

    if (val.includes("&#8221;")) {
      return val.replace("&#8221;", '"')
    }

    if (val.includes("&#8221;")) {
      return val.replace("&#8221;", '"')
    }

    if (val.includes("&#8217;")) {
      return val.replace("&#8217;", "'")
    }

    if (val.includes("&#8230;")) {
      return val.replace("&#8230;", "...")
    }

    if (val.includes("&#8211;")) {
      return val.replace("&#8211;", '-')
    }

    if (val.includes("&#8216;")) {
      return val.replace("&#8216;", "'")
    }
    return val
  })
  return result.join(' ')
}

export default updateService
