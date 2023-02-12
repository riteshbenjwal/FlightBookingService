const { StatusCodes } = require("http-status-codes");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const { BookingService } = require("../services/index");

const {
  createChannel,
  publishMessage,
  getChannel,
} = require("../utils/messageQueue");

const bookingService = new BookingService();

class BookingController {
  async sendMessageToQueue(req, res) {
    const channel = await getChannel();
    const payload = {
      data: {
        subject: "This is a noti fro, queue",
        content: "Some queue will subscribe this",
        recipientEmail: "riteshbenjwal7@gmail.com",
        notificationTime: "2023-02-12T09:43:00",
      },
      service: "CREATE_TICKET",
    };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(payload));
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
