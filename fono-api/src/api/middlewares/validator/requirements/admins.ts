import { body, param } from 'express-validator'

const adminsRequirement = {
    createAdmins: [
        body('user').exists().isObject(),
        body('user.username').optional({ nullable: true }),
        body('user.email').isEmail(),
        body('user.password').isString().isLength({ min: 5 }),

        body('cpf').isString().isLength({ min: 11 }),
        body('name').isString().isLength({ min: 1 }),
        body('surname').isString()
            .optional({ nullable: true })
            .isLength({ min: 3 }),
        body('phoneNumber').isString().isLength({ min: 11 }),
    ],
    getAdminDetail: [param('id').isInt()],
    updateAdmin: [
        param('id').isInt(),
        body('cpf').isString().isLength({ min: 11 }).optional({ nullable: true }),
        body('name').isString().isLength({ min: 1 }).optional({ nullable: true }),
        body('surname').isString().optional({ nullable: true }).isLength({ min: 3 }),
        body('phoneNumber').isString().isLength({ min: 11 }).optional({ nullable: true }),
    ],
    deleteAdmin: [param('id').isInt()]
}

export default adminsRequirement
