module.exports = {
  catalogFields: {
    authors: {
      mandatory: [
        'authorName',
        'authorSurname',
        'author2Name',
        'author2Surname'
      ],
      optional: ['author2Name', 'author2Surname']
    },

    cotutorship: {
      optional: [
        'cotutorshipAdvisorName',
        'isFemaleAdvisor',
        'advisorTitle',
        'cotutorshipProgram',
        'cotutorshipInstitution'
      ]
    },

    work: {
      mandatory: [
        'workTitle',
        'workSubtitle',
        'presentationYear',
        'workImagesType',
        'totalPages',
        'workType'
      ],
      optional: ['workSubtitle']
    },
    advisors: {
      mandatory: [
        'advisorName',
        'advisorSurname',
        'isFemaleAdvisor',
        'advisorTitle',
        'coadvisorName',
        'coadvisorSurname',
        'isFemaleCoadvisor',
        'coadvisorTitle'
      ],
      optional: [
        'coadvisorName',
        'coadvisorSurname',
        'isFemaleCoadvisor',
        'coadvisorTitle'
      ]
    },
    academicDetails: ['acdUnityName', 'knAreaId', 'courseName'],
    fonts: ['times', 'arial']
  },
  querieFields: {
    monthly: {
      mandatory: ['year', 'month', 'unityName', 'type', 'courseName'],
      optional: ['month', 'unityName', 'type', 'courseName']
    },
    semiannually: {
      mandatory: ['year', 'unityName', 'type', 'courseName'],
      optional: ['unityName', 'type', 'courseName']
    },
    firstSemester: {
      mandatory: ['year', 'semester', 'unityName', 'type', 'courseName'],
      optional: ['unityName', 'semester', 'type', 'courseName']
    },
    secondSemester: {
      mandatory: ['year', 'semester', 'unityName', 'type', 'courseName'],
      optional: ['unityName', 'semester', 'type', 'courseName']
    },
    annually: {
      mandatory: ['year', 'unityName', 'type', 'courseName'],
      optional: ['unityName', 'type', 'courseName']
    }
  },
  users: {
    create: {
      mandatory: ['username', 'password', 'active']
    },
    update: {
      mandatory: ['active', 'username', 'password']
      // optional: ['password']
    }
  },
  knowledgeAreas: {
    create: {
      mandatory: ['code', 'description']
    },
    update: {
      mandatory: ['code', 'description']
    }
  },
  courses: {
    create: {
      mandatory: ['name', 'program', 'type', 'unityAcronym']
    },
    update: {
      mandatory: ['description']
    }
  },
  academicUnities: {
    create: {
      mandatory: ['name', 'acronym']
    },
    update: {
      mandatory: ['name', 'acronym'],
      optional: ['name', 'acronym']
    }
  },
  auth: {
    mandatory: ['username', 'password', 'rememberMe'],
    optional: ['rememberMe']
  },
  authz: {
    mandatory: ['accessToken']
  },
  catalogCard: {
    mandatory: [
      'keywords',
      'work',
      'advisors',
      'authors',
      'academicDetails',
      'catalogFont',
      'cotutorship',
      'userEmail'
    ]
  },
  email: {
    mandatory: ['name', 'email', 'fone', 'msg']
  }
}
