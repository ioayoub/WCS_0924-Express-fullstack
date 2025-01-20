export const authRegister = (req, res) => {
  console.log(req.body);

  res.json({
    message: "Coucou depuis le register",
  });
};
