import { ResolverMap } from '../../types/graphql-utils';

const resolvers: ResolverMap = {
  Query: {
    tests: async () => {
      return [
        {
          id: 'test1',
        }
      ];
    }
  }
};

export default resolvers;
