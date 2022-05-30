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

    '00FFFF': `Your peaceful aura evokes hues of aqua. This light green-blue color is associated with a refreshing energy of a river, and the tranquility and serenity of a calm blue lake. Aqua is a healing color, helping to calm the mind and body and enhance communication skills. Aqua is similar to turquoise, which is a gemstone believed by some to be a protector and bringer of good fortune. Take a chance today, and let the optimism of the color aqua keep you centered and hopeful! If you are feeling peaceful enough and looking to increase your energy, the Color Aura Explorer encourages you increase hues of orange, pink, or red in your life; watch a sunrise, eat an apple or a citrus fruit, or do some exercise to turn up the heat!`,

    '228B22': `Your aura evokes hues of green. Green is often associated with ideas of health, both of the human body and of the planet, with green being the most dominant color in the natural world of plants. Green also evokes thoughts of freshness, growth and fertility. It’s great that you are feeling healthy today - perhaps use today to plan your week’s meals or take a trip to the grocery store, or to connect further with the natural world around you in some way, like taking a walk in the shade of some trees.`,

    '00FF00': `Your balanced aura today evokes lime hues. As a shade of green, lime is a color of growth and harmony mixed with the joyful and energetic hues of yellow. Lime green evokes thoughts of spring’s new growth, a time when nature returns to balance after a cold winter. Take advantage of your balanced mood today to consider important decisions, or have a significant conversation with a colleague or loved-one. `,

    FFFF00: `Your joyful aura evokes hues of yellow. Yellow, the color of bright sunshine, brings up feelings of happiness, positivity and hope. The color yellow can be associated with mental stimulation and alertness and increased energy. Your joyful mood today is connected with attention-getting yellow; use today to speak up about an important issue or buoy the energy of the people around you. An overabundance of the joyfulness associated with yellow could lead to over-confidence or giddiness, in which case you may want to invite calmness by wearing blues. `,

    FF8C00: `Your energetic aura evokes hues of orange. Orange is a blend of red and yellow, and so it is a combination of the high passion of red with the joy of yellow. Your energetic feelings today can mean increased creativity and enthusiasm. Remember this if you are ever feeling tired or suffering from disappointment - vibrant orange can raise you up! Orange is also often associated with Vitamin C and therefore with health and vigor. Use today to go for a jog, or to complete and unfinished task! Too much orange may lead to over-stimulation or lack of care - in this case, a walk near water or some cloud-gazing are beneficial, since blue or aqua are calming colors that may help to ground you.`,

    EADDCA: 'Your feelings of apathy today evoke hues of beige and brown. Beige is often associated with dullness, which may match your lethargic feelings today, but the neutrality of this color also represents calm, warmth, quiet and dependability. If you are looking to break through this apathetic feeling, try taking a walk outside and noting the world of colors around you. You might see the green of grass or trees, pink flowers, a neon-yellow tennis ball being chased by a black and white dog, or the orange of a monarch butterfly. Using your senses in this way brings up a multitude of thoughts of feelings and may alter your mood in some way!',
    
    '708090': 'slate para',

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
            advicePara.focus();
            const colorTitle = document.querySelector('.colorTitle');
            const mood = event.target.id;
            colorTitle.innerHTML = (`${mood}`);
    });
    });
}

colorApp.getColors = (userChoice) => {
    const colorApiUrl = new URL(colorApp.endpoint);
    colorApiUrl.search = new URLSearchParams({
        hex: userChoice,
        // mode: 'monochrome-light'
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
    document.querySelector('footer').style.background = `linear-gradient(135deg, ${colorHex0}, ${colorHex2}, ${colorHex4})`;
}

colorApp.init();