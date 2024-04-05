import { body, param } from 'express-validator';

const errosFonologicosRequirement = {
    createErroFonologico: [
        body('tipo_interacao').isString(),
        body('tipo_acao').isString(),
        body('errado').isString(),
        body('idealizado').isString(),
    ],
    getErroFonologicoDetail: [param('id').isInt()],
    updateErroFonologico: [
        param('id').isInt(),
        body('tipo_interacao').isString(),
        body('tipo_acao').isString(),
        body('errado').isString(),
        body('idealizado').isString(),
    ],
    deleteErroFonologico: [param('id').isInt()]
};

export default errosFonologicosRequirement;
