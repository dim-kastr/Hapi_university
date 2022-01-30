import { Request } from '@hapi/hapi';
import { User } from '../../models/User';
import { error, output } from '../../utils/index';
import { Errors } from '../../utils/errors'
import { Profile } from '../../models/Profile';
import { Grades } from '../../models/Grades';
import { Sequelize, Op } from 'sequelize';
import { University } from '../../models/University';



export const createGrade = async (request: Request) => {

    const user: User = request.auth.credentials;
    const { grade, lesson } = request.payload;
    const studentId = request.params.id;

    const student = await Profile.findOne({
        where: {
            id: studentId
        }
    })

    const checkingTeacher = await Profile.findOne({
        where: {
            userId: user.id,
            type: "teacher",
            faculty: student.faculty,
            university: student.university
        }
    })

    if (!checkingTeacher) {
        return error(Errors.NotFound, "You can't give a grade", {})
    }

    await Grades.createGrade({
        studentId: student.id,
        teacherId: checkingTeacher.id,
        grade,
        lesson,
    })

    return output({
        grade,
        lesson
    })
}

export const changeGrade = async (request: Request) => {

    const user: User = request.auth.credentials;
    const gradeId = request.params.id;

    const teacherFound = await Profile.findOne({
        where: {
            userId: user.id
        }
    })

    const grades = await Grades.findOne({
        where: {
            id: gradeId,
            teacherId: teacherFound.id
        }
    })

    if (!grades) {
        return error(Errors.NotFound, "You can't change the grade", {})
    }

    grades.update(request.payload)

    return output({
        message: `Score successfully changed to ${grades.grade}`
    })
}

export const avgGradeByStudent = async (request: Request) => {

    const user: User = request.auth.credentials;
    const studentId = request.params.id;

    const student = await Profile.findOne({
        where: {
            id: studentId
        }
    })

    if (!student) {
        return error(Errors.NotFound, "Profile not found", {})
    }

    const checkingTeacher = await Profile.findOne({
        where: {
            userId: user.id,
            type: "teacher",
            faculty: student.faculty,
            university: student.university
        }
    })

    if (!checkingTeacher) {
        return error(Errors.NotFound, "Access is restricted", {})
    }

    const grade = await Grades.findAll({
        where: {
            [Op.or]: [{
                studentId
            },
            {
                teacherId: checkingTeacher.id
            }
            ]
        },
        attributes: [[Sequelize.fn('AVG', Sequelize.col('grade')), 'average_rating_student']]
    })

    return output(grade)
}

export const avgGradeByFaculty = async (request: Request) => {

    const user: User = request.auth.credentials;
    const faculty = request.params.faculty;
    const university = request.params.university;

    const profileFound = await Profile.findOne({
        where: {
            userId: user.id,
            type: "teacher",
            faculty,
            university
        }
    })

    if (!profileFound) {
        return error(Errors.NotFound, 'Profile not found', {})
    }

    const grade = await Grades.findAll({
        where: {
            teacherId: profileFound.id
        },
        attributes: [[Sequelize.fn('AVG', Sequelize.col('grade')), 'average_rating_faculty']]
    })

    return output(grade)
}



