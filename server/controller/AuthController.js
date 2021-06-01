const user = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } =  require('../validation/AuthValidation');

const createToken = (data) =>
  jwt.sign({ data }, process.env.SECRET_TOKEN, {
    expiresIn: process.env.JWT_EXPIRATION_TIME,
  });

exports.register = async (req, res) => {
  // verification des erreur avec Joi
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(401).json({ invalidData: error.details[0].message });
  try {
    // si le mail est deja existant
    const ifMailExist = await User.findOne({ email: req.body.email });
    if (ifMailExist)
      return res.status(401).json({ errorMail: 'adress mail deja existante' });
    // creation d'un nouveau utilisateur
    const newUser = new User({
      ...req.body,
      // name: req.body.name,
      // email: req.body.email,
      // password: req.body.password,
    });
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hachedPassword = await bcrypt.hash(req.body.password, salt);
    newUser.password = hachedPassword;
    // save user in the database
    const createUser = await newUser.save();
    if (createUser) return res.status(201).json({ createUser });
  }
   catch (error) {
    res.status(400).json({ error });
  }
};
exports.login = async (req, res) => {
  // verification des erreur avec Joi
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(401).json({ invalidData: error.details[0].message });
  try {
    const ifUserExist = await User.findOne({ email: req.body.email });
    if (!ifUserExist)
      return res.status(400).json({ errorLogin: 'mail or password incorrect' });
    const ifPasswordMatsh = await bcrypt.compare(
      req.body.password,
      ifUserExist.password
    );
    if (!ifPasswordMatsh)
    
      return res.status(400).json({ errorLogin: 'mail or password incorrect' });
    const token = createToken({ id: ifUserExist._id, role: ifUserExist.role });
    res.cookie('logToken', token, {
      httpOnly: true,
      maxAge: process.env.JWT_EXPIRATION_TIME
    });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};
exports.logout = (req, res) => {
  res.cookie('logToken', '', { maxAge: 1 });
  res.redirect('/');
};



 