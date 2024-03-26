export type UserInfo = {
	user: {
		_id: string,
		fullName: string,
		email: string,
	}
	token: string,
	refreshToken: string,
	expiresIn: number
}
