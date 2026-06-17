import { pool } from "../../db/index.js";

const createProfileintoDB = async (payload: any) => {
    const { user_id, bio, address, phone, gender } = payload;

    // Check whether the user exists
    const user = await pool.query(
        `
        SELECT * FROM users
        WHERE id = $1
        `,
        [user_id]
    );

    if (user.rows.length === 0) {
        throw new Error("User does not exist");
    }

    // Check whether a profile already exists
    const existingProfile = await pool.query(
        `
        SELECT * FROM profiles
        WHERE user_id = $1
        `,
        [user_id]
    );

    if (existingProfile.rows.length > 0) {
        throw new Error("Profile already exists for this user");
    }

    // Create the profile
    const result = await pool.query(
        `
        INSERT INTO profiles (user_id, bio, address, phone, gender)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `,
        [user_id, bio, address, phone, gender]
    );

    return result.rows[0];
};

export const profileService = {
    createProfileintoDB,
};