import * as userService from '../../services/userService';

const UserResolver = {
    Mutation: {
        signupUser: userService.register,
        loginUser: userService.loginGraph,
    },
};
export default UserResolver;