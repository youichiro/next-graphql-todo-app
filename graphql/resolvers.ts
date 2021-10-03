    export const resolvers = {
      Query: {
        projects: () => {
          return [
            {
              id: 1,
              name: 'sample project 1',
            },
            {
              id: 2,
              name: 'sample project 2',
            },
            {
              id: 3,
              name: 'sample project 3',
            },
          ]
        },
      },
    }
