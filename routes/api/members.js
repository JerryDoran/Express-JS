/* jshint esversion: 6 */

const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// GETS ALL MEMBERS.
router.get('/', (req, res) => res.json(members));

// GET A SINGLE MEMBER.
router.get('/:id', (req, res) => {
  // 'some' will return a true or false value based on the condition checked for
  // and assign it to 'found'
  const found = members.some(member => member.id === parseInt(req.params.id));
  if(found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
  }

});

// CREATE A MEMBER
router.post('/', (req, res) => {
  const newMember = {
    // Generate random universal id.
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: 'active'
  };

  if(!newMember.name || !newMember.email) {
    return res.status(400).json( {msg: 'Please include a name and email'});
  }

  members.push(newMember);
  res.json(members);

  // Server rendered views for a real application.
  // res.redirect('/');
});

// UPDATE MEMBER.
router.put('/:id', (req, res) => {
  // 'some' will return a true or false value based on the condition checked for
  // and assign it to 'found'
  const found = members.some(member => member.id === parseInt(req.params.id));
  if(found) {
    const updateMember = req.body;
    members.forEach(member => {
      if(member.id === parseInt(req.params.id)) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        res.json({ msg: 'Member updated', member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
  }
});

// DELETE MEMBER.
router.delete('/:id', (req, res) => {
  // 'some' will return a true or false value based on the condition checked for
  // and assign it to 'found'
  const found = members.some(member => member.id === parseInt(req.params.id));
  if(found) {
    res.json({
      msg: 'Member deleted',
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}`});
  }

});

module.exports = router;
