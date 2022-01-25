import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { User } from './User';
import { profileType } from '../schemes';


@Table({
    timestamps: false,
    tableName: 'Profile'
})

export class Profile extends Model {
    @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
    id: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.STRING, allowNull: false })
    userId: string;

    @Column({ type: DataType.STRING, allowNull: false })
    faculty: string;

    @Column({ type: DataType.STRING, allowNull: false })
    university: string;

    @Column({ type: DataType.STRING, allowNull: false })
    group: string;

    @Column({ type: DataType.STRING, allowNull: false })
    type: string;

    @BelongsTo(() => User)
    user: User;

    static createProfile = async function (prof: profileType) {

        const id = getUUID();
        await this.create({
            userId: prof.userId,
            faculty: prof.faculty,
            university: prof.university,
            group: prof.group,
            type: prof.type
        })

    }

}