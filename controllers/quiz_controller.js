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
  models.Quiz.findAll().then(function (quizes) {
    res.render('quizes/index', {quizes: quizes})
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

exports.nuevo = function (req, res) {
  var quiz = models.Quiz.build(
    {
      pregunta: "",
      respuesta: ""
    }
  )
  res.render('quizes/nuevo', {quiz: quiz})
}

exports.guardar = function (req, res) {
  console.log("\n" + req.body.quiz + "\n");
  var quiz = models.Quiz.build(req.body.quiz)

  quiz.save({fields: ["pregunta", "respuesta"]}).then(function () {
    res.redirect('/quizes')
  })
}
