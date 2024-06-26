﻿// The typewriter element
var typeWriterElement = document.getElementById('header');

// The TextArray: 
var textArray = ["Mela Times", "Discover", "Top News Today"];

// You can also do this by transfering it through a data-attribute
// var textArray = typeWriterElement.getAttribute('data-array');


// function to generate the backspace effect 
function delWriter(text, i, cb) {
	if (i >= 0 ) {
		typeWriterElement.innerHTML = text.substring(0, i--);
		// generate a random Number to emulate backspace hitting.
 		var rndBack = 10 + Math.random() * 100;
		setTimeout(function() {
			delWriter(text, i, cb);
		},rndBack); 
	} else if (typeof cb == 'function') {
		setTimeout(cb,1000);
	}
};

// function to generate the keyhitting effect
function typeWriter(text, i, cb) {
	if ( i < text.length+1 ) {
		typeWriterElement.innerHTML = text.substring(0, i++);
		// generate a random Number to emulate Typing on the Keyboard.
		var rndTyping = 250 - Math.random() * 100;
		setTimeout( function () { 
			typeWriter(text, i++, cb)
		},rndTyping);
	} else if (i === text.length+1) {
		setTimeout( function () {
			delWriter(text, i, cb)
		},1000);
	}
};

// the main writer function
function StartWriter(i) {
	if (typeof textArray[i] == "undefined") {
		setTimeout( function () {
			StartWriter(0)
		},1000);
	} else if(i < textArray[i].length+1) {
		typeWriter(textArray[i], 0, function () {
			StartWriter(i+1);
		});
	}  
};
// wait one second then start the typewriter
setTimeout( function () {
	StartWriter(0);
},1000);
	
// date checker
function updateDate(){
	var currentDate = new Date();
	var options = {month: "long", day: "numeric", year: "numeric"};
	var formattedDate = currentDate.toLocaleDateString('en-US', options);

	document.getElementById('date').innerText = formattedDate;
}
updateDate();
setInterval(updateDate, 1000);

// News API
// Replace 'YOUR_API_KEY' with your actual News API key
const apiKey = '55ea219750f643b183c561f670faee15';

// Fetch news and display them randomly when the page loads
window.onload = async function () {
    const newsData = await fetchNews(apiKey);
    displayRandomNews(newsData);
};

// Example function to fetch news from News API
async function fetchNews(apiKey) {
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

// Example function to display random news
function displayRandomNews(news) {
    const newsContainer = document.getElementById('news-container');

    // Shuffle the array to get a random order
    const shuffledNews = news.sort(() => Math.random() - 0.5);

    // Display each news item in a box
    shuffledNews.forEach(newsItem => {
        const newsBox = document.createElement('div');
        newsBox.classList.add('news-box');

        const title = document.createElement('h3');
        title.textContent = newsItem.title;

        const description = document.createElement('p');
        description.textContent = newsItem.description;

        newsBox.appendChild(title);
        newsBox.appendChild(description);

        newsContainer.appendChild(newsBox);
    });
}
