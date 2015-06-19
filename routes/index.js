var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

router.param('quizId', quizController.load)

router.get('/quizes', quizController.index)
router.get('/quizes/nuevo', quizController.nuevo)
router.get('/quizes/:quizId(\\d+)', quizController.show)
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer)
router.post('/quizes/guardar', quizController.guardar)
router.get('/quizes/:quizId(\\d+)/editar', quizController.editar)
router.put('/quizes/:quizId(\\d+)', quizController.update)

router.get('/creditos', function(req, res){
  res.render('creditos')
})

module.exports = router;
