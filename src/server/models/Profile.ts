import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { User } from './User';
import { University } from './University';
import { profileType } from '../schemes';
import { group } from 'console';


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

    @Column({ type: DataType.STRING })
    group: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    type: string;

    @ForeignKey(() => University)
    @Column({ type: DataType.STRING, allowNull: false })
    universId: string;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => University)
    univers: University;

    static createProfile = async function (prof: profileType) {

        return await this.create(prof)
    }
}