const { join } = require('path')
const { readFileSync } = require('fs')

/**
 * Gera o modelo PDF baseado nos dados da
 * ficha catalográfica gerados pelo usuário final
 * @param {PDFKit.PDFDocument} doc
 * @param {String} font
 * @param {Object} {
 *  cutter: String
 *  authors: {
      authorName: String,
      authorSurname: String,
      author2Name: String,
      author2Surname: String
    },
    work: {
      workTitle: String,
      workSubtitle: String,
      presentationYear: String,
      workImagesType: String,
      totalPages: String,
      workType: String
    },
    advisors: {
      advisorName: String,
      advisorSurname: String,
      isFemaleAdvisor: Boolean,
      advisorTitle: String,
      coadvisorName: String,
      coadvisorSurname: String,
      isFemaleCoadvisor: Boolean,
      coadvisorTitle: String
    },
    academicDetailNames: {
      programName: String,
      acdUnityName: String
    },
    cdd: String
 */
function catalogCard(
  catalogFont,
  {
    cutter,
    authors,
    work,
    advisors,
    academicDetailNames,
    keywords,
    cotutorship,
    cdd
  }
) {
  const header = `
Dados Internacionais de Catalogação na Publicação (CIP) de acordo com ISBD
Sistema de Bibliotecas da Universidade Federal do Pará
Gerada automaticamente pelo módulo Ficat, mediante os dados fornecidos pelo(a) autor(a)`

  const author2 = authors.author2Name
    ? `, ${authors.author2Name} ${authors.author2Surname}.`
    : '.'

  const color = {
    nocolor: '',
    color: ' : il. color.',
    pb: ' : il. pb.'
  }

  const subtitle = work.workSubtitle ? `: ${work.workSubtitle}` : ''
  const authorHeader = `${authors.authorSurname}, ${authors.authorName}.`
  const workTitleHeader = `${work.workTitle} ${subtitle} / ${authors.authorName} ${authors.authorSurname}${author2} — ${work.presentationYear}.`
  const pagesHeader = `${work.totalPages} f.${color[work.workImagesType]}`

  // Títulos em masculino e feminino
  const title = {
    graduate: ['', ''],
    expert: ['', ''],
    master: ['M.e ', 'M.ª '],
    doctor: ['Dr. ', 'Dra. ']
  }

  const advisorsArray = advisors
  const advisorsHeadersArray = []
  const coadvisorsHeaderArray = []

  for (
    let advisorIndex = 0;
    advisorIndex < advisorsArray.length;
    advisorIndex++
  ) {
    const advisor = advisorsArray[advisorIndex]
    const advisorGender = advisor.advisorGender === 'female' ? 1 : 0
    let coadvisorGender

    if (advisor.advisorType === 'advisor') {
      if (advisorGender) {
        advisorsHeadersArray.push(
          `<p class="ml advisor">Orientadora: ${
            title[advisor.advisorTitle][advisorGender]
          }${advisor.advisorName}</p>`
        )
      } else {
        advisorsHeadersArray.push(
          `<p class="ml advisor">Orientador: ${
            title[advisor.advisorTitle][advisorGender]
          }${advisor.advisorName}</p>`
        )
      }
    } else {
      coadvisorGender = advisorGender
      coadvisorsHeaderArray.push(
        `${title[advisor.advisorTitle][advisorGender]}${advisor.advisorName}, ` // o final sempre vai ser ,\s
      )
    }

    if (advisorIndex === advisorsArray.length - 1) {
      if (coadvisorsHeaderArray.length > 1) {
        coadvisorsHeaderArray.unshift('Coorientadores: ')
      } else if (coadvisorGender) {
        coadvisorsHeaderArray.unshift('Coorientadora: ')
      } else {
        coadvisorsHeaderArray.unshift('Coorientador: ')
      }
    }
  }

  const advisorHeader = ''.concat(...advisorsHeadersArray)

  const coadvisorHeader =
    coadvisorsHeaderArray.length > 1
      ? ''
          .concat(...coadvisorsHeaderArray)
          .trim()
          .slice(0, -1)
      : ''

  const cotutorshipAdvisorGender =
    cotutorship.cotutorshipAdvisorGender === 'female' ? 1 : 0

  let cotutorshipHeader = ''

  if (cotutorship.cotutorshipAdvisorName) {
    cotutorshipHeader = `Orientador(a): ${
      title[cotutorship.advisorTitle][cotutorshipAdvisorGender]
    } ${cotutorship.cotutorshipAdvisorName}`
  }

  const fontSize = catalogFont === 'times' ? '11px' : '10px'

  const withCotutorshipAdvisorHeader = cotutorshipHeader
    ? `<p class="ml">${cotutorshipHeader}</p>`
    : ''

  const withCoadvisorHeader = coadvisorHeader
    ? `<p class="ml">${coadvisorHeader}</p>`
    : ''

  const workTypes = {
    thesis: 'Tese (Doutorado)',
    dissertation: 'Dissertação (Mestrado)',
    tccExpert: 'TCC (Especialização)',
    tccGraduation: 'TCC (Graduação)'
  }

  const local = academicDetailNames.acdUnityName.includes('Campus')
    ? getLocal(academicDetailNames.acdUnityName)
    : 'Belém'
  const localHeader = `, ${local}, ${work.presentationYear}.`

  // const workHeader = `${workTypes[work.workType]} - ${
  //   academicDetailNames.programName
  // }, ${academicDetailNames.acdUnityName}, ` + localHeader

  const cotutorshipWorkHeader = cotutorship.cotutorshipAdvisorName
    ? ` e ${cotutorship.cotutorshipInstitution}, ${cotutorship.cotutorshipProgram}`
    : ''

  const workHeader =
    `${workTypes[work.workType]} - Universidade Federal do Pará, ${
      academicDetailNames.acdUnityName
    }, ${academicDetailNames.programName}` +
    cotutorshipWorkHeader +
    localHeader

  let kws = ''
  for (const kn in keywords) {
    kws += `${+kn + 1}. ${keywords[kn]}. `
  }
  kws = kws.substring(0, kws.length - 1)
  const keywordHeader = `${kws} I. Título.`

  const templatePath = join(__dirname, 'catalogCard.html')

  const fontFamily = catalogFont === 'times' ? "'Tinos'" : "'Arimo'"

  // HTML model and script should always have same file name
  const htmlTemplate = readFileSync(templatePath, 'utf8')

  return (
    htmlTemplate
      .replace('__fontFamily__', fontFamily)
      .replace('__fontSize__', fontSize)
      .replace('{{cutter}}', cutter)
      .replace('{{header}}', header)
      .replace('{{authorHeader}}', authorHeader)
      .replace('{{workTitleHeader}}', workTitleHeader)
      .replace('{{pagesHeader}}', pagesHeader)
      .replace('{{advisorsHeader}}', advisorHeader)
      .replace('{{cotutorshipAdvisorHeader}}', withCotutorshipAdvisorHeader)
      .replace('{{coadvisorHeader}}', withCoadvisorHeader)
      .replace('{{workHeader}}', workHeader)
      // .replace('{{localHeader}}', localHeader)
      .replace('{{keywordHeader}}', keywordHeader)
      .replace('{{cdd}}', cdd)
  )
}

function getLocal(acdUnityName) {
  const arr = acdUnityName.split(' ')
  return arr[arr.length - 1]
}

module.exports = catalogCard
