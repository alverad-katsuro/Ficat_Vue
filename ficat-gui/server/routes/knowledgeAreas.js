const KnowledgeArea = require('../models/KnowledgeArea')
const HttpCodes = require('../httpCodes')
const MessageCodes = require('../../shared/messageCodes')
const { paginateCtx } = require('../util/utils')
const { knaCategories } = require('../util/knaCategories')
// const { knaCategories } = require('../util/knaCategories')

async function create(ctx) {
  const payload = ctx.request.body
  const code = payload.code
  const existingKa = await KnowledgeArea.where({ code }).fetch()
  if (existingKa) {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityAlreadyExist('knowledgeArea')
    )
    return
  }
  ctx.status = HttpCodes.OK
  const newKnowledgeArea = await KnowledgeArea.forge(payload).save()
  const id = newKnowledgeArea.id
  ctx.set('Location', `/api/knowledgeAreas/${id}`)
  ctx.body = newKnowledgeArea
}

async function list(ctx) {
  const pagination = ctx.state.pagination
  let query = KnowledgeArea
  const description = ctx.query.description
  const code = ctx.query.code

  const knaCatCodesArray = Object.keys(knaCategories())

  const categoryCode = ctx.query.categoryCode

  const catCodeId = knaCatCodesArray.indexOf(categoryCode)

  const nextCatId = catCodeId + 1

  const nextCatCode = knaCatCodesArray[nextCatId]

  if (description) {
    query = query.where('description', 'like', `%${description}%`)
  } else if (code) {
    query = query.where('code', 'like', `%${code}%`)
  } else if (categoryCode) {
    query = query
      .where('code', '>=', `${categoryCode}`)
      .where('code', '<', `${nextCatCode}`)
      .orderBy('description')
  }
  try {
    if (pagination) {
      const { page, size } = pagination
      const result = await query.fetchPage({
        pageSize: size,
        page
      })
      paginateCtx(ctx, result.pagination)
      ctx.body = result
    } else ctx.body = await query.fetchAll()
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
    ctx.body = await KnowledgeArea.where({ id }).fetch()
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbFetch, {
      error: {
        rawErrorMessage: e.stack
      }
    })
  }
}

// async function findByCategory(ctx) {
//   console.log('ok0')
//   let query = KnowledgeArea

//   const knaCat = knaCategories()
//   const knaCatCodesArray = Object.keys(knaCategories())
//   const categoryCode = ctx.query.categoryCode

//   const catCodeId = knaCatCodesArray.find(cat => cat === categoryCode)

//   const nextCatId = catCodeId + 1

//   const nextCatCode = knaCat[knaCatCodesArray[nextCatId]]

//   console.log('ok')

//   query = query
//     .where('code', '>=', `%${categoryCode}%`)
//     .andWhere('code', '<', `%${nextCatCode}%`)

//   ctx.body = await query.fetchAll()
// }

async function update(ctx) {
  const id = +ctx.params.id
  const payload = ctx.request.body
  let ka = await KnowledgeArea.where({ id }).fetch()
  if (ka) {
    try {
      ka = await KnowledgeArea.where({ id }).save(payload, {
        patch: true
      })
      ctx.body = ka
      ctx.status = HttpCodes.OK
    } catch (e) {
      ctx.throw(HttpCodes.INT_SRV_ERROR, MessageCodes.error.errOnDbSave)
    }
  } else {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityDoesNotExist('knowledgeArea')
    )
  }
}

async function del(ctx) {
  const id = +ctx.params.id
  const existingKa = await KnowledgeArea.where({ id }).fetch()
  if (!existingKa) {
    ctx.throw(
      HttpCodes.BAD_REQUEST,
      MessageCodes.error.errEntityDoesNotExist('knowledgeArea')
    )
    return
  }
  try {
    await KnowledgeArea.where({ id }).destroy()
    ctx.status = HttpCodes.OK
  } catch (e) {
    ctx.throw(HttpCodes.BAD_REQUEST, MessageCodes.error.errOnDbSave)
  }
}

module.exports = { create, list, findById, update, del }
