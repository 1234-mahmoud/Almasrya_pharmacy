import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

import pool from "../db.js";
import jwt from "jsonwebtoken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,

      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      callbackURL:
        "http://localhost:5000/api/auth/google/callback",
    },

    async (
      accessToken,
      refreshToken,
      profile,
      done
    ) => {
      try {
        const email =
          profile.emails?.[0]?.value;

        const googleId = profile.id;

        const fullName =
          profile.displayName;

        const avatar =
          profile.photos?.[0]?.value;

        // check if user exists
        const userExists =
          await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
          );

        let user;

        // existing user
        if (userExists.rows.length > 0) {
          user = userExists.rows[0];

          // update google data if missing
          if (!user.google_id) {
            const updatedUser =
              await pool.query(
                `
                UPDATE users
                SET google_id = $1,
                    avatar = $2
                WHERE id = $3
                RETURNING *
                `,
                [
                  googleId,
                  avatar,
                  user.id,
                ]
              );

            user = updatedUser.rows[0];
          }
        }

        // new user
        else {
          const newUser =
            await pool.query(
              `
              INSERT INTO users
              (
                full_name,
                email,
                google_id,
                avatar,
                role
              )
              VALUES ($1, $2, $3, $4, $5)
              RETURNING *
              `,
              [
                fullName,
                email,
                googleId,
                avatar,
                "user",
              ]
            );

          user = newUser.rows[0];
        }

        // create JWT
        const token = jwt.sign(
          {
            id: user.id,
            role: user.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "7d",
          }
        );

        return done(null, {
          user,
          token,
        });
      } catch (error) {
        return done(error, null);
      }
    }
  )
);