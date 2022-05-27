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

colorApp.paragraphs = {
    DC143C: `red paragraph`,
    FFC0CB: `pink para`,
    663399: `purple para`,
    '000080': `navy para`,
    '4682B4': `blue para`,
    '00FFFF': `aqua para`,
    '228B22': `green para`,
    '00FF00': `lime para`,
    FFFF00: `yellow para`,
    FF8C00: `orange para`,
    '888B8D': ""
}

colorApp.endpoint = 'https://www.thecolorapi.com/scheme?';

colorApp.init = () => {
    colorApp.getUserChoice();
}

colorApp.getUserChoice = function() {
    const moodButton = document.querySelectorAll('.moods');
    moodButton.forEach( (button) => {
        button.addEventListener('click', function (event) {
            const buttonValue = event.target.value;
            colorApp.getColors(buttonValue);
            const advicePara = document.querySelector('.colorParagraph');
            advicePara.innerHTML = (colorApp.paragraphs[buttonValue]);
    });
    });
}

colorApp.getColors = (userChoice) => {
    const colorApiUrl = new URL(colorApp.endpoint);
    colorApiUrl.search = new URLSearchParams({
        hex: userChoice,
    })
    fetch(colorApiUrl)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Sorry! Color Aura is experiencing technical difficulties!");
            } 
        })
        .then((jsonData) => {
colorApp.displayColors(jsonData);
        })
        .catch((errorResponse) => {
            alert(errorResponse);
        })
}

colorApp.displayColors = (arrayOfColors) => {
const colorHex0 = arrayOfColors['colors'][0]['hex']['value'];
    document.querySelector('.color0').style.backgroundColor = colorHex0;
    const colorHex1 = arrayOfColors['colors'][1]['hex']['value'];
    document.querySelector('.color1').style.backgroundColor = colorHex1;
    const colorHex2 = arrayOfColors['colors'][2]['hex']['value'];
    document.querySelector('.color2').style.backgroundColor = colorHex2;
    const colorHex3 = arrayOfColors['colors'][3]['hex']['value'];
    document.querySelector('.color3').style.backgroundColor = colorHex3;
    const colorHex4 = arrayOfColors['colors'][4]['hex']['value'];
    document.querySelector('.color4').style.backgroundColor = colorHex4;    
    document.querySelector('header').style.background = `linear-gradient(135deg, ${colorHex0}, ${colorHex2}, ${colorHex4})`;
}

colorApp.init();