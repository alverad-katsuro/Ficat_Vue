const Course = require('../models/Course')
const HttpCodes = require('../httpCodes')
const MessageCodes = require('../../shared/messageCodes')

async function create(ctx) {
  const payload = ctx.request.body
  // console.log(payload)
  ctx.status = HttpCodes.OK

  try {
    const newCourse = await Course.forge(payload).save()
    ctx.body = newCourse
    ctx.status = HttpCodes.OK
    const id = newCourse.id
    ctx.set('Location', `/api/courses/${id}`)
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbSave, {
      error: {
        rawErrorMessage: e.stack
      }
    })
  }
}

async function list(ctx) {
  let query = Course
  const unityAcronym = ctx.query.unityAcronym
  const type = ctx.query.type

  if (unityAcronym) {
    query = query.where({ unityAcronym })
  }
  if (type) {
    query = query.where({ type })
  }
  try {
    ctx.body = await query.fetchAll()
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbFetch, {
      error: {
        rawErrorMessage: e.stack
      }
    })
  }
}

async function findById(ctx) {
  const id = ctx.params.id

  try {
    ctx.body = await Course.where({ id }).fetch()
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbFetch, {
      error: {
        rawErrorMessage: e.stack
      }
    })
  }
}

async function update(ctx) {
  const id = ctx.params.id
  // console.log(id)
  const payload = ctx.request.body
  let course = await Course.where({ id }).fetch()
  if (course) {
    try {
      course = await Course.where({ id }).save(payload, {
        patch: true
      })
      ctx.body = course
      ctx.status = HttpCodes.OK
    } catch (e) {
      ctx.throw(HttpCodes.INT_SRV_ERROR, MessageCodes.error.errOnDbSave, {
        error: {
          rawErrorMessage: e.stack
        }
      })
    }
  } else {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityDoesNotExist('Course')
    )
  }
}

async function del(ctx) {
  const id = ctx.params.id
  const existingCourse = await Course.where({ id }).fetch()
  if (!existingCourse) {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityDoesNotExist('Course')
    )
    return
  }
  try {
    await Course.where({ id }).destroy()
    ctx.status = HttpCodes.OK
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbSave)
  }
}

module.exports = { create, list, findById, update, del }
