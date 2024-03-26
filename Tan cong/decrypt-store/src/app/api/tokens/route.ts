import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Token, { TokenType } from "@/lib/models/token";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { UserInfo } from "@/lib/models/user-info";

export const GET = async () => {
	try {
		await connect();
		const tokens:TokenType[] = await Token.find();
		return NextResponse.json( tokens, { status: 200 })
	} catch (err) {
		console.error(err);
		return NextResponse.json(
			JSON.stringify({ error: "Error in fetching tokens: " + err }),
			{ status: 500 }
		);
	}
};

export const POST = async (request: Request) => {
	const encryptedData = await request.json();
	const secretKey = "// configuration encryption";
	if(!encryptedData){
		console.log("Missing data, please check your request.");
		return NextResponse.json(JSON.stringify({ error: "Missing data" }), { status: 400 });
	}

	const transform = encryptTransform({
		secretKey: secretKey,
	});
	const { out } = transform;
	let decryptedData;
	decryptedData = out(encryptedData, secretKey, null) as UserInfo;
	if(!decryptedData) {
		console.log("Cannot decrypt the text. Please check your private key.");
		return NextResponse.json(JSON.stringify({ error: "Cannot decrypt the text. Please check your private key." }), { status: 400 });
	}

	try {
		await connect();
		const token: TokenType = {
			userId: decryptedData.user._id,
			fullName: decryptedData.user.fullName,
			email: decryptedData.user.email,
			access_token: decryptedData.token,
			refresh_token: decryptedData.refreshToken,
			expires_in: decryptedData.expiresIn,
		};
		await Token.insertMany(token);
		return NextResponse.json(JSON.stringify({ message: "Token created" }), {
			status: 200,
		});
	} catch (err: any) {
		return NextResponse.json(
			JSON.stringify({ error: "Error in creating token: " + err }),
			{ status: 500 }
		);
	}
};

async function extractTokenInfo(request: Request) {
	const body = await request.json();
	const tokenInfo: TokenType = {};
	if (body.access_token) {
		tokenInfo.access_token = body.access_token;
	}
}
