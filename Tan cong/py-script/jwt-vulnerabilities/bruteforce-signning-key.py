from jwt import JWT


jwtInstance = JWT()
token = ''

decoded_token = JWT.decode(token)
