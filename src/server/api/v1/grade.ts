import { Request } from '@hapi/hapi';
import { User } from '../../models/User';
import { error, output } from '../../utils/index';
import { Errors } from '../../utils/errors'
import { Profile } from '../../models/Profile';
import { Grades } from '../../models/Grades';



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