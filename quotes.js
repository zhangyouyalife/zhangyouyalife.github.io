fetch('./quotes.txt').then(r => {
    if (r.ok) {
        r.text().then(quotes_file => {
            console.log(quotes_file);
            var quotes = quotes_file.split("\n");
            var idx = Math.floor(Math.random() * (quotes.length - 1));
            document.getElementById("quote").textContent = quotes[idx].trim();
        })
    }
});
