var models = require('../models/models.js');

exports.load = function (req, res, next, quizId) {
  models.Quiz.findById(quizId).then(function (quiz) {
    if (quiz) {
      req.quiz = quiz;
      next();
    }
    else {
      next(new Error('No existe quizId='+quizId))
    }
  }).catch(function (error) {
    next(error)
  })
}

exports.show = function (req, res) {
  res.render('quizes/show', {quiz: req.quiz})
}

exports.index = function (req, res) {
    res.render('quizes/index')
}

exports.search = function (req, res) {
  var paramSearch = "%" + req.query.search.replace(" ", "%") + "%";
  console.log(paramSearch);
  models.Quiz.findAll({where: ["pregunta like ?", paramSearch]}).then(function (quizes) {
    res.render('quizes/question', {quizes: quizes})
  })
}

exports.answer = function (req, res) {
    if(req.query.respuesta === req.quiz.respuesta){
      res.render('quizes/answer', {respuesta: 'Correcto'})
    }
    else {
      res.render('quizes/answer', {respuesta: 'Incorrecto'})
    }
}
