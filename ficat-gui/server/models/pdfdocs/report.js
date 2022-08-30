const { join } = require('path')
const { readFileSync } = require('fs')

/**
 * Generates report's PDF
 * @param {Object} queryData = {
    searchType: (String) ['monthly' || 'semiannualy' || 'annually'],
    params: (Object) {
      year,
      month,
      semester,
      unityId,
      type,
      courseId
    },
    table: (Array[][]) query result
  }
  @param {Boolean} hasChoosenAcdUnity if user has not queried by academic unity
*/
function generateReport(queryData, hasChoosenAcdUnity) {
  const { searchType, params, table, total, mean } = queryData
  // console.log(params)

  // console.log(table)
  console.log('hasChoosenAcdUnity: ' + hasChoosenAcdUnity)

  const tableHeaders = {
    monthly: ['Mês', 'Quantidade'],
    semiannually: ['Unidade Acadêmica', 'Quantidade'],
    firstSemester: hasChoosenAcdUnity
      ? ['Total Anual']
      : ['Unidade Acadêmica', 'Sigla', 'Quantidade'],
    secondSemester: hasChoosenAcdUnity
      ? ['Total Anual']
      : ['Unidade Acadêmica', 'Sigla', 'Quantidade'],
    annually: hasChoosenAcdUnity
      ? ['Total Anual']
      : ['Unidade Acadêmica', 'Sigla', 'Quantidade']
  }

  const paramsPrettyNames = {
    // month: 'Mês',withTableFooter
    semester: 'Semestre',
    unityName: 'Unidade acadêmica',
    type: 'Tipo de curso',
    courseName: 'Curso'
  }

  const paramList = Object.entries(params)
    .filter(([k]) => k !== 'year')
    .map(([k, v]) => paramsPrettyNames[k] + ': ' + translateWorkType(v))

  const withParameters = paramList.length ? ', com parâmetros:' : ''

  const stats = []
  total && stats.push(['TOTAL:', total])
  mean && stats.push(['MÉDIA:', mean])

  const withTableFooter = stats.length
    ? renderTableFooter(stats, tableHeaders[searchType])
    : ''

  const templatePath = join(__dirname, 'report.html')

  // HTML model and script should always have same file name
  const htmlTemplate = readFileSync(templatePath, 'utf8')

  // A hospedagem dessas imagens poderia ser melhorada
  // const hostPreffix = `${process.env.PROTOCOL}://${process.env.HOST}:${process.env.PORT}/`
  const hostPreffix = 'https://github.com/CylonSam/ficat-gui/raw/master/assets/'
  const img1 = hostPreffix + 'img/bibcentral-logo.png'
  const img2 = hostPreffix + 'img/ficat-logo.png'
  const img3 = hostPreffix + 'img/sibi-logo.png'
  const regularFontUrl = hostPreffix + 'fonts/arimo.regular.ttf'
  const boldFontUrl = hostPreffix + 'fonts/arimo.bold.ttf'

  return htmlTemplate
    .replace('{{regularFontUrl}}', regularFontUrl)
    .replace('{{boldFontUrl}}', boldFontUrl)
    .replace('{{bibUfpaLogo}}', img1)
    .replace('{{ficatLogo}}', img2)
    .replace('{{sibiLogo}}', img3)
    .replace('{{baseYear}}', params.year)
    .replace('{{withParameters}}', withParameters)
    .replace('{{paramList}}', renderParamList(paramList))
    .replace('{{tableHeader}}', renderTableHeader(tableHeaders[searchType]))
    .replace('{{tableBody}}', renderTableBody(table))
    .replace('{{withTableFooter}}', withTableFooter)
}

function renderParamList(paramList) {
  let s = '<ul>'
  for (const param of paramList) {
    s += `<li>${param}</li>`
  }
  return s + '</ul>'
}

function renderTableHeader(headers) {
  let s = '<tr>'
  for (const h of headers) {
    s += `<th>${h}</th>`
  }
  return s + '</tr>'
}

function sortByMonths(table) {
  const monthNames = {
    Janeiro: 1,
    Fevereiro: 2,
    Março: 3,
    Abril: 4,
    Maio: 5,
    Junho: 6,
    Julho: 7,
    Agosto: 8,
    Setembro: 9,
    Outubro: 10,
    Novembro: 11,
    Dezembro: 12
  }

  table.sort(function(a, b) {
    return monthNames[a[0]] - monthNames[b[0]]
  })
}

/**
 *
 * @param {Array[][]} table
 */
function renderTableBody(table) {
  sortByMonths(table)
  let s = ''
  for (let i = 0; i < table.length; i++) {
    s += '<tr>'
    for (let j = 0; j < table[0].length; j++) {
      s += '<td>' + table[i][j] + '</td>'
    }
    s += '</tr>'
  }
  return s
}

/**
 *
 * @param {Number} total of catalog card count,
 * given the user query.
 * @param {Number} mean, present if
 * searchType === 'monthly' or
 * hasChoosenAcdUnity === true
 */
function renderTableFooter(stats, headers) {
  const offset = headers.length - stats[0].length
  let s = '<tfoot>'
  for (let i = 0; i < stats.length; i++) {
    s += '<tr>'
    for (let j = 0; j < stats[0].length; j++) {
      if (i === 0 && j === 0 && offset > 0) {
        s += `<td rowspan="${offset + 1}"></td>`
      }
      s += '<td>' + stats[i][j] + '</td>'
    }
    s += '</tr>'
  }

  return s + '</tfoot>'
}

function translateWorkType(type) {
  let translatedType = type
  switch (type) {
    case 'thesis':
      translatedType = 'Doutorado'
      break

    case 'dissertation':
      translatedType = 'Mestrado'
      break

    case 'tccExpert':
      translatedType = 'Especialização'
      break

    case 'tccGraduation':
      translatedType = 'Graduação'
      break

    case '0':
      translatedType = 'De 2021-01-01 até 2021-06-30'
      break

    case '1':
      translatedType = 'De 2021-07-01 até 2021-12-31'
  }

  return translatedType
}

module.exports = generateReport
