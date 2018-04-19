const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get( '/', ( req, res ) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor( Math.random() * numberOfCards );
  res.redirect( `/cards/${flashcardId}` )
});

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    const text = cards[id][side];
    const { hint } = cards[id];
    const name = req.cookies.username;
    
    const templateData = { id, text, name };

    if(!side) {
        return res.redirect(`/cards/${id}?side=question`)
        // should stop execution after redirect with a return
    }


    if ( side === 'question' ) {
      templateData.hint = hint;
      templateData.sideToShow = 'answer';
      templateData.title = 'Question';
      templateData.sideToShowDisplay = 'Answer';
    } else if ( side === 'answer' ) {
      templateData.sideToShow = 'question';
        templateData.title = 'Answer';
      templateData.sideToShowDisplay = 'Question';
    } else {
        res.redirect(`/cards/${id}?side=question`)
    }
    templateData.side = side

    res.render('card', templateData);
});

module.exports = router;