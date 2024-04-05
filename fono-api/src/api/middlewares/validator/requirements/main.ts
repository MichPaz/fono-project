import { body, header } from 'express-validator';

const mainRequirement = {
    login: [
        body('email').isEmail(),
        body('password').isString().isLength({ min: 5 })
    ],
    signup: [
        body('user').exists().isObject(),
        body('user.username').optional({ nullable: true }),
        body('user.email').isEmail(),
        body('user.password').isString().isLength({ min: 5 }),

        body('resident').exists().isObject(),
        body('resident.cpf').isString().isLength({ min: 11 }),
        body('resident.name').isString().isLength({ min: 1 }),
        body('resident.surname').isString()
            .optional({ nullable: true })
            .isLength({ min: 3 }),
        body('resident.phoneNumber').isString().isLength({ min: 11 }),

        body('home').exists().isObject(),
        body('home.name').isString().isLength({ min: 3 }).optional({ nullable: true }),
        body('home.street').isString().isLength({ min: 3 }),
        body('home.city').isString().isLength({ min: 3 }),
        body('home.state').isString().isLength({ min: 3 }),
        body('home.postalCode').isString().isLength({ min: 7 }),
        body('home.country').isString().isLength({ min: 3 }),
        body('home.number').isString().isLength({ min: 1 }),
        body('home.complement').isString().isLength({ min: 3 }).optional({ nullable: true }),
    ]
};

export default mainRequirement;
