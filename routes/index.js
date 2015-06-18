var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', quizController.load)

router.get('/init', quizController.index)

router.get('/quizes', quizController.search)

router.get('/quizes/:quizId(\\d+)', quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

router.get('/creditos', function(req, res){
  res.render('creditos')
})

module.exports = router;
