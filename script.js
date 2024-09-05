const optionContainer = document.getElementsByClassName('options')
const responseArea = document.getElementById('responseArea');
const copyIcon = document.getElementById('copy-icon')
const resetIcon = document.getElementById('reset-icon')
const queryInput = document.getElementById('queryInput');
// const closeIcon = document.querySelector('#close-icon')


document.getElementById('submitButton').addEventListener('click', function() {
    const query = queryInput.value

    if (query) {
        responseArea.innerHTML = "<p>Loading...</p>";
        // http://localhost:3000/query-server

        fetch('https://coding-assistor.onrender.com/query-server', {  // Adjust the URL to your server's endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),  // Sending the query as JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();  // Parse the JSON response from the server
        })
        .then(data => {
            // Extract the text content from the response
            const text = data.candidates[0].content.parts[0].text;
            console.log(data);
            
            responseArea.innerHTML = `${text}`;
            // optionContainer.style.display = 'flex'
        })
        .catch(error => {
            responseArea.innerHTML = "<p>Something went wrong. Please try again.</p>";
            // document.getElementById('copy-icon').style.display = 'none'
            console.error('Error:', error);
        });
    } else {
        responseArea.innerHTML = "<p>Please enter a query.</p>";
    }
});

copyIcon.addEventListener('click',function () {
    const copiedCode = document.querySelector('#codeBlock').innerText;

    if (copiedCode) {
        navigator.clipboard.writeText(copiedCode)
        alert("Code copied !")
    }else{
        navigator.clipboard.writeText(responseArea.innerText)
        alert("Content copied !")

    }
    
})

resetIcon.addEventListener('click',function(){
    queryInput.value = ''
    responseArea.innerHTML = ''
})


// closeIcon.addEventListener('click',function () {
//     window.close()  
// })