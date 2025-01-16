// B : browse
// R : read
// E : edit
// A : add
// D : destroy

export const add = (req, res, next) => {
  console.log(req.body);

  res.send("WOOOOOOORK");
};
