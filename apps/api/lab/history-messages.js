const historyData1 = {
  history: [
    {
      id: '493812',
      messages: [
        {
          id: '192002c3a886ba86',
          threadId: '192002b8fdc31b1b',
        },
        {
          id: '1920030269286ae9',
          threadId: '192002b8fdc31b1b',
        },
      ],
    },
  ],
  historyId: '493829',
};

const historyData = {
  history: [
    {
      id: '493812',
      messages: [
        {
          id: '192002c3a886ba86',
          threadId: '192002b8fdc31b1b',
        },
        {
          id: '1920030269286ae9',
          threadId: '192002b8fdc31b1b',
        },
      ],
    },
    {
      id: '493844',
      messages: [
        {
          id: '192002b8fdc31b1b',
          threadId: '192002b8fdc31b1b',
        },
      ],
    },
    {
      id: '493845',
      messages: [
        {
          id: '192002b8fdc31b1b',
          threadId: '192002b8fdc31b1b',
        },
      ],
    },
  ],
  historyId: '493849',
};

const messagesHitory = historyData.history?.flatMap((history) => {
  return history.messages;
});
// .flatMap((item) => item);

console.log(messagesHitory);
