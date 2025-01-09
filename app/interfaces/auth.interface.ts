export interface LoginResponse {
    accessToken: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}
