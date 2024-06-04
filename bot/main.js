
import { Messages } from './messages.js';

/**
 * @param {Tgfancy} bot Object
 */
const runBot = (bot) => {
  try {
    /**
     * /START
     *
     */
    bot.onText(/^[\/!#]start$/i, async (message) => {
      const {
        chat: { id },
      } = message;
      await bot.sendMessage(id, Messages.mainText);
      await bot.sendMessage(
        id,
        'выбор',
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: Messages.payKeyboard,
          },
        }
      );
    });

    /**
     * callbackQuery - represents an incoming callback query
     * from a callback button in an inline keyboard
     *
     */
    bot.on('callback_query', async (callbackQuery) => {
      const {
        message: { chat, message_id, text },
      } = callbackQuery;

      const callbackText = callbackQuery.data;
      // Handle buttons clicks / commands
        if (callbackText === '_cancel') {
        await bot.sendMessage(
          chat.id,
          'выбор',
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: Messages.payKeyboard,
            },
          }
        );
      }

      // Answer on each incoming callback
      await bot.answerCallbackQuery(callbackQuery.id, {});
    });
  } catch (error) {
    console.log(error);
  }
};

export { runBot };
