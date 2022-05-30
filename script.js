const colorApp = {};

colorApp.paragraphs = {
    DC143C: `Your stressed out mood evokes red hues from the Color Aura Explorer. What’s stressing you out? Allow your stressful thought to pass by like a cloud floating in the sky. Take a deep breath. Count to 3, then exhale. How do you feel? The Color Aura Explorer encourages you to wear green to balance out the red hues you’re evoking. Alternatively: let your feet touch grass, water your plants, or drink a green juice or smoothie. `,

    FFC0CB: `Your romantic mood carries pink hues from the Color Aura Explorer. There’s no harm in emitting a loving spirit towards a friend, people in your orbit, or the people in your community. Are you wondering where to put this romantic energy? 
    The Colour Aura explorer believes that romance is more than expression of love; it’s an expression of care and nurturing towards the things and people that support you. Have you considered volunteering, helping a friend with a task, or doing something thoughtful for someone? Or remind someone why you love them!`,
    
    663399: `Your powerful mood brings forth purple hues from the Color Aura Explorer. There are ways to harness this powerful energy into creating a mighty day. Push yourself during your next workout until you feel the burn. Once you feel it— keep going! 
    If pushing your body to the limit isn’t an option, that’s OK. Take the time to donate to your local food bank or influence others to support an non-profit organization you care about.
    Or, simply, extend your powerful mood to a person that needs a little motivation; if a friend is feeling a little down, give them a solid pep talk.`,

    '000080': `Your mysterious mood evokes navy hues from the Color Aura Explorer. What an enigmatic feeling and color! Voltaire once said, “the secret to being a bore is to tell everything”.  This marks an opportunity for reflection. What are you withholding within yourself? Is this a positive or negative element in your life? If it’s positive, why? If it’s negative, also ask yourself why. There are no right answers to your “why’s”. The meaning of your inner mystery is to practice introspection. Channel your inner mystery by expressing yourself in abstract ways: paint, journal, or write poetry. `,
    
    '4682B4': `Your melancholic mood carries blue hues from the Color Aura Explorer. First and foremost, the Color Aura Explorer is sorry you’re feeling melancholic.  Allow yourself to feel it, but remember: you can, and will feel happiness again. The path to happiness can be long and non-linear. Think about the things or people in your life that inspire you. Attempt to reconnect with these aspects again. Sometimes being sad makes this reconnection difficult, but keep trying.  Re-read a book that you love, listen to your favourite album, watch a new TV show, or go for a walk outside. Or, don’t be afraid to talk to someone you trust about your sorrows. Sometimes, having someone listen is the cure for a melancholic spirit.`,

    '00FFFF': `Your peaceful aura evokes hues of aqua. This light green-blue color is associated with a refreshing energy of a river, and the tranquility and serenity of a calm blue lake. Aqua is a healing color, helping to calm the mind and body and enhance communication skills. Aqua is similar to turquoise, which is a gemstone believed by some to be a protector and bringer of good fortune. Take a chance today, and let the optimism of the color aqua keep you centered and hopeful! If you are feeling peaceful enough and looking to increase your energy, the Color Aura Explorer encourages you increase hues of orange, pink, or red in your life; watch a sunrise, eat an apple or a citrus fruit, or do some exercise to turn up the heat!`,

    '228B22': `Your aura evokes hues of green. Green is often associated with ideas of health, both of the human body and of the planet, with green being the most dominant color in the natural world of plants. Green also evokes thoughts of freshness, growth and fertility. It’s great that you are feeling healthy today - perhaps use today to plan your week’s meals or take a trip to the grocery store, or to connect further with the natural world around you in some way, like taking a walk in the shade of some trees.`,

    '00FF00': `Your balanced aura today evokes lime hues. As a shade of green, lime is a color of growth and harmony mixed with the joyful and energetic hues of yellow. Lime green evokes thoughts of spring’s new growth, a time when nature returns to balance after a cold winter. Take advantage of your balanced mood today to consider important decisions, or have a significant conversation with a colleague or loved-one. `,

    FFFF00: `Your joyful aura evokes hues of yellow. Yellow, the color of bright sunshine, brings up feelings of happiness, positivity and hope. The color yellow can be associated with mental stimulation and alertness and increased energy. Your joyful mood today is connected with attention-getting yellow; use today to speak up about an important issue or buoy the energy of the people around you. An overabundance of the joyfulness associated with yellow could lead to over-confidence or giddiness, in which case you may want to invite calmness by wearing blues. `,

    FF8C00: `Your energetic aura evokes hues of orange. Orange is a blend of red and yellow, and so it is a combination of the high passion of red with the joy of yellow. Your energetic feelings today can mean increased creativity and enthusiasm. Remember this if you are ever feeling tired or suffering from disappointment - vibrant orange can raise you up! Orange is also often associated with Vitamin C and therefore with health and vigor. Use today to go for a jog, or to complete and unfinished task! Too much orange may lead to over-stimulation or lack of care - in this case, a walk near water or some cloud-gazing are beneficial, since blue or aqua are calming colors that may help to ground you.`,

    EADDCA: 'Your feelings of apathy today evoke hues of beige and brown. Beige is often associated with dullness, which may match your lethargic feelings today, but the neutrality of this color also represents calm, warmth, quiet and dependability. If you are looking to break through this apathetic feeling, try taking a walk outside and noting the world of colors around you. You might see the green of grass or trees, pink flowers, a neon-yellow tennis ball being chased by a black and white dog, or the orange of a monarch butterfly. Using your senses in this way brings up a multitude of thoughts of feelings and may alter your mood in some way!',
    
    '708090': 'Your lethargic mood emits grey shades from the Color Aura Explorer. If you haven’t already, get some rest! If you’re still feeling lethargic, maybe it’s time to move your body. It’s good to get some blood flowing to wake up your brain! Go for a walk or jog, dance to a music playlist, or follow a stretch routine from your favourite yogi. Afterwards, it might be a good idea to visit a coffee shop in your area that you haven’t visited before. The smell of coffee or tea brewing will wake up the senses.',

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