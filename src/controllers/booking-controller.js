const { StatusCodes } = require("http-status-codes");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const { BookingService } = require("../services/index");

const { createChannel, publishMessage } = require("../utils/messageQueue");

const bookingService = new BookingService();

class BookingController {
  async sendMessageToQueue(req, res) {
    const channel = await createChannel();
    publishMessage(
      channel,
      REMINDER_BINDING_KEY,
      JSON.stringify({ message: "Success" })
    );
    return res.status(StatusCodes.OK).json({
      message: "Successfully sent message to queue",
      success: true,
      err: {},
      data: {},
    });
  }

  async create(req, res) {
    try {
      const response = await bookingService.createBooking(req.body);
      return res.status(StatusCodes.OK).json({
        message: "Successfully completed booking",
        success: true,
        err: {},
        data: response,
      });
    } catch (error) {
      return res.status(error.statusCode).json({
        message: error.message,
        success: false,
        err: error.explanation,
        data: {},
      });
    }
  }
}

module.exports = BookingController;
