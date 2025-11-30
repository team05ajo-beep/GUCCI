
export interface Prize {
    id: string;
    amount: string;
    isGrandPrize: boolean;
}

export interface ScratchCardProps {
    width: number;
    height: number;
    isRevealed: boolean;
    onReveal: () => void;
    className?: string;
}

export interface WinnerCardProps {
    prize: Prize;
    code: string;
}

export interface User {
    fullName: string;
    phoneNumber: string;
    password?: string; // Optional in state, strictly used for auth simulation
}

export interface LoginFormProps {
    onLogin: (user: User) => void;
}
