import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { getUUID } from '../utils';
import { User } from './User';


@Table({
    timestamps: false,
    tableName: "Session"
})

export class Session extends Model {
    @Column({ primaryKey: true, type: DataType.STRING, defaultValue: () => getUUID(), })
    id: string;

    @ForeignKey(() => User)
    @Column(DataType.STRING)
    userId: string;

    @BelongsTo(() => User)
    user: User;

    static newSession = async function (userId: string) {

        const viviviv = await this.create({ userId });
        console.log("🚀 ~ file: Session.ts ~ line 25 ~ Session ~ viviviv", viviviv)

        return await this.create({ userId });
    }// creating new session
}