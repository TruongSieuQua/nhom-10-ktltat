import mongoose, {Schema, model, models} from 'mongoose';

export type TokenType = {
	_id?: string,
	userId?: string,
	fullName?: string,
	email?: string,
	access_token?: string,
	refresh_token?: string,
	expires_in?: number,
	token_type?: string
}

const tokenSchema = new Schema({
	_id: mongoose.Types.ObjectId,
	userId: String,
	fullName: String,
	email: String,
	access_token: String,
	refresh_token: String,
	expires_in: Number,
	token_type: String,
});

const Token = models.Token || model('Token', tokenSchema);;

export default Token;
