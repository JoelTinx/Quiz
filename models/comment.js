module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Comment',
    {
      texto: {
        type: DataTypes.STRING,
        valdiate: { noEmpty: {msg: "-> Falta Comentario"} }
      },
      publicado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }
  )
}
