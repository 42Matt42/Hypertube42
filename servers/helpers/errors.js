exports.getErrors = ((error) => {
    let errorMessages = [];
    error.errors.forEach((error) => {
            errorMessages.push(error.message)
        }
    )
    return errorMessages;
});