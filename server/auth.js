import passport from 'passport';
import express from 'express';
import pg, { Client } from 'pg';

const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
const auth = express.Router();
const saltround = 10;

auth.get(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/registration',
  })
);

auth.post('/registration', async (req, res) => {
  const userid = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  if (password !== confirmpassword) {
    return res.status(400).json({ error: 'Password does not match' });
  }
  try {
    const checkResult = await db.query(
      'SELECT * FROM users WHERE userid = $1',
      [userid]
    );
    if (checkResult.rows.length > 0) {
      req.redirect('/registration');
    } else {
      bcrypt.hash(password, saltround, async (err, hash) => {
        if (err) {
          console.error(err);
        } else {
          const result = await db.query(
            'INSERT INTO users (userid,password) VALUES ($1,$2)',
            [userid, hash]
          );
          const user = result.rows[0];
          req.login(user, (err) => {
            res.redirect('/home');
          });
        }
      });
    }
  } catch (error) {
    res.redirect('/registration');
    return error;
  }
});

passport.use('google', new googleStrategy({}));

passport.use(
  'local',
  new Strategy(async function verify(userid, password, cb) {
    try {
      const result = await db.query('SELECT * FROM users WHERE userid = $1', [
        userid,
      ]);
      const user = result.rows[0];
      if (result.rows.length > 0) {
        const user = result.rows[0];
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return cb(err);
          }
          if (result === true) {
            return cb(null, user);
          } else {
            return cb(null, false);
          }
        });
      }
    } catch (error) {
      console.log(error);
      return cb(error);
    }
  })
);
