/*
Exercise 1:
Write a function testNum that takes a number as an argument and returns a Promise that tests if the value is less than or greater than the value 10. Log the result to the console.
*/

const testNum = (num) => {
    return new Promise((resolve, reject) => {
        if (num > 10) {
            reject(num + ' is greater than 10')
        } else if (num < 10) {
            reject(num + ' is smaller than 10')
        } else if (isNaN(num) === true) {
            reject(num + ' is not a number!')
        } else {
            resolve(num + ': Number is exactly 10')
        }
    })
};
 
testNum(9)
    .then(resolved => console.log(resolved))
    .catch(error => console.log(error))  

testNum(11)
.then(resolved => console.log(resolved))
.catch(error => console.log(error)) 

testNum(10)
    .then(resolved => console.log(resolved))
    .catch(error => console.log(error)) 

testNum('popi')
.then(resolved => console.log(resolved))
.catch(error => console.log(error))     
/*
Exercise 2:
Write two functions that use Promises that you can chain! The first function, makeAllCaps(), will take in an array of words and capitalize them, and then the second function, sortWords(), will sort the words in alphabetical order. If the array contains anything but strings, it should throw an error.
Then call these functions by *chaining* the promises
*/

const makeAllCaps = words => {
    return new Promise((resolve, reject) => {
        if(words.every(word => typeof word === 'string')) { // check elk item uit array een string
            resolve( // zo ja, hoofdletters:
                sortWords( 
                    words.map(word => word.toUpperCase()) // .map turns argument directly to uppercase
                )
            )
        } else {
            reject('This is not a string!') // wanneer een item/word geen string is
        }        
    })     
};  
const sortWords = words => {
    return new Promise((resolve, reject) => {
        if (words) { // als er een array is (words)
            resolve(words.sort());  
        } else { // er is geen array (words) wanneer makeAllCaps iets in de array als geen string ziet
            reject('Not a string!')
        }
    })
};

const arrayOfWords = ['cucumber', 'tomatos', 'avocado'];
const complicatedArray = ['cucumber', 44, true];

// call both functions, chain them together and log the result to the console

makeAllCaps(arrayOfWords) // checkt elk item van arrayOfWords of het een string is of niet en zoja, hoofdletters
    .then(sortWords(arrayOfWords)) 
// Bovenstaande regel staat in de oplossing, maar is volgens mij niet nodig, omdat sortWords al 
// wordt aangeroepen in makeAllCaps met resolve(sortWords(words.map(word => word.toUpperCase())))
// Dus sortWords binnen makeAllCaps gebruikt hetzelfde argument als in makeAllCaps zelf
// alleen word het argument gelijk omgezet naar hoofdletters en vervolgens gesorteerd
// Dus om nog een keer .then te gebruiken voor sortWords lijkt me dubbel? 
// Wat het wel doet is dat de resolve (als alles een string is) als LAATSTE wordt gelogd
// wanneer de regel 'uit' staat, dan komt hij voor de foutmelding vd complicatedArray
    .then(result => console.log(result))
    .catch(err => console.log(err));

makeAllCaps(complicatedArray)
    .then(sortWords(complicatedArray))
// Als ik bovenstaande regel niet gebruik, komt de foutmelding VOOR de gesorteerde string met woorden
// Als ik de regel wel gebruik, komt de foutmelding NA de gesorteerde string van woorden  
    .then(resultaat => console.log(resultaat))
    .catch(foutje => console.log(foutje))   


// de fouten/errors (catch) bij complicatedArray(2) worden als laatste gelogd
// maar niet als de functie sortWords  in de resolve() van makeAllCaps wordt aangeroepen
// Dan wordt de catch als eerste gelogd
// Verder is het mij onduidelijk wanneer de reject() foutmelding in sortWords(sortWords2) wordt gelogd
// Zoals ik het nu begrijp, komen we daar nooit terecht,
// omdat met makeAllCaps dit ondervangen wordt (wanneer geen string, reject)
