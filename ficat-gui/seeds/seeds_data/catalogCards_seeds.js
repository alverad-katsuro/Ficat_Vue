const length = 100
const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

const types = ['tccGraduation', 'tccExpert', 'dissertation', 'thesis']

const courseNames = [
  'name1',
  'name2',
  'name3',
  'name4',
  'name5',
  'name6',
  'name7',
  'Programa de Pós-Graduação em Letras'
]

const unityNames = [
  'Instituto de Ciências da Saúde',
  'Instituto de Tecnologia',
  'Instituto de Letras e Comunicação',
  'Instituto de Ciências Biológicas',
  'Instituto de Ciências da Arte',
  'Instituto de Geociências',
  'Instituto de Ciências Jurídicas'
]

function generate(length = 1000) {
  return Array.from({ length }, (_, i) => ({
    id: i,
    type: types[rand(0, 4)],
    datetime: new Date(rand(2000, 2019), rand(0, 11), rand(1, 31))
      .toISOString()
      .slice(0, 19)
      .replace('T', ' '),
    unityName: unityNames[rand(0, 7)],
    // unityId: rand(1, 10),
    // courseId: rand(1, 10)
    courseName: courseNames[rand(0, 7)]
  }))
}

module.exports = generate(length)
