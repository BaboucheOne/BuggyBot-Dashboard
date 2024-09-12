from passlib.context import CryptContext


class AuthUtility:

    @staticmethod
    def verify_password(user_password: str, hashed_password: str):
        password_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        user_hashed_password = password_context.hash(user_password)
        return password_context.verify(user_hashed_password, hashed_password)
