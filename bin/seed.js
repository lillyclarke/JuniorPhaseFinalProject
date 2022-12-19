const { createNextState } = require('@reduxjs/toolkit');
const {db, Campus, Student} = require('./src/db');

const seed = async () => {
  try{
    await db.sync({ force: true });
    let Students = await Promise.all([
      Student.create({id: 1, firstName: 'John', lastName: 'Doe', email: 'johndoe@yahoo.com', gpa: 3.5, campusId: 1}),
      Student.create({id: 2, firstName: 'Bob', lastName: 'Cook', email: 'BobCook@gmail.com', gpa: 3.5, campusId: 1}),
      Student.create({id: 3, firstName: 'Mary', lastName: 'Loe', email: 'maryloe@gmail.com', gpa: 3.5, campusId: 2}),
      Student.create({id: 4, firstName: 'Jane', lastName: 'Poe', email: 'JanePoe@yahoo.com', gpa: 3.5, campusId: 2}),
    ]);

    const campus1 = await Campus.create({
      id: 1,
      name: 'Campus 1',
      imageUrl: 'https://th.bing.com/th/id/R.f3215faee2adac283a87960d65550447?rik=6lbvse3S2GIOeg&riu=http%3a%2f%2fwww.mosaicaa.com%2fwp-content%2fuploads%2f2016%2f08%2f08052301_02.jpg&ehk=X6qpTyw3BGcIkSj3YYQd8l4vlbwrHgDEDYa4Nl2z%2fY0%3d&risl=&pid=ImgRaw&r=0',
      address: '1012 ST NW 99999 blah, BA',
      description: 'This is a campus',
      student: [john]
    });

    const campus2 = await Campus.create({
      id: 2,
      name: 'Campus 2',
      imageUrl: 'https://th.bing.com/th/id/R.f3215faee2adac283a87960d65550447?rik=6lbvse3S2GIOeg&riu=http%3a%2f%2fwww.mosaicaa.com%2fwp-content%2fuploads%2f2016%2f08%2f08052301_02.jpg&ehk=X6qpTyw3BGcIkSj3YYQd8l4vlbwrHgDEDYa4Nl2z%2fY0%3d&risl=&pid=ImgRaw&r=0',
      address: '1022 ST NW 11111 blah, TA',
      description: 'The best campus around',
      student: [mary]
    });

    const campus3 = await Campus.create({
      id: 3, name: 'Campus 3',
      imageUrl: 'https://th.bing.com/th/id/R.f3215faee2adac283a87960d65550447?rik=6lbvse3S2GIOeg&riu=http%3a%2f%2fwww.mosaicaa.com%2fwp-content%2fuploads%2f2016%2f08%2f08052301_02.jpg&ehk=X6qpTyw3BGcIkSj3YYQd8l4vlbwrHgDEDYa4Nl2z%2fY0%3d&risl=&pid=ImgRaw&r=0',
      address: '1032 ST NW 22222 blah, CA',
      description: 'This is an amazing campus',
      student: [bob]
    });

    const campus4 = await Campus.create({
      id: 4, name: 'Campus 4',
      imageUrl: 'https://th.bing.com/th/id/R.f3215faee2adac283a87960d65550447?rik=6lbvse3S2GIOeg&riu=http%3a%2f%2fwww.mosaicaa.com%2fwp-content%2fuploads%2f2016%2f08%2f08052301_02.jpg&ehk=X6qpTyw3BGcIkSj3YYQd8l4vlbwrHgDEDYa4Nl2z%2fY0%3d&risl=&pid=ImgRaw&r=0',
      address: '1042 ST NW 33333 blah, DA',
      description: 'This is a extraordinary campus',
      student: [jane]
    });
  } catch (err) {
    next(err);
  }
};
