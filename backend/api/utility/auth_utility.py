class AuthUtility:

    @staticmethod
    def verify_password(user_password: str, hashed_password: str):
        return user_password == hashed_password
