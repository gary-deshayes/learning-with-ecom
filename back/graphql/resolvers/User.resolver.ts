import * as userService from '../../services/userService';

const UserResolver = {
    Mutation: {
        signupUser: userService.registerGraphQL,
        loginUser: userService.loginGraph,
    },
};
export default UserResolver;