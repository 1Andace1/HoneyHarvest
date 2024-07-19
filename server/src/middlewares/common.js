const { extensions } = require("sequelize/lib/utils/validator-extras")

function removeHeader(req, res, next) {
    res.removeHeader('X-Powered-By')
    next()
  }

  function checkId(req, res, next) {
    const { id } = req.params
    if (Number(id)) {
      next()
    } else {
      res.status(400).send(`
        <h1>Неверный тип данных для id</h1>
        <a href='/'>На главную</a>
      `)
    }
  }

  // function checkBody(req, res, next) {
  //   const {education, skills, experience, isPublic } = req.body
  //   if (education || skills || experience || isPublic) {
  //     next()
  //   } else {
  //     res.status(409).send('Нет необходимых данных для изменений')
  //   }
  // }


  module.exports = { removeHeader, checkId }