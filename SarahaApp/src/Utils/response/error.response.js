export const errorResponse = ({
  message = "Error",
  status = 400,
  extra = undefined,
}) => {
  const error = new Error(
    typeof message === "string" ? message : message?.message || "Error",
  );
  error.status = status;
  error.extra = extra;
  throw error;
};

export const BadRequestException = ({
  message = "BadRequest Exception",
  extra = undefined,
}) => {
  return errorResponse({ message, status: 400, extra });
};

export const ConflictException = (
  message = "Conflict Exception",
  extra = undefined,
) => {
  return errorResponse({ message, status: 409, extra });
};

export const UnauthorizedException = (
  message = "Unauthorized Exception",
  extra = undefined,
) => {
  return errorResponse({ message, status: 401, extra });
};

export const NotFoundException = (
  message = "NotFound Exception",
  extra = undefined,
) => {
  return errorResponse({ message, status: 404, extra });
};

export const ForbiddenException = (
  message = "Forbidden Exception",
  extra = undefined,
) => {
  return errorResponse({ message, status: 403, extra });
};

export const InternalServerException = (
  message = "Internal Server Error",
  extra = undefined,
) => {
  return errorResponse({ message, status: 500, extra });
};

export const GlobleErrorHandler = (error, req, res, next) => {
  const status = error.status ?? 500;
  
  res
    .status(status)
    .json({ message: error.message, stack: error.stack, extra: error.extra });
};
