
fetch('https://api.themoviedb.org/3', {
    method: 'POST',
    headers: {
        accept: 'application/json'
    }
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    })

});