import jwt

encoded_jwt = jwt.encode({
  "email": "jjjokerman@gmail.com",
  "iat": 1710682623,
  "exp": 1713274623
}, "", algorithms=None)

print(encoded_jwt)

# import jwt
# key = "secret"
# encoded = jwt.encode({"some": "payload"}, key, algorithm="HS256")
# print(encoded)
# decode = jwt.decode(encoded, key, algorithms="HS256")
# print(decode)
