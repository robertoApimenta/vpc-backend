import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import sequelize from '../config/database';

export interface UserAttributes {
    id: string;
    fullName: string;
    cpf: string;
    birthDate?: string;
    email: string;
    phone?: string;
    password: string;
    city?: string;
    state?: string;
    street?: string;
    neighborhood?: string;
    number?: number;
    complement?: string;
    zipCode?: string;
    pixKey?: string;
    photo?: string;
    insurance?: number;
    active?: boolean;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public fullName!: string;
    public cpf!: string;
    public birthDate?: string;
    public email!: string;
    public phone?: string;
    public password!: string;
    public city?: string;
    public state?: string;
    public street?: string;
    public neighborhood?: string;
    public number?: number;
    public complement?: string;
    public zipCode?: string;
    public pixKey?: string;
    public photo?: string;
    public insurance?: number;
    public active!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public async checkPassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            defaultValue: uuidv4, // Ensure UUID is generated properly
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cpf: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        birthDate: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        neighborhood: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        complement: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        zipCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pixKey: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        photo: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        insurance: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        tableName: 'users',
        hooks: {
            beforeCreate: async (user: User) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
            beforeUpdate: async (user: User) => {
                if (user.changed('password')) {
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        }
    }
);

export default User;
