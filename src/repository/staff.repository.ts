import { FilterQuery, Model, UpdateQuery } from 'mongoose'

import { Staff } from '../model/staff.model'
import { IMongoStaff, IStaff } from '../type/staff.type'

export interface IStaffRepository {
  create(document: IStaff): Promise<IMongoStaff>
  getById(id: IMongoStaff['_id']): Promise<IMongoStaff | null>
  getAll(query: FilterQuery<IMongoStaff>): Promise<IMongoStaff[] | []>
  update(filter: FilterQuery<IMongoStaff>, update: UpdateQuery<IMongoStaff>): Promise<IMongoStaff | null>
  deleteOne(id: IMongoStaff['_id']): Promise<boolean>
}

class StaffRepository implements IStaffRepository {
  private readonly model: Model<IStaff>

  constructor() {
    this.model = Staff
  }

  async create(document: IStaff): Promise<IMongoStaff> {
    return await this.model.create(document)
  }

  async getById(id: IMongoStaff['_id']): Promise<IMongoStaff | null> {
    return await this.model.findById(id).exec()
  }

  async getAll(query: FilterQuery<IMongoStaff>): Promise<IMongoStaff[]> {
    return await this.model.find(query).exec()
  }

  async update(filter: FilterQuery<IMongoStaff>, update: UpdateQuery<IMongoStaff>): Promise<IMongoStaff | null> {
    return await this.model
      .findOneAndUpdate(filter, update, {
        returnOriginal: false,
      })
      .exec()
  }

  async deleteOne(id: IMongoStaff['_id']): Promise<boolean> {
    const result = await this.model.deleteOne(id)
    return result.deletedCount === 1
  }
}

export const staffRepository = new StaffRepository()