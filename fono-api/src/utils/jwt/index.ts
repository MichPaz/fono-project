import AppConfig from '../../config/appConfig';
import * as jwt from 'jsonwebtoken';


class JWT {
    // aplicar expires em milissegundos
    signToken(userId: number, expires = 1.8e6): Promise<string | undefined> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    id: userId,
                    iat: Date.now()
                },
                AppConfig.app.secret,
                {
                    expiresIn: expires
                },
                (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(token);
                }
            );
        });
    }

    verifyToken(token: string): Promise<jwt.JwtPayload | undefined> {
        return new Promise((resolve, reject) => {
            jwt.verify(token, AppConfig.app.secret, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                resolve(decoded as jwt.JwtPayload);
            });
        });
    }
}

export default new JWT();
