import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { Profile } from './Profile';
import { UniversityType } from '../utils/university';


@Table({
    timestamps: false,
    tableName: "University"
})

export class University extends Model {
    @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
    id: string;

    @Column({ type: DataType.STRING, unique: true })
    name: string;

    @HasMany(() => Profile)
    profile: Profile[];


    static createUniversity = async function () {
        return await this.bulkCreate([
            { name: UniversityType.TPU },
            { name: UniversityType.TGU },
            { name: UniversityType.TUSUR },
            { name: UniversityType.TGPU }
        ], { ignoreDuplicates: true });
    }
}