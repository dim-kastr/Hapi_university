import { output } from "../../utils";

export const changeUser = async (request) => {

    const user = request.auth.credentials;
    const { username, password, phone, dateOfBirth, sex } = request.payload;

    await user.update({
        username,
        password,
        phone,
        dateOfBirth,
        sex
    })

    return output({
        username,
        phone,
        dateOfBirth,
        sex
    });
}