import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { Profile } from './Profile';


@Table({
    timestamps: false,
    tableName: "University"
})

export class University extends Model {
    @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
    id: string;

    @Column({ type: DataType.STRING })
    name: string;

    @HasMany(() => Profile)
    profile: Profile[];


    static createUniversity = async function (univers: string) {
        return await this.create({ name: univers });
    }

}