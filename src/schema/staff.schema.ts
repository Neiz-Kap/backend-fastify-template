import { FastifySchema } from 'fastify'
import Joi from 'joi'

export const createStaffSchema = {
  body: Joi.object().keys({
    firstName: Joi.string()
      .required()
      .messages({
        'string.name': `"firstName" of organization is missing`,
      })
      .min(2),
    middleName: Joi.string()
      .required()
      .messages({
        'string.name': `"middleName" of organization is missing`,
      })
      .min(5),
    lastName: Joi.string()
      .required()
      .messages({
        'string.name': `"lastName" of organization is missing`,
      })
      .min(5),
    description: Joi.string()
      .optional()
      .messages({
        'string.name': `" description" of organization is missing`,
      })
      .min(50),
  }),
} satisfies FastifySchema
