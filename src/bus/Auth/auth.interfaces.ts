export interface IRefreshTokenResponse {
    success: boolean,
    accessToken: string
}

export interface IAccessTokenPayload {
    id: string,
}

export interface IRefreshTokenPayload extends IAccessTokenPayload {
    tokenVersion: number
}
