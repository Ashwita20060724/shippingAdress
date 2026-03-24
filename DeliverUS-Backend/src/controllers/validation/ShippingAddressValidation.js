import { } from 'express-validator'

const create = [
  // TODO
  check('alias').exists()
  .isString().isLength({min:1, max:255}).trim(),
  check('street').exists()
  .isString().isLength({min:1, max:255}).trim(),
  check('city').exists()
  .isString().isLength({min:1, max:255}).trim(),
  check('zipCode').exists()
  .isString().isLength({min:1, max:255}).trim(),
  check('province').exists()
  .isString().isLength({min:1, max:255}).trim(),
  //CUANDO ES BOOLEAN PONEMOS OPTIONAL
  check('isDefault').optional().isBoolean().toBoolean()
]

const update = [
  // TODO
  // HAY QUE DEJARLO VACÍO PORQUE 
  // NO HAY UNA RUTA DE ACTUALIZACIÓN, SOLO PATCH
]

export { create, update }
