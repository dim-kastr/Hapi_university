import { output } from "../../utils";

export const changeUser = async (request) => {

    const user = request.auth.credentials;
    const { username, phone, dateOfBirth, sex } = request.payload;

    await user.update(request.payload)

    return output({
        username,
        phone,
        dateOfBirth,
        sex
    });
}