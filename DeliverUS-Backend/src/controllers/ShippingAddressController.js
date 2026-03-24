import { ShippingAddress } from '../models/models.js'
import { } from 'sequelize'

const ShippingAddressController = {
  async index (req, res) {
    try{
      const shippingAddresses = await ShippingAddress.findAll({
        where: {userId: req.user.id}
      })
      res.json(shippingAddresses)
    }
    catch(err){
      res.status(500).send('Not implemented')
    }
  },

  async create (req, res) {
    try{
      const addressCount = await ShippingAddress.count(
        {where: {userId: req.user.id}}
      )
      const newShippingAddress = await ShippingAddress.build(req.body)
      newShippingAddress.userId = req.user.id
      // SI ES LA PRIMERA DIRECCION ES DEFAULT
      newShippingAddress.isDefault = (addressCount === 0)
      const createShippingAddress = await newShippingAddress.save()
      res.json(createShippingAddress)
    }
    catch(err){
      res.status(500).send('Not implemented')
    }
  },

  async update (req, res) {
    //EL UPDATE SE QUEDA VACÍO PORQUE NO TIENE UNA FUNCIÓN QUE LA USE
  },

  async destroy (req, res) {
    try{
        const result = await ShippingAddress.destroy({ where: 
          { id: req.params.shippingAddressId } })
        let message = ''
        if (result === 1) {
          message = 'Sucessfuly deleted shipping address id.' + req.params.shippingAddressId
        } else {
          message = 'Could not delete shipping address.'
        }
        res.json(message)
    }
    catch(err){
      res.status(500).send('Not implemented')
    }
  },

  async markDefault (req, res) {
    try{
      //DESMARCAR TODAS LAS DIRECCIONES
      await ShippingAddress.update(
        {isDefault: false},
        {where: {userId: req.user.id}}
      )
      const address = await ShippingAddress.findByPk(
        req.params.shippingAddressId
      )
      address.isDefault = true
      const markDefaultAddress = await address.save()
      res.json(markDefaultAddress)
    }
    catch(err){
      res.status(500).send('Not implemented')
    }
  }
}

export default ShippingAddressController
