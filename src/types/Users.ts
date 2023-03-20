export type Users = {
    id: string,
    name: string,
    email: string,
    photo: string,
    phone: string,
    levels: {
        admin: boolean,
        member: boolean,
        guest: boolean
    }
}

export type UserFirebase = {
    accessToken: string | null,
    displayName: string | null,
    email: string | null,
    emailVerified: boolean,
    phoneNumber: string | null,
    photoURL: string | null,
    uid: string | null,
    session: {
        accessToken: string | null,
        expirationTime: number
    }
}