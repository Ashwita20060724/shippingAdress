import { ShippingAddress } from '../models/models.js'

export const checkShippingAddressOwnership = async (req, res, next) => {
  // TODO
  try{
    const addressId = req.params.shippingAddressId
    const userId = req.user.id
    const shippingAddresses = await ShippingAddress.findByPk(addressId)
    if(!shippingAddresses || shippingAddresses.userId !== userId){
      return res.status(403).send('La dirección no pertenece al usuario')
    }
    return next()
  } catch(err){
    res.status(500).send(err)
  }
}
