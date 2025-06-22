export const usersList = {
  validUser: {
    name: 'Nelia',
    lastName: 'Test',
    email: `aqa-nelia+${Date.now()}@test.com`,
    password: 'Test123!',
  },

  invalidUser: {
    name: {
      short: 'N',
      long: 'Nelitestingtestingtes',
      nonEnglish: 'Неля',
      withLeaingSpaces: ' Nelia',
      withTrailingSpaces: 'Nelia  ',
      withSpaceInTheMiddle: 'Nelia Testing',
    },
    lastName: {
      short: 'P',
      long: 'Nelitestingtestingtes',
      nonEnglish: 'Правденко',
      withLeaingSpaces: ' Test',
      withTrailingSpaces: 'Test  ',
      withSpaceInTheMiddle: 'Test test',
    },
    email: {
      noAt: 'pravdenko2001gmail.com',
      noPrefix: '@gmail.com',
      noDomain: 'pravdenko2001@',
      noTld: 'pravdenko2001@gmail',
    },
    password: {
      short: 'Test123',
      long: 'Test123456789012',
      noNumber: 'Test!test',
      noCapital: 'test1234!',
      noSmall: 'TEST1234!',
      notMatch: 'Test1234!',
    },
  },
};
