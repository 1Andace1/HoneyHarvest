const { Router } = require('express');
const { Message, User } = require('../../db/models');

const router = Router();

router
.get('/', async (req, res) => {
  const messages = await Message.findAll({ include: User });
  res.json(messages)
// .get('/admin-messages', (req, res) => {
//     console.log('мы зашли в ручку')
//     const adminMessages = messages.filter(message => {
//       const sender = User.fi(user => user.id === message.authorId);
//       return sender && sender.isAdmin;
//     });
  
//     res.json(adminMessages);
//   });
 });


module.exports = router;
