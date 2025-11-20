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