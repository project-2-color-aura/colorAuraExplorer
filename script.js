// create a legend that hardcodes each mood to a certain one of the 10 hues available in the xColors API - red pink purple navy blue aqua green lime yellow orange
// make 10 buttons on the screen, each with a 'mood' listed
// user chooses a mood by clicking on button
// make an event listener for the 'click' of the button
// record which mood was chosen
// display a [card/box/whatever] showing a random color of the chosen mood and a description
// make a reset button to remove the current color displayed

//Stretch goals:
//Incorporate another API e.g. caas (cat as a service): instead of a blank color card, use the colour as a semi-transparent filter over a random cat, with text pertaining to the chosen mood


// namespace object:
const colorApp = {};

colorApp.endpoint = 'https://x-colors.herokuapp.com';

colorApp.init = () => {
    colorApp.getUserChoice();
}

colorApp.getColors = (userChoice) => {
    const colorApiUrl = new URL(colorApp.endpoint);
    colorApiUrl.pathname = userChoice;
    console.log(colorApiUrl);
    colorApiUrl.search = new URLSearchParams({
        number: 5,
        type: 'dark'
    })
    fetch(colorApiUrl)
        .then((response) => {
            return response.json();
        })
        .then((jsonData) => {
            console.log(jsonData);
            document.querySelector('h1').style.color = jsonData.hex;
            //call displayColors function
        })
}

colorApp.getUserChoice = () => {
    const moodButton = document.querySelector('.moodUl');
    this.addEventListener('click', function (event) {
        const hueChoice = `/api/random/${event.target.value}`;
        colorApp.getColors(hueChoice);
    });
}

colorApp.displayColors = (arrayOfColors) => {
    console.log(arrayOfColors);
    const color1 = arrayOfColors[0].hex;
    document.querySelector('div').style.backgroundColor = color1;
}

colorApp.init();