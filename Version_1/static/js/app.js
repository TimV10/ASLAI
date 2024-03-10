//import data from './signDb.json'

const data=[
    {
        "id": 1,
        "video": "{{ url_for('static', filename='signs/candy.mp4') }}",
        "definition": "candy",
        "synonyms": "sweet,desserts,pudding"
    },
    {
        "id": 2,
        "video": "{{ url_for('static', filename='signs/dont.mp4') }}",
        "definition": "Don't",
        "synonyms": "Do not, avoid"
    },
    {
        "id": 3,
        "video": "{{ url_for('static', filename='signs/I.mp4') }}",
        "definition": "I",
        "synonyms": "me,myself"
    },
    {
        "id": 4,
        "video": "{{ url_for('static', filename='signs/eat.mp4') }}",
        "definition": "eat",
        "synonyms": "eat, consume, gobble"
    },

]
console.log('data',data);
const wordMatch = ""
Object.keys(data).forEach(function (key) {
    var valueObject = data[key];
    var valueString = JSON.stringify(valueObject);
        console.log('value: '+valueString);

    if (valueString.includes('avoid')) {
        console.log('candy found in ' +(data.indexOf(valueObject))+1);
    } else {
        console.log('not found in ' +(data.indexOf(valueObject))+1);
    }
})
document.getElementById("database").innerHTML = JSON.stringify(data);
/*fetch("transcripts/transcript.txt")
  .then((res) => res.text())
  .then((text) => {
    // do something with "text"
   })
  .catch((e) => console.error(e));
  */
/*
function addVideosToPage(inputText) {


    const inputText1 = inputText;//
    //const inputText1 = document.getElementById("transcriptId");
    console.log("transcript text : "+inputText);
    const videoPaths = findVideoPaths(inputText);
    console.log(videoPaths); 
    var myvid = document.getElementById('videoSource');
    var myvids = videoPaths;
    var activeVideo = 0;

    myvid.addEventListener('ended', function(e) {
        // update the new active video index
        activeVideo = (++activeVideo) % myvids.length;
      
        // update the video source and play
        myvid.source.src = myvids[activeVideo];
        myvid.play();
      });
}
*/


// This will log any matched video paths to the console
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

function findVideoPaths(inputText) {
    const words = inputText.split(/\s+/); // Split input text into words
    const videoPaths = [];

    words.forEach(word => {
        // Attempt to find a direct match with the 'definition' key
        let match = data.find(item => item.definition.toLowerCase() === word.toLowerCase());

        if (!match) {
            // If no direct match, search in the 'synonyms'
            match = data.find(item => {
                const synonyms = item.synonyms.split(','); // Assuming synonyms are comma-separated
                return synonyms.some(synonym => synonym.trim().toLowerCase() === word.toLowerCase());
            });
        }

        if (match) {
    //     document.getElementById("videoSource").src = "\"{{ url_for('static', filename=''"+match.video+") }}\"";
    // (document.getElementById("videoSource")).load();
    // (document.getElementById("videoSource")).play();
            videoPaths.push(match.video); // Add the video path to the array if there's a match
        }
    });

    return videoPaths;
}