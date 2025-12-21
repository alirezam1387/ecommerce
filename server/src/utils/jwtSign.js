const SaveJWT = async (user, res, message) => {
    const { refreshToken, accessToken } = await user.SignJWT()

    const cookieOptions = {
        httpOnly: true,
        sameSite: 'strict'
    };

    res.cookie('refreshToken', refreshToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })

    res.cookie('accessToken', accessToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 15 * 60 * 1000)
    })

    const {name, username, email, phoneNumber, role, createdAt } = user

    res.status(200).json({
        message,
        user: {name, username, email, phoneNumber, role, createdAt }
    })
}

module.exports = SaveJWT