
import { Messages } from './messages.js';
import { Utils } from './../helpers/utils.js';

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
      bot.sendMessage(id, Messages.mainText);
      const ganres = await Utils.getGanres();
      bot.sendMessage(
        id,
        'Какой жанр интересует?',
        {
          parse_mode: 'HTML',
          reply_markup: {
            inline_keyboard: ganres,
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
      if (callbackText === '_back') {
        const ganres = await Utils.getGanres();
        bot.sendMessage(
          chat.id,
          'Какой жанр интересует?',
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: ganres,
            },
          }
        );
      } else {
        // Show all movies by selected ganre
        const movies = await Utils.getMovies(callbackText);
        bot.sendMessage(
          chat.id,
          `${movies}`,
          {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: Messages.backKeyboard,
            },
          }
        );
      }

      // Answer on each incoming callback
      bot.answerCallbackQuery(callbackQuery.id, {});
    });
  } catch (error) {
    console.log(error);
  }
};

export { runBot };
