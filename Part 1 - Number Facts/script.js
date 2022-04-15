let favNumber = 3;
let baseURL = "http://numbersapi.com";


// 1) Make a request to the Numbers API (http://numbersapi.com/) 
//    to get a fact about your favorite number. 

// let favNumFact = axios.get(`${baseURL}/${favNumber}?json`);
// favNumFact
//     .then(data => console.log(data.data.text))
//     .catch(err => console.log(err));


async function part1(){
  let resp = await axios.get(`${baseURL}/${favNumber}?json`);
  console.log(resp.data)
};
part1();



/** **************************************************************************************** */
// 2) Get data on multiple numbers in a single request. 
//    Make that request and when you get the data back, 
//    put all of the number facts on the page.

let favNums = [3, 7, 21];

// let favNumsFacts = axios.get(`${baseURL}/${favNums}?json`);
// favNumsFacts
//     .then(facts => Object.values(facts.data).forEach(text => $("body").append(`<p>${text}</p>`)))
//     .catch(err => console.log(err));


async function part2(){
  let resp = await axios.get(`${baseURL}/${favNums}?json`);
  console.log(resp.data);
};
part2();



/** **************************************************************************************** */
// 3) Use the API to get 4 facts on your favorite number. Once you have them all, 
//    put them on the page. It’s okay if some of the facts are repeats.

// Promise.all(
//     Array.from({ length: 4 }, () => {
//       return axios.get(`${baseURL}/${favNumber}?json`);
//     })
//   )
//   .then(facts => {
//     facts.forEach(data => $("body").append(`<p>${data.data.text}</p>`));
//   });


async function part3(){
  let facts = await Promise.all(
    Array.from({ length: 4 }, () => axios.get(`${baseURL}/${favNumber}?json`))
  )
  facts.forEach(data => {
    $("body").append(`<p>${data.data.text}</p>`)
  })
};
part3();