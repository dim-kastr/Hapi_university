import { Request } from '@hapi/hapi';
import { User } from '../../models/User';
import { error, output } from '../../utils/index';
import { Errors } from '../../utils/errors'
import { Profile } from '../../models/Profile';
import { Grades } from '../../models/Grades';
import { Sequelize, Op } from 'sequelize';
import user from '../../routes/v1/user';



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

export const avgGradeByGroup = async (request: Request) => {

    const user: User = request.auth.credentials;
    const faculty = request.params.faculty;
    const university = request.params.university;
    const group = request.params.group;

    const foundTeacher = await Profile.findOne({
        where: {
            userId: user.id,
            type: "teacher",
            faculty,
            university
        }
    })

    if (!foundTeacher) {
        return error(Errors.NotFound, 'Profile not found', {})
    }

    const studentProfiles = await Profile.findAll({
        where: {
            type: "student",
            faculty,
            university,
            group
        },
        include: {
            model: Grades,
            where: {
                teacherId: foundTeacher.id
            }
        }
    })

    let sum = 0;
    let length = 0;

    studentProfiles.forEach(profile => {
        profile.grades.forEach(grade => (
            sum += grade.grade,
            length++
        ))
    })

    let avgGroup = sum / length;

    return output({ avgGroup: avgGroup })
}

export const avgGradeByLesson = async (request: Request) => {

    const studentId = request.params.id;
    const lesson = request.params.lesson;
    const user: User = request.auth.credentials;

    const checkingStudent = await Profile.findOne({
        where: {
            userId: user.id,
            type: "student",
            id: studentId
        }
    })

    if (!checkingStudent) {
        return error(Errors.NotFound, 'Profile not found', {})
    }

    const grade = await Grades.findAll({
        where: {
            studentId: studentId,
            lesson
        },
        attributes: [[Sequelize.fn('AVG', Sequelize.col('grade')), 'average_rating_faculty']]
    })

    if (!grade) {
        return error(Errors.NotFound, 'Lesson or grade not found', {})
    }

    return output(grade)
}