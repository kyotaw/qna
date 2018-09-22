'use strict';

const ErrorTypes = {
    UNKNOWN_INTERNAL_ERROR: 1,
    INVALID_ARG_TYPE: 101,
    MISSING_PARAMETERS: 102,
    INVALID_PARAMETERS: 103,
    FAILED_SEND_EMAIL: 104,

    INVALID_IMPORTED_CSV: 201,

    AUTH_NOT_AUTHORIZED: 601,
    AUTH_PASSWORD_DONOT_MATCH: 602,

    CERT_INVALID_CODE: 701,
    CERT_CODE_EXPIRED: 702,

}

let ErrorMessages = {}
ErrorMessages[ErrorTypes.UNKNOWN_INTERNAL_ERROR] = 'internal error';
ErrorMessages[ErrorTypes.INVALID_ARG_TYPE] = 'invalid arg type';
ErrorMessages[ErrorTypes.MISSING_PARAMETERS] = 'missing parameters';
ErrorMessages[ErrorTypes.INVALID_PARAMETERS] = 'invalid parameters';
ErrorMessages[ErrorTypes.FAILED_SEND_EMAIL] = 'failed to send email';

ErrorMessages[ErrorTypes.INVALID_IMPORTED_CSV] = 'invalid csv format';

ErrorMessages[ErrorTypes.USER_ALREADY_EXISTS] = 'the user already exists';
ErrorMessages[ErrorTypes.USER_NOT_FOUND] = 'the user not found';

ErrorMessages[ErrorTypes.AUTH_NOT_AUTHORIZED] = 'authentication failed';
ErrorMessages[ErrorTypes.AUTH_PASSWORD_DONOT_MATCH] = 'user id or password do not match';

ErrorMessages[ErrorTypes.CERT_INVALID_CODE] = 'invalid cert code';
ErrorMessages[ErrorTypes.CERT_CODE_EXPIRED] = 'cert code expired';

class KairaiError extends Error {
    constructor(errorType, message=null) {
        message = message || ErrorMessages[errorType] || '';
        super(message);
        this.errorType = errorType;
    }
}

function internalError() {
    return new KairaiError(ErrorTypes.UNKNOWN_INTERNAL_ERROR, 'internal error');
}

module.exports = {
    ErrorTypes: ErrorTypes,
    KairaiError: KairaiError,
    internalError: internalError
}
