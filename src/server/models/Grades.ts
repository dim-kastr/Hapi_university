import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { Profile } from './Profile';
import { IGradesType } from '../schemes';


@Table({
    timestamps: false,
    tableName: 'Grades'
})

export class Grades extends Model {
    @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
    id: string;

    @ForeignKey(() => Profile)
    @Column({ type: DataType.STRING, allowNull: false })
    studentId: string;

    @ForeignKey(() => Profile)
    @Column({ type: DataType.STRING, allowNull: false })
    teacherId: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    grade: number;

    @Column({ type: DataType.STRING, allowNull: false })
    lesson: string;

    @BelongsTo(() => Profile)
    profile: Profile;

    static createGrade = async function (grade: IGradesType) {

        return await this.create(grade)
    }
}