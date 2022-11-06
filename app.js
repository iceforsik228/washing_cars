const express = require('express');
require('dotenv').config();

const app = express();

app.listen(process.env.PORT, (error) => {
  error ? console.log(errorMsg(error)) : console.log(`listening port ${process.env.PORT}`);
});

app.get('/', (req, res) => {
  const washing = [
    {
      id: 1,
      name: 'washing 1',
      price: 80,
      talons: [
        {
          time: '13:40',
        },
        {
          time: '14:40',
        },
        {
          time: '15:40',
        },
      ],
    },
    {
      id: 2,
      name: 'washing 2',
      price: 300,
      talons: [
        {
          time: '10:14',
        },
        {
          time: '12:30',
        },
      ],
    },
  ];
  res.json(washing);
});
