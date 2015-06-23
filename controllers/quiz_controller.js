var models = require('../models/models.js');

exports.load = function (req, res, next, quizId) {
  models.Quiz.find({
    where: {id: Number(quizId)},
    include: [{model: models.Comment}]
  }).then(function (quiz) {
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
  res.render('quizes/show', {quiz: req.quiz, errors: []})
}

exports.index = function (req, res) {
  models.Quiz.findAll().then(function (quizes) {
    res.render('quizes/index', {quizes: quizes, errors: []})
  })
}

exports.answer = function (req, res) {
  var resultado = "Incorrecto"
    if(req.query.respuesta === req.quiz.respuesta){
      resultado = "Correcto"
    }
    res.render('quizes/answer', {respuesta: resultado, errors: []})
}

exports.nuevo = function (req, res) {
  var quiz = models.Quiz.build(
    {
      tema: "",
      pregunta: "",
      respuesta: ""
    }
  )
  res.render('quizes/nuevo', {quiz: quiz, errors: []})
}

exports.guardar = function (req, res) {
  var quiz = models.Quiz.build(req.body.quiz)
  quiz.validate().then(function (err) {
    if (err) {
      res.render('quizes/nuevo', {quiz: quiz, errors:err.errors})
    }
    else {
      quiz.save({fields: ["tema", "pregunta", "respuesta"]}).then(function () {
        res.redirect('/quizes')
      })
    }
  })
}

exports.editar = function (req, res) {
  var quiz = req.quiz

  res.render('quizes/editar', {quiz: quiz, errors: []})
}

exports.update = function (req, res) {
  req.quiz.tema = req.body.quiz.tema
  req.quiz.pregunta = req.body.quiz.pregunta
  req.quiz.respuesta = req.body.quiz.respuesta

  req.quiz.validate().then(function (err) {
    if (err) {
      res.render('quizes/editar', {quiz: req.quiz, errors: err.errors})
    }
    else {
      req.quiz.save({fields: ["tema", "pregunta", "respuesta"]}).then(function () {
        res.redirect('/quizes')
      })
    }
  })
}

exports.destroy = function (req, res) {
  req.quiz.destroy().then(function () {
    res.redirect('/quizes')
  }).catch(function (error) {
    next(error)
  })
}

exports.statistics = function(req,res){
  models.Quiz.findAll({include: [{
      model: models.Comment
    }]}).then(function(Preguntas){
      models.Comment.count().then(function(numeroComentarios){
        var pregsConCo = 0;
        var numeroPreguntas = Preguntas.length;
        var media = numeroComentarios/numeroPreguntas;
        media=media.toFixed(3);
        for(i = 0; i < numeroPreguntas; i++){
          if(Preguntas[i].Comments.length > 0){
            pregsConCo++;
          }
        }
        var pregsSinCo = numeroPreguntas - pregsConCo;

        res.render('quizes/statistics', {numeroPreguntas: numeroPreguntas, numeroComentarios: numeroComentarios, media: media, pregsSinCo: pregsSinCo, pregsConCo: pregsConCo, errors: []});
    });
  });
};
