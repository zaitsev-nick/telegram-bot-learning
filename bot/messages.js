const mainText = `
Вас приветствует демо бот
`;

const payKeyboard = [
  [{ text: 'Далее', callback_data: '_pay'}],
  [{ text: 'Отмена', callback_data: '_cancel'}]
];

export const Messages = {
  mainText,
  payKeyboard,
};