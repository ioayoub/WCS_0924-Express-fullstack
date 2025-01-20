// B : browse
// R : read
// E : edit
// A : add
// D : destroy

import { RequestHandler } from "express";

import roleRepository from "./RoleRepository";

export const add: RequestHandler = async (req, res, next) => {
  const { label } = req.body;

  try {
    const insertId: number = await roleRepository.create(label);

    res.status(201).json({
      message: "Role created",
      id: insertId,
    });
  } catch (e) {
    console.error(e.message);
  }
};
