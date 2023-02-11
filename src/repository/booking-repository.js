const { Booking } = require("../models/index");
const { AppError, ValidationError } = require("../utils/errors/index");
const { StatusCodes } = require("http-status-codes");

class BookingRepository {
  async create(data) {
    try {
      const booking = await Booking.create(data);
      return booking;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "Repository Error",
        "Cannot create booking",
        "There was some issue creating booking. Please try again later.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }

  async update(id, data) {
    try {
      await Booking.update(data, {
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        throw new ValidationError(error);
      }
      throw new AppError(
        "RepositoryError",
        "Cannot update booking",
        "There was some issue updating booking. Please try again later.",
        StatusCodes.INTERNAL_SERVER_ERROR
      );
    }
  }
}

module.exports = BookingRepository;
