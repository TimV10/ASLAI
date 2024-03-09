//import data from './signDb.json'

const data=[
    {
        "id": 1,
        "video": "path",
        "definition": "Candy",
        "synonyms": "sweet,deserts,pudding"
    },
    {
        "id": 2,
        "video": "path",
        "definition": "Don't",
        "synonyms": "Do not, avoid"
    }
]
console.log('data',data);
document.getElementById("database").innerHTML = JSON.stringify(data);
// fetch(data)
// .then((response) => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json(); // Parse the JSON from the response
// })
// .then((data) => {
//     // Work with the JSON data here
//     console.log('MyData', data);
// })
// .catch((error) => {
//     console.error('There was a problem with your fetch operation:', error);
// });