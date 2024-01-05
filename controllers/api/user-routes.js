const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all of the users

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get a specific user
router.get('/:id', (req, res) => {
  User.findOne({
    
      attributes: {
        exclude: ['password']
      },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'content', 'created_at']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'created_at'],
          include: {
            model: Post,
            attributes: ['title']
          }
        }
      ]
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Create a user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!dbUserData) {
      return res.status(400).json({ message: 'No user with that username!' });
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: 'Incorrect password!' });
    }

    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;

    req.session.save(() => {
      res.json({
        user: dbUserData,
        message: 'You are now logged in!'
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;


