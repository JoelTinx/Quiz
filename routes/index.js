var express = require('express');
var router = express.Router();

var quizController    = require('../controllers/quiz_controller')
var commentController = require('../controllers/comment_controller')
var sessionController = require('../controllers/session_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

router.param('quizId', quizController.load)
//Definición de rutas de sesión
router.get('/login', sessionController.new)
router.post('/login', sessionController.create)
router.get('/logout', sessionController.destroy)

//Definición de rutas de /quizes
router.get('/quizes',                      quizController.index)
router.get('/quizes/:quizId(\\d+)',        quizController.show)
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer)
router.get('/quizes/nuevo',                sessionController.loginRequired, quizController.nuevo)
router.post('/quizes/guardar',             sessionController.loginRequired, quizController.guardar)
router.get('/quizes/:quizId(\\d+)/editar', sessionController.loginRequired, quizController.editar)
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update)
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy)

//Definición de rutas de /comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new)
router.post('/quizes/:quizId(\\d+)/comments', commentController.create)

router.get('/creditos', function(req, res){
  res.render('creditos', {errors: []})
})

module.exports = router;
