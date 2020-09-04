const tweetImages = document.querySelectorAll('.tweet__image');
const tweetNames = document.querySelectorAll('.tweet__user');
const tweetHandles = document.querySelectorAll('.tweet__at');
const tweetTexts = document.querySelectorAll('.tweet__text');

const images = document.querySelectorAll('.image');
const imageUsers = document.querySelectorAll('.image__user');





function search(hashtag) {

    function displayResults() {
        if (twitterRequest.readyState == 4 && twitterRequest.status == 200 &&
            imageRequest.readyState == 4 && imageRequest.status == 200) {

            let results = JSON.parse(twitterRequest.responseText);
            let imageResults = JSON.parse(imageRequest.responseText);
            let tweet;
            console.log(imageResults.statuses);

            for (i=0; i<Math.max(results.statuses.length, imageResults.statuses.length); i++) {

                if (i < results.statuses.length) {
                    tweet = results.statuses[i];

                    tweetImages[i].src = tweet.user.profile_image_url_https;
                    tweetNames[i].textContent = tweet.user.name;
                    tweetHandles[i].textContent = "@" + tweet.user.screen_name;
                    tweetTexts[i].textContent = tweet.full_text;
                }

                if (i < imageResults.statuses.length) {
                    images[i].style.background =
                        "linear-gradient(180deg, #00000000 0%, #000000c4 100%) no-repeat, url(" +
                        imageResults.statuses[i].entities.media[0].media_url_https + ") no-repeat";
                    images[i].style.backgroundSize = "100% 40%, cover";
                    images[i].style.backgroundPosition = "0% 100%, 0% 0%";
                    imageUsers[i].textContent = "@" + imageResults.statuses[i].user.screen_name;
                }
            }
        }
    }

    let twitterRequest = new XMLHttpRequest();
    let imageRequest = new XMLHttpRequest();
    twitterRequest.onreadystatechange = function() {
        displayResults();
    }
    imageRequest.onreadystatechange = function() {
        displayResults();
    }

    twitterRequest.open(
        "GET",
        "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=%23" + 
            hashtag + "%20-filter%3Aretweets%20filter%3Asafe&result_type=recent&tweet_mode=extended&count=10",
        "3Wld7enMtTgPIJbHduMriDSda",
        "V75LC4tPA3fbaFjcCfZ0v9ZtduqizSM1y522SUSzmaPYfLppbI"
    );
    twitterRequest.setRequestHeader(
        "Authorization",
        "Bearer AAAAAAAAAAAAAAAAAAAAAH14HQEAAAAAlyRPi0Q1A7u87pMOdF2PPCKY7ME%3D7kmJegvv6xkK8aZH9ZFyr3KX4OVM3mPiyeFqpwDoarFuyMiJre"
    );

    imageRequest.open(
        "GET",
        "https://cors-anywhere.herokuapp.com/https://api.twitter.com/1.1/search/tweets.json?q=%23" + 
            hashtag + "%20-filter%3Aretweets%20filter%3Asafe%20filter%3Aimages&result_type=recent&tweet_mode=extended&count=10",
        "3Wld7enMtTgPIJbHduMriDSda",
        "V75LC4tPA3fbaFjcCfZ0v9ZtduqizSM1y522SUSzmaPYfLppbI"
    );
    imageRequest.setRequestHeader(
        "Authorization",
        "Bearer AAAAAAAAAAAAAAAAAAAAAH14HQEAAAAAlyRPi0Q1A7u87pMOdF2PPCKY7ME%3D7kmJegvv6xkK8aZH9ZFyr3KX4OVM3mPiyeFqpwDoarFuyMiJre"
    );

    twitterRequest.send();
    imageRequest.send();
}