// Core
import { GraphQLError } from 'graphql';

export const formatValidationError = (error : GraphQLError) => {
    if (error.message === 'Argument Validation Error') {
        error.extensions!.code = 'ARGUMENT_VALIDATION_ERROR';

        return error;
    }

    return error;
};
